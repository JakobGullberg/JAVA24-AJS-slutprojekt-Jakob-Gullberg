import React from "react";
import { update, child } from "firebase/database";
import { assignmentsRef } from "../firebase/config";

const AssignTask = ({ tasks = [], members = [], setMessage, onOpenModal }) => {
  const handleAssign = (taskId, member) => {
    //const db = getDatabase();
    const taskRef = child(assignmentsRef, `/${taskId}`)
    // const taskRef = ref(getDatabase, `assignments/${taskId}`);

    update(taskRef, {
      member: member.name,
      status: "in progress",
    })
      .then(() => {
        setMessage?.(`✅ Uppgift tilldelad till ${member.name}`);
      })
      .catch((err) => {
        console.error("Fel vid tilldelning:", err);
        setMessage?.("❌ Fel vid tilldelning.");
      });
  };

  return (
    <div>
        {tasks.length === 0 && <p>Inga nya uppgifter att visa.</p>}
        {tasks.map((task) => {
        const eligibleMembers = members.filter(
          (member) => member.role === task.category
        );

        return (
          <div key={task.id} className="task-card">
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

            <button onClick={() => onOpenModal?.(task)}>Redigera</button>


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
