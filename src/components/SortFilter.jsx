import React from "react";

const SortFilter = ({ filter, setFilter }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        setFilter((prev) => {
          if (name === "sortTitle") {
            return {
              ...prev,
              sortTitle: value,
              sortTime: "", // nollställ bara på sorteringsval
            };
          }
      
          if (name === "sortTime") {
            return {
              ...prev,
              sortTime: value,
              sortTitle: "", // nollställ bara på sorteringsval
            };
          }
      
          // andra filter
          return {
            ...prev,
            [name]: value,
          };
        });
      };
      

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {/* Filter: Medlem */}
      <div>
        <label>Filtrera medlem:</label><br />
        <input
          type="text"
          name="member"
          placeholder="Skriv namn"
          value={filter.member}
          onChange={handleChange}
        />
      </div>

      {/* Filter: Kategori */}
      <div>
        <label>Filtrera kategori:</label><br />
        <select name="category" value={filter.category} onChange={handleChange}>
          <option value="">Alla uppgifter</option>
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      {/* Sortering: Datum */}
      <div>
        <label>Sortera datum:</label><br />
        <select name="sortTime" value={filter.sortTime} onChange={handleChange}>
          <option value="">Ingen vald</option>
          <option value="desc">Nyast först</option>
          <option value="asc">Äldst först</option>
        </select>
      </div>

      {/* Sortering: Namn */}
      <div>
        <label>Sortera namn:</label><br />
        <select name="sortTitle" value={filter.sortTitle} onChange={handleChange}>
          <option value="">Ingen vald</option>
          <option value="asc">A → Ö</option>
          <option value="desc">Ö → A</option>
        </select>
      </div>

      {/* Sammanfattning av val */}
      <div style={{ marginTop: "1rem", backgroundColor: "#f9fafb", padding: "0.5rem", borderRadius: "4px", width: "100%" }}>
        <strong>Visar:</strong>{" "}
        {filter.category ? `Kategori: ${filter.category}` : ""}
        {filter.category && filter.member ? " + " : ""}
        {filter.member ? `Medlem: ${filter.member}` : ""}
        {(!filter.category && !filter.member) && "Alla uppgifter"}

        {(filter.sortTitle || filter.sortTime) && " | "}

        {filter.sortTitle &&
          `Titel ${filter.sortTitle === "asc" ? "A → Ö" : "Ö → A"}`}
        {filter.sortTime &&
          `${filter.sortTitle ? " + " : ""}Datum: ${
            filter.sortTime === "asc" ? "Äldst först" : "Nyast först"
          }`}
        {(!filter.sortTitle && !filter.sortTime) && " | Ingen sortering"}
      </div>

      {/* Rensa-knapp */}
      <div style={{ marginTop: "0.5rem" }}>
        <button
          onClick={() =>
            setFilter({
              member: "",
              category: "",
              sortTitle: "",
              sortTime: "",
            })
          }
          style={{
            padding: "0.4rem 1rem",
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Rensa alla filter & sortering
        </button>
      </div>
    </div>
  );
};

export { SortFilter };
