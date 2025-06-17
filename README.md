# 📅 Plateforme de Réservation d'Espaces

Application web full-stack permettant la réservation d'espaces (salles, bureaux, coworking) avec interface Angular, API Node.js/Express et base MongoDB.

## 📌 Objectifs

- Réserver, modifier ou annuler des espaces en ligne
- Interface utilisateur moderne et responsive
- Tableau de bord pour administrateurs
- Notifications par email
- Visualisation des créneaux via calendrier

---

## 🛠️ Stack technique

| Côté          | Technologies |
|---------------|--------------|
| Frontend      | Angular, Bootstrap, FullCalendar |
| Backend       | Node.js, Express, JWT, Nodemailer |
| Base de données | MongoDB (local ou Atlas) |
| Autres outils | Postman, VS Code, Nodemon |

---

## 🧩 Structure du projet

### 🔧 Backend (`/backend`)

backend/
├── config/
├── controllers/
├── models/
├── routes/
├── utils/
├── middlewares/
├── server.js
└── .env

### 🔧 Frontend (`/demo`)

frontend/
├── src/app/
│ ├── auth/
│ ├── reservation/
│ ├── espace/
│ ├── admin/
│ ├── shared/
│ ├── services/
│ └── app-routing.module.ts


## 🚀 Installation et lancement

### ⚙️ Prérequis

- Node.js
- Angular CLI
- MongoDB 
- VS Code (recommandé)


### 🖥️ Installation backend packages

npm init -y
npm install express mongoose cors dotenv nodemailer jsonwebtoken bcryptjs
npm install --save-dev nodemon

### 🖥️ Installation frontend packages


npm install bootstrap
npm install @auth0/angular-jwt
npm install fullcalendar @fullcalendar/angular @fullcalendar/daygrid