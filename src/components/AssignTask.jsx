// src/components/AssignTask.jsx

import React from "react";
import { getDatabase, update, ref } from "firebase/database";

const AssignTask = ({ tasks = [], members = [] }) =>{
  const handleAssign = (taskId, member) => {
    const db = getDatabase();
    const taskRef = ref(db, `assignments/${taskId}`);

    update(taskRef, {
      member: member.name,
      status: "in progress",
    })
      .then(() => console.log("Uppgift tilldelad"))
      .catch((err) => console.error("Fel vid tilldelning:", err));
  };

  return (
    <div>
      {tasks.map((task) => {
        const eligibleMembers = members.filter(
          (member) => member.role === task.category
        );

        return (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <p>
              <strong>Uppgift:</strong> {task.assignment}
            </p>
            <p>
              <strong>Kategori:</strong> {task.category}
            </p>
            <p>
              <strong>Skapad:</strong>{" "}
              {new Date(task.timestamp).toLocaleString()}
            </p>

            {eligibleMembers.length > 0 ? (
              <select
                onChange={(e) =>
                  handleAssign(task.id, JSON.parse(e.target.value))
                }
              >
                <option value="">Tilldela medlem</option>
                {eligibleMembers.map((member) => (
                  <option key={member.id} value={JSON.stringify(member)}>
                    {member.name}
                  </option>
                ))}
              </select>
            ) : (
              <p style={{ color: "red" }}>
                Inga tillgängliga medlemmar med rätt roll
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { AssignTask };
