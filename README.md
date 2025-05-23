# 🧩 Scrum Board – Slutprojekt i React & Firebase

Detta projekt är ett interaktivt Scrum Board byggt i **React** med **Firebase Realtime Database**.  
Du kan skapa team members, lägga till uppgifter, tilldela dem och följa upp deras status från New → In Progress → Finished.

---

## 🚀 Funktionalitet

✅ Lägg till teammedlemmar med roll (UX, frontend, backend)  
✅ Skapa nya uppgifter med kategori och timestamp  
✅ Tilldela uppgifter (roll måste matcha)  
✅ Ändra status till “Finished”  
✅ Radera färdiga uppgifter  
✅ Se alla uppgifter, grupperat efter status  
✅ Filtrera & sortera på:
- Medlem
- Kategori
- Tid (äldre ↔ nyare)
- Titel (A–Ö)

✅ Redigera uppgift (titel, kategori, medlem) direkt i modal  
✅ Feedback visas vid sparande och uppdatering

---

## 🛠️ Teknisk information

- 📦 **React** (med hooks och komponentstruktur)
- ⚡ **Parcel** som bundler
- ☁️ **Firebase Realtime Database**


- 📁 Filstruktur:
src/
├── components/
│ ├── AddTask.jsx
│ ├── AddTeamMember.jsx
│ ├── AssignTask.jsx
│ ├── MarkTaskFinished.jsx
│ ├── DeleteFinishedTask.jsx
│ ├── SortFilter.jsx
│ ├── TaskBoard.jsx
│ └── Modal.jsx
├── firebase/
│ └── config.jsx
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

