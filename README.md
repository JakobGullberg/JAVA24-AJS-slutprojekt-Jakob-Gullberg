🧩 Scrum Board – Slutprojekt i React & Firebase

Detta är ett interaktivt Scrum Board byggt i React med Firebase Realtime Database.
Användaren kan skapa teammedlemmar, lägga till uppgifter, tilldela dem och följa deras status genom hela arbetsflödet: New → In Progress → Finished.

🌟 Funktionalitet

* Lägg till teammedlemmar med roll (UX, frontend, backend)
* Skapa nya uppgifter med kategori och timestamp
* Tilldela uppgifter (roll måste matcha)
* Ändra status till “Finished”
* Radera färdiga uppgifter
* Se alla uppgifter, grupperat efter status
* Filtrera och sortera på:
- Medlem
- Kategori
- Tid (nyast/äldst)
- Titel (A–Ö/Ö–A)
* Redigera uppgifter i modal (titel, kategori, medlem)
* Användarfeedback visas efter varje åtgärd

---

🧠 Struktur & Arkitektur

🔄 Dataflöde och status
1. Uppgifter skapas via AddTask och lagras i Firebase med status "new".
2. I NewTaskList kan en medlem med rätt roll tilldelas, vilket uppdaterar status till "in progress".
3. I InProgressTaskList kan uppgiften markeras som "finished".
4. I FinishedTaskList kan den raderas helt från databasen.
5. Uppgifter kan redigeras i alla steg via modal.

Alla ändringar sker i realtid tack vare Firebase onValue()-lyssnare i huvudkomponenten TaskBoard. (rad 34-51 Taskboard.jsx)

🧩 Komponentöversikt

| Komponent            | Syfte                                                               |
| -------------------- | ------------------------------------------------------------------- |
| `AddTask`            | Öppnar modal och låter användaren skapa ny uppgift                  |
| `AddTeamMember`      | Öppnar modal för att lägga till en ny teammedlem                    |
| `NewTaskList`        | Visar uppgifter med status `"new"`, tillåter tilldelning            |
| `InProgressTaskList` | Visar `"in progress"`-uppgifter, tillåter att markera som färdiga   |
| `FinishedTaskList`   | Visar `"finished"`-uppgifter, tillåter radering                     |
| `SortFilter`         | Filtrering och sortering av uppgifter                               |
| `Modal`              | Återanvändbar modal som används för både skapa och redigera         |
| `TaskBoard`          | Huvudkomponent – samlar all logik, realtidslyssning, och redigering |



## 🛠️ Teknisk information

-  **React** (med hooks och komponentstruktur)
-  **Parcel** som bundler
-  **Firebase Realtime Database** (för CRUD + live-synk)
-  **Modulär filstruktur**



- 📁 Filstruktur:
src/
├── components/
│   ├── AddTask.jsx
│   ├── AddTeamMember.jsx
│   ├── NewTaskList.jsx
│   ├── InProgressTaskList.jsx
│   ├── FinishedTaskList.jsx
│   ├── SortFilter.jsx
│   ├── TaskBoard.jsx
│   └── Modal.jsx
├── firebase/
│   └── config.jsx
├── index.html
└── main.jsx



## 📦 Kom igång

1. Klona detta repot:
 ```bash
 git clone [URL]
 cd [mapp]

 2. Installera beroende

- npm install

3. Starta utvecklingsservern:

- npm run dev


## 🔐 Firebase Setup

1. Skapa ett Firebase-projekt (via url : https://console.firebase.google.com)
2. Aktivera Realtime Database → välj region (t.ex. europe-west1)
3. Sätt regler till:
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
Då databasen inte kan ändras förrän man ändrat defaultvärdet "false" till "true".

4. Kopiera din config till firebase/config.jsx och exportera assignmentsRef & membersRef

