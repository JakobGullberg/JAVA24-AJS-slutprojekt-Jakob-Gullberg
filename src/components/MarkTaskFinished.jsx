import React from "react";
import { getDatabase, update, ref } from "firebase/database";

const MarkTaskFinished = ({ tasks = [] }) =>{
  const handleFinish = (taskId) => {
    const db = getDatabase();
    const taskRef = ref(db, `assignments/${taskId}`);

    update(taskRef, {
      status: "finished",
    })
      .then(() => console.log("Uppgift markerad som färdig"))
      .catch((err) => console.error("Fel vid uppdatering:", err));
  };

  return (
    <div>
      {tasks.length === 0 && <p>Inga uppgifter att visa.</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}
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

          <button onClick={() => handleFinish(task.id)}>Markera som färdig</button>
        </div>
      ))}
    </div>
  );
};

export { MarkTaskFinished };
