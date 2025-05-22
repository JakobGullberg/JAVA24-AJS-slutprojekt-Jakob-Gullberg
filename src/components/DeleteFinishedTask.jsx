import React from "react";
import { getDatabase, ref, remove } from "firebase/database";

const DeleteFinishedTask = ({ tasks = [] }) =>{
  const handleDelete = (taskId) => {
    const db = getDatabase();
    const taskRef = ref(db, `assignments/${taskId}`);

    remove(taskRef)
      .then(() => console.log("Uppgift raderad"))
      .catch((err) => console.error("Fel vid radering:", err));
  };

  return (
    <div>
      {tasks.length === 0 && <p>Inga färdiga uppgifter att visa.</p>}
      {tasks.map((task) => (
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
            <strong>Medlem:</strong> {task.member}
          </p>
          <p>
            <strong>Skapad:</strong>{" "}
            {new Date(task.timestamp).toLocaleString()}
          </p>

          <button onClick={() => handleDelete(task.id)}>Radera</button>
        </div>
      ))}
    </div>
  );
};

export { DeleteFinishedTask };
