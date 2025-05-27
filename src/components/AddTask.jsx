import React, { useState } from "react";
import { push } from "firebase/database";
import { assignmentsRef } from "../firebase/config";
import { Modal } from "./Modal"; 

const AddTask = () => {
  const [assignment, setAssignment] = useState("");
  const [category, setCategory] = useState("ux");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // kontrollerar modalen

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!assignment.trim()) {
      setError("Du måste skriva in en uppgift.");
      return;
    }

    const newTask = {
      assignment,
      category,
      status: "new",
      timestamp: Date.now(),
      member: "",
    };

    //const db = getDatabase();
    push(assignmentsRef, newTask)
      .then(() => {
        setAssignment("");
        setCategory("ux");
        setIsOpen(false); // stäng modal efter sparat
      })
      .catch(() => {
        console.error("Firebase error");
        setError("Något gick fel vid sparandet av uppgiften.");
      });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>+ Lägg till uppgift</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2>Lägg till uppgift</h2>

          <input
            type="text"
            value={assignment}
            placeholder="Beskrivning av uppgift"
            onChange={(e) => setAssignment(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="ux">UX</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>

          <button type="submit">Lägg till</button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Modal>
    </>
  );
};

export { AddTask };
