import React from "react";
import { getDatabase, ref, remove, child } from "firebase/database";
import { assignmentsRef } from "../firebase/config";

const DeleteFinishedTask = ({ tasks = [], setMessage, onOpenModal }) => {

  const handleDelete = (taskId) => {
    // Bekräftelse innan uppgift tas bort permanent
    const confirmDelete = window.confirm("Vill du verkligen radera denna uppgift?");
    if (!confirmDelete) return;

      // Hitta referensen till specifik uppgift i databasen
        const taskRef = child(assignmentsRef, `/${taskId}`)
    
     // Tar bort uppgift från Firebase
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
       {/* Visa fallback om det inte finns färdiga uppgifter */}
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
