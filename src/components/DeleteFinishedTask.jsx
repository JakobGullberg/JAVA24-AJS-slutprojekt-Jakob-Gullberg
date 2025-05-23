import React from "react";
import { getDatabase, ref, remove } from "firebase/database";

const DeleteFinishedTask = ({ tasks = [], setMessage, onOpenModal }) => {

  const handleDelete = (taskId) => {
    const db = getDatabase();
    const taskRef = ref(db, `assignments/${taskId}`);

    remove(taskRef)
      .then(() => {
        setMessage?.("✅ Uppgift raderad");
      })
      .catch((err) => {
        console.error("Fel vid radering:", err);
        setMessage?.("❌ Fel vid radering av uppgift");
      });
  };

  return (
    <div>
      {tasks.length === 0 && <p>Inga färdiga uppgifter att visa.</p>}
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <p>
            <strong>Uppgift:</strong> {task.assignment}
          </p>
          <p>
            <strong>Kategori:</strong> {task.category}
          </p>
          <p>
            <strong>Medlem:</strong> {task.member}
          </p>
          <p>
            <strong>Skapad:</strong>{" "}
            {new Date(task.timestamp).toLocaleString()}
          </p>

          <button onClick={() => onOpenModal?.(task)}>Redigera</button>


          <button onClick={() => handleDelete(task.id)}>Radera</button>
        </div>
      ))}
    </div>
  );
};

export { DeleteFinishedTask };
