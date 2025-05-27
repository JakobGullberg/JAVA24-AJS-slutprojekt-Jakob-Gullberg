import React, { useEffect, useState } from "react";
import { getDatabase, onValue, update, ref, child } from "firebase/database";
import { assignmentsRef, membersRef } from "../firebase/config";

import { AssignTask } from "./AssignTask";
import { MarkTaskFinished } from "./MarkTaskFinished";
import { DeleteFinishedTask } from "./DeleteFinishedTask";
import { SortFilter } from "./SortFilter";
import { Modal } from "./Modal";

const TaskBoard = () => {
  //  Uppgifter och användare (hämtas från databas)
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const [message, setMessage] = useState(""); //  Tillfälligt meddelande (feedback)
  const [selectedTask, setSelectedTask] = useState(null); //  För redigering
  const [modalOpen, setModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editMember, setEditMember] = useState("");

  //  Visar feedback i 3 sekunder
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // Filter + sorteringslogik
  const [filter, setFilter] = useState({
    member: "",
    category: "",
    sortTime: "desc",
    sortTitle: "asc",
  });

  useEffect(() => {
    //  WebSocket-koppling via onValue – här sker realtidslyssning

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
    return ()=>{
      membersRef.off?.();     // Kopplar bort lyssnare korrekt (Detta verkade lösa mitt problem med websockets)
      assignmentsRef.off?.();
    }
  }, []);

  // 🔍 LÄGG DENNA STRAX EFTER
useEffect(() => {
  const connectedRef = ref(getDatabase(), ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val()) {
      console.log("✅ Ansluten till Firebase");
    } else {
      console.warn("⚠️ Förlorad anslutning till Firebase");
    }
  });
}, []);

  //  Filtrering + sortering i UI enligt användarens val
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

    //  Uppdelning i kolumner beroende på status
  const groupedTasks = {
    new: filteredAndSortedTasks.filter((task) => task.status === "new"),
    "in progress": filteredAndSortedTasks.filter((task) => task.status === "in progress"),
    finished: filteredAndSortedTasks.filter((task) => task.status === "finished"),
  };

  // Vilken komponent som ska renderas för varje kolumn
  const taskSections = [
    { title: "NEW", status: "new", Component: AssignTask },
    { title: "IN PROGRESS", status: "in progress", Component: MarkTaskFinished },
    { title: "FINISHED", status: "finished", Component: DeleteFinishedTask },
  ];

  //  Används för att veta om medlem ska kunna väljas i modal
  const isAssignModal = selectedTask?.status === "new";

  //  Öppnar modal och fyll fälten med vald uppgiftsdata
  const handleOpenModal = (task) => {
    setSelectedTask(task);
    setEditTitle(task.assignment);
    setEditCategory(task.category);
    setEditMember(task.member || "");
    setModalOpen(true);
  };

  // Uppdaterar uppgift i Firebase
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask) return;

   
      const taskRef = child(assignmentsRef, `/${selectedTask.id}`)
    

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


      {/*  Modal för att redigera uppgift */}
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

            
            {!isAssignModal && (
              // Visar bara medlem-val om uppgiften inte är ny –
              // nya uppgifter tilldelas först via AssignTask-kolumnen
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

        {/*  Tre kolumner: new, in progress, finished */}
      <div className="task-board">
        {taskSections.map(({ title, status, Component }) => (
          <div key={status} className="task-column">
            <h2>{title}</h2>
            <Component
              tasks={groupedTasks[status]}
              members={members}
              setMessage={setMessage}
              onOpenModal={handleOpenModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export { TaskBoard };