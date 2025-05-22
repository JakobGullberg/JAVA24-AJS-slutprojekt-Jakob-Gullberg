import React, { useEffect, useState } from "react";
import { getDatabase, onValue } from "firebase/database";
import { assignmentsRef, membersRef } from "../firebase/config";

import { AssignTask } from "./AssignTask";
import { MarkTaskFinished } from "./MarkTaskFinished";
import { DeleteFinishedTask } from "./DeleteFinishedTask";
import { SortFilter } from "./SortFilter";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState(""); // 🟡 Nytt meddelande-state

  const [filter, setFilter] = useState({
    member: "",
    category: "",
    sortTime: "desc",
    sortTitle: "asc",
  });

  useEffect(() => {
    const db = getDatabase();

    onValue(assignmentsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const allTasks = Object.entries(data).map(([id, task]) => ({
        id,
        ...task,
      }));
      setTasks(allTasks);
    });

    onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const memberList = Object.entries(data).map(([id, member]) => ({
        id,
        ...member,
      }));
      setMembers(memberList);
    });
  }, []);

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

  const groupedTasks = {
    new: filteredAndSortedTasks.filter((task) => task.status === "new"),
    "in progress": filteredAndSortedTasks.filter((task) => task.status === "in progress"),
    finished: filteredAndSortedTasks.filter((task) => task.status === "finished"),
  };

  return (
    <div>
      <SortFilter filter={filter} setFilter={setFilter} />

      {/* 🟢 Meddelande-ruta */}
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

      <div className="task-board">
        <div className="task-column">
          <h2>NEW</h2>
          <AssignTask tasks={groupedTasks["new"]} members={members} setMessage={setMessage} />
        </div>

        <div className="task-column">
          <h2>IN PROGRESS</h2>
          <MarkTaskFinished tasks={groupedTasks["in progress"]} setMessage={setMessage} />
        </div>

        <div className="task-column">
          <h2>FINISHED</h2>
          <DeleteFinishedTask tasks={groupedTasks["finished"]} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
};

export { TaskBoard };
