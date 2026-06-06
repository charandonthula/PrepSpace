<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:4F46E5,100:7C3AED&height=200&section=header&text=PrepSpace&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=Collaborative%20Study%20Workspace%20Platform&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Site-4F46E5?style=for-the-badge&labelColor=1e1b4b)](https://prepspace-frontend.netlify.app/pages/login.html)
[![Backend API](https://img.shields.io/badge/⚙️%20Backend%20API-Render-10b981?style=for-the-badge&labelColor=065f46)](https://prepspace-backend.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-181717?style=for-the-badge&logo=github)](https://github.com/charandonthula/PrepSpace)

<br/>

> **PrepSpace** is a full-stack collaborative study platform where students can create study groups, share resources, and work together in organized workspaces — all in one place.

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## 📸 Preview

<div align="center">

| Feature | Description |
|:---:|:---|
| 🏠 **Dashboard** | Overview of your joined workspaces at a glance |
| 📚 **Workspaces** | Organized study rooms for different subjects |
| 🔗 **Resources** | Share links, files, and study materials |
| 👥 **Members** | Collaborate with your study group |

</div>

---

## ✨ Features

<table>
  <tr>
    <td width="50%">

### 🔐 Authentication
- JWT-based secure login & registration
- Protected routes via middleware
- Session management

### 📁 Workspace Management
- Create and manage study workspaces
- Join existing workspaces with ease
- Leave workspaces anytime
- Full member management controls

    </td>
    <td width="50%">

### 📤 Resource Sharing
- Upload and share study files
- Add resource links & attachments
- Permission-based resource deletion

### 🎨 User Experience
- Toast notifications for all actions
- Confirmation modals before destructive actions
- Fully responsive UI design
- Clean, intuitive interface

    </td>
  </tr>
</table>

---

## 🏗️ Architecture

```
PrepSpace
├── 🌐 Frontend (Netlify)
│   ├── HTML / CSS / Bootstrap
│   └── Vanilla JavaScript
│
├── ⚙️ Backend (Render)
│   ├── Node.js + Express.js
│   ├── JWT Authentication
│   ├── RESTful API Design
│   └── Protected Middleware Routes
│
└── 🗄️ Database
    └── MongoDB Atlas (Cloud)
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:----------:|:--------|
| **Frontend** | HTML, CSS, Bootstrap, JS | UI & Interactivity |
| **Backend** | Node.js, Express.js | REST API Server |
| **Database** | MongoDB Atlas | Cloud Data Storage |
| **Auth** | JSON Web Tokens (JWT) | Secure Authentication |
| **Deployment** | Netlify + Render | Cloud Hosting |

</div>

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 14.x
npm >= 6.x
MongoDB Atlas account
```

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/charandonthula/PrepSpace.git
cd PrepSpace
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

```bash
npm start
```

### 3️⃣ Frontend Setup

Open `frontend/index.html` in your browser, or use a live server extension.

> **Tip:** Update the API base URL in your frontend JS files to point to `http://localhost:5000` for local development.

---

## 📡 API Endpoints

<details>
<summary><b>🔐 Auth Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

</details>

<details>
<summary><b>📁 Workspace Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/workspaces` | Get all workspaces |
| `POST` | `/api/workspaces` | Create a workspace |
| `POST` | `/api/workspaces/:id/join` | Join a workspace |
| `POST` | `/api/workspaces/:id/leave` | Leave a workspace |
| `DELETE` | `/api/workspaces/:id` | Delete a workspace |

</details>

<details>
<summary><b>📤 Resource Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/resources/:workspaceId` | Get workspace resources |
| `POST` | `/api/resources` | Upload a resource |
| `DELETE` | `/api/resources/:id` | Delete a resource |

</details>

---

## 🔮 Roadmap

```
✅ Phase 1 — Core Platform
   ✔ JWT Authentication
   ✔ Workspace CRUD
   ✔ Resource Sharing
   ✔ Cloud Deployment

🚧 Phase 2 — Enhanced Features (Coming Soon)
   ⬜ Cloudinary Integration for permanent file storage
   ⬜ Resource Search and Filtering
   ⬜ User Profiles & Avatars
   ⬜ Enhanced Mobile Responsiveness

🔭 Phase 3 — Analytics & Intelligence
   ⬜ Improved Dashboard Analytics
   ⬜ Activity Feeds
   ⬜ Notifications System
```

---

## 🌐 Deployment

| Service | Platform | URL |
|:--------|:--------:|:----|
| Frontend | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) | [prepspace-frontend.netlify.app](https://prepspace-frontend.netlify.app/pages/login.html) |
| Backend | ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black) | [prepspace-backend.onrender.com](https://prepspace-backend.onrender.com) |
| Database | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | MongoDB Atlas Cloud |

---

## 🙌 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/u/charandonthula" width="80" style="border-radius: 50%"/>

### Charan Donthula

[![GitHub](https://img.shields.io/badge/GitHub-charandonthula-181717?style=for-the-badge&logo=github)](https://github.com/charandonthula)

*Designed and built PrepSpace end-to-end — from authentication and workspace management to resource sharing and cloud deployment.*

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:7C3AED,100:4F46E5&height=120&section=footer" width="100%"/>

**⭐ If you found this project helpful, please give it a star!**

*Made with ❤️ by [Charan Donthula](https://github.com/charandonthula)*

</div>
