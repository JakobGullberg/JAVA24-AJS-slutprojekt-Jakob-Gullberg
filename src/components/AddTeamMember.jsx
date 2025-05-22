import React, { useState } from "react";
import { getDatabase, push } from "firebase/database";
import { membersRef } from "../firebase/config";

const AddTeamMember = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("ux");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Du måste skriva in ett namn.");
      return;
    }

    const newMember = { name, role };

    const db = getDatabase();
    push(membersRef, newMember)
      .then(() => {
        setName("");
        setRole("ux");
      })
      .catch(() => {
        console.error("Firebase error:", error);
        setError("Något gick fel vid sparandet.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till team member</h2>

      <input
        type="text"
        value={name}
        placeholder="Namn"
        onChange={(e) => setName(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="ux">UX</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </select>

      <button type="submit">Lägg till</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export { AddTeamMember };
