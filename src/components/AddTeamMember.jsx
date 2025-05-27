import React, { useState } from "react";
import { push } from "firebase/database";
import { membersRef } from "../firebase/config";
import { Modal } from "./Modal"; // 🧠 din återanvändbara modal

const AddTeamMember = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("ux");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 🔓 styr modalen

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Du måste skriva in ett namn.");
      return;
    }

    const newMember = { name, role };

   //const db = getDatabase();
    push(membersRef, newMember)
      .then(() => {
        setName("");
        setRole("ux");
        setIsOpen(false); // stäng modal vid framgång
      })
      .catch(() => {
        console.error("Firebase error");
        setError("Något gick fel vid sparandet.");
      });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>+ Lägg till medlem</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
      </Modal>
    </>
  );
};

export { AddTeamMember };
