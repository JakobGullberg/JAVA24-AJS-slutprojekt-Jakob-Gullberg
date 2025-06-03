

import React from "react";
import { update, child } from "firebase/database";
import { assignmentsRef } from "../firebase/config";

/*
 * Visar uppgifter med status "in progress" i en lista.
 * Användaren kan markera uppgifter som färdiga, vilket uppdaterar statusen till "finished" i Firebase.
 */

const InProgressTaskList = ({ tasks = [], setMessage, onOpenModal }) => {
  const handleFinish = (taskId) => {
       const taskRef = child(assignmentsRef, `/${taskId}`)
    
   

    update(taskRef, {
      status: "finished",
    })
      .then(() => {
        setMessage?.("✅ Uppgift markerad som färdig");
      })
      .catch((err) => {
        console.error("Fel vid uppdatering:", err);
        setMessage?.("❌ Fel vid uppdatering av uppgift");
      });
  };

  return (
    <div>
      {/* Visa fallback om det inte finns några uppgifter */}
      {tasks.length === 0 && <p>Inga uppgifter att visa.</p>}
      
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
          <button onClick={() => handleFinish(task.id)}>Markera som färdig</button>
            

        </div>
      ))}
    </div>
  );
};

export { InProgressTaskList };
