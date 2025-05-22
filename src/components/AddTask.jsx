import React, { useState } from "react";
import { getDatabase, push } from "firebase/database";
import { assignmentsRef } from "../firebase/config";

const AddTask = () => {
  const [assignment, setAssignment] = useState("");
  const [category, setCategory] = useState("ux");
  const [error, setError] = useState("");

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

    const db = getDatabase();
    push(assignmentsRef, newTask)
      .then(() => {
        setAssignment("");
        setCategory("ux");
      })
      .catch(() => {
        console.error("Firebase error:", error);
        setError("Något gick fel vid sparandet av uppgiften.");
      });
  };

  return (
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

      <button type="submit">Lägg till uppgift</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export { AddTask };
