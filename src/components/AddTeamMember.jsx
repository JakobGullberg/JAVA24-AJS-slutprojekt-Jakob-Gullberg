import React, { useState } from "react";
import { push } from "firebase/database";
import { membersRef } from "../firebase/config";
import { Modal } from "./Modal"; // återanvändbara modal

const AddTeamMember = () => {
  const [name, setName] = useState(""); // Medlemens namn
  const [role, setRole] = useState("ux"); // Roll i teamet
  const [error, setError] = useState(""); //  Visar valideringsfel
  const [isOpen, setIsOpen] = useState(false); // styr modalen

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validera att namn har fyllts i
    if (!name.trim()) {
      setError("Du måste skriva in ett namn.");
      return;
    }

    const newMember = { name, role };

   
   // Pushar medlem till Firebase Realtime Database
    push(membersRef, newMember)
      .then(() => {
        //  Nollställ formuläret efter att ha sparat
        setName("");
        setRole("ux");
        setIsOpen(false); // stänger modal vid framgång
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

          {/*  Felmeddelande visas vid valideringsfel eller sparfel */}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Modal>
    </>
  );
};

export { AddTeamMember };
