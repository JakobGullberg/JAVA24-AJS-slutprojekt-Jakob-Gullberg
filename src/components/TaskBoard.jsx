import React, { useEffect, useState } from "react";
import { update, child, onValue } from "firebase/database";
import { assignmentsRef, membersRef } from "../firebase/config";

import { NewTaskList } from "./NewTaskList";
import { InProgressTaskList } from "./InProgressTaskList";
import { FinishedTaskList } from "./FinishedTaskList";
import { SortFilter } from "./SortFilter";
import { Modal } from "./Modal";

/**
 * TaskBoard är huvudkomponenten som hanterar hela flödet av uppgifter.
 * Den hämtar data, filtrerar och sorterar, visar uppdelade kolumner,
 * samt tillåter redigering genom modal.
 */
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editMember, setEditMember] = useState("");

  const [filter, setFilter] = useState({
    member: "",
    category: "",
    sortTime: "desc",
    sortTitle: "asc",
  });

  useEffect(() => {
    const unsubscribeAssignments = onValue(assignmentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const allTasks = Object.entries(data).map(([id, task]) => ({
        id,
        ...task,
      }));
      setTasks(allTasks);
    });

    const unsubscribeMembers = onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const memberList = Object.entries(data).map(([id, member]) => ({
        id,
        ...member,
      }));
      setMembers(memberList);
    });

    return () => {
      membersRef.off?.();
      assignmentsRef.off?.();
    };
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesMember = filter.member
        ? task.member?.toLowerCase().includes(filter.member.toLowerCase())
        : true;
      const matchesCategory = filter.category
        ? task.category === filter.category
        : true;
      return matchesMember && matchesCategory;
    })
    .sort((a, b) => {
      if (filter.sortTime) {
        const timeCompare =
          filter.sortTime === "asc"
            ? a.timestamp - b.timestamp
            : b.timestamp - a.timestamp;
        if (timeCompare !== 0) return timeCompare;
      }

      if (filter.sortTitle) {
        return filter.sortTitle === "asc"
          ? a.assignment.localeCompare(b.assignment)
          : b.assignment.localeCompare(a.assignment);
      }

      return 0;
    });

  // Grupperar uppgifter baserat på status för att kunna visa dem i olika kolumner
  const groupedTasks = {
    new: filteredAndSortedTasks.filter((task) => task.status === "new"),
    "in progress": filteredAndSortedTasks.filter((task) => task.status === "in progress"),
    finished: filteredAndSortedTasks.filter((task) => task.status === "finished"),
  };

  const isAssignModal = selectedTask?.status === "new";

  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setEditTitle(task.assignment);
    setEditCategory(task.category);
    setEditMember(task.member || "");
    setModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) return;

    const taskRef = child(assignmentsRef, `/${selectedTask.id}`);

    update(taskRef, {
      assignment: editTitle,
      category: editCategory,
      member: editMember,
    })
      .then(() => {
        setModalOpen(false);
        setMessage("✅ Uppgift uppdaterad!");
      })
      .catch(() => {
        setMessage("❌ Kunde inte uppdatera uppgiften.");
      });
  };

    // UI-sektionen: filtermeny, feedback, redigeringsmodal och tre uppgiftskolumner
  return (
    <div>
      <SortFilter filter={filter} setFilter={setFilter} />

      {message && (
        <div
          style={{
            backgroundColor: "#e6ffed",
            border: "1px solid #b3e6c2",
            padding: "0.75rem",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        >
          {message}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedTask && (
          <form onSubmit={handleEditSubmit}>
            <h2>Redigera uppgift</h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Uppgiftstitel"
            />

            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="ux">UX</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>

             {/* // Används för att avgöra om vi ska visa fält för att tilldela medlem i redigeringsmodalen, 
             // då newtask inte behöver tilldelas*/}
            {!isAssignModal && (
              <select
                value={editMember}
                onChange={(e) => setEditMember(e.target.value)}
              >
                <option value="">Ingen</option>
                {members
                  .filter((m) => m.role === editCategory)
                  .map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
              </select>
            )}

            <button type="submit">Spara ändringar</button>
          </form>
        )}
      </Modal>

      {/* Kolumner: New / In Progress / Finished */}
      <div className="task-board">
        {/* Renderar lista med nya (otilldelade) uppgifter */}
        <div className="task-column">
          <h2>NEW</h2>
          <NewTaskList
            tasks={groupedTasks["new"]}
            members={members}
            setMessage={setMessage}
            onOpenModal={handleOpenModal}
          />
        </div>

        {/* Renderar lista med pågående uppgifter (kan markeras som klara) */}
        <div className="task-column">
          <h2>IN PROGRESS</h2>
          <InProgressTaskList
            tasks={groupedTasks["in progress"]}
            members={members}
            setMessage={setMessage}
            onOpenModal={handleOpenModal}
          />
        </div>

        {/* Renderar lista med färdiga uppgifter (kan raderas) */}
        <div className="task-column">
          <h2>FINISHED</h2>
          <FinishedTaskList
            tasks={groupedTasks["finished"]}
            members={members}
            setMessage={setMessage}
            onOpenModal={handleOpenModal}
          />
        </div>
      </div>
    </div>
  );
};

export { TaskBoard };
