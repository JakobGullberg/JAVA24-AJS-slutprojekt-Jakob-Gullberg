import React from "react";

const SortFilter = ({ filter, setFilter }) => {
  // Hanterar alla sorterings- och filterändringar
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sortCombined") {
      // Hantera kombinerad sorteringlogik
      let sortTitle = "";
      let sortTime = "";

      if (value === "title-asc") sortTitle = "asc";
      else if (value === "title-desc") sortTitle = "desc";
      else if (value === "time-asc") sortTime = "asc";
      else if (value === "time-desc") sortTime = "desc";

      setFilter((prev) => ({
        ...prev,
        sortTitle,
        sortTime,
      }));

      return;
    }
    // Hanterar vanliga filterfält (medlem, kategori)
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Visar rätt kombinerad sortering i dropdown
  const currentSortValue =
    filter.sortTitle === "asc"
      ? "title-asc"
      : filter.sortTitle === "desc"
      ? "title-desc"
      : filter.sortTime === "asc"
      ? "time-asc"
      : filter.sortTime === "desc"
      ? "time-desc"
      : "";

  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {/* Filter: Medlem */}
      <div>
        <label>Filtrera medlem:</label>
        <br />
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
        <label>Filtrera kategori:</label>
        <br />
        <select
          name="category"
          value={filter.category}
          onChange={handleChange}
        >
          <option value="">Alla uppgifter</option>
          <option value="ux">UX</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>

      {/* Sammanlagd sortering */}
      <div>
        <label>Sortera:</label>
        <br />
        <select
          name="sortCombined"
          value={currentSortValue}
          onChange={handleChange}
        >
          <option value="">Ingen sortering</option>
          <option value="title-asc">Titel A → Ö</option>
          <option value="title-desc">Titel Ö → A</option>
          <option value="time-desc">Datum: Nyast först</option>
          <option value="time-asc">Datum: Äldst först</option>
        </select>
      </div>

      {/*  Visar aktivt filter/sortering */}
      <div
        style={{
          marginTop: "1rem",
          backgroundColor: "#f9fafb",
          padding: "0.5rem",
          borderRadius: "4px",
          width: "100%",
        }}
      >
        <strong>Visar:</strong>{" "}
        {filter.category ? `Kategori: ${filter.category}` : ""}
        {filter.category && filter.member ? " + " : ""}
        {filter.member ? `Medlem: ${filter.member}` : ""}
        {!filter.category && !filter.member && "Alla uppgifter"}

        {(filter.sortTitle || filter.sortTime) && " | "}

        {filter.sortTitle &&
          `Titel ${filter.sortTitle === "asc" ? "A → Ö" : "Ö → A"}`}
        {filter.sortTime &&
          `${filter.sortTitle ? " + " : ""}Datum: ${
            filter.sortTime === "asc" ? "Äldst först" : "Nyast först"
          }`}
        {!filter.sortTitle && !filter.sortTime && " | Ingen sortering"}
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
