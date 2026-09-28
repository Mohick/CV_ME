# 🚀 Interactive 3D Portfolio / CV

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

> **A highly interactive, scroll-driven, and multi-language Resume/CV Website built from scratch in just 2 hours!** ⏱️

This project is a modern approach to presenting a personal CV. Instead of a boring static page, it brings the user into an interactive cinematic experience where the CV "flies" into the screen as they scroll.

## ✨ Features

- **🎬 Cinematic Scroll Animations:** Built with `GSAP` and `ScrollTrigger`. The CV dynamically scales and zooms towards the user when scrolling.
- **🌍 Multi-language System (i18n):** Real-time language switching (Vietnamese, English, Chinese) driven by a sleek 3D scroll picker and custom event listeners. No page reload required!
- **🌓 Advanced Dark/Light Mode:** Seamless theme toggling powered by the cutting-edge **View Transitions API** (Bubble expansion effect).
- **📱 Fully Responsive:** The layout perfectly calculates screen width and height to dynamically scale the CV whether on Desktop, Tablet, or Mobile.
- **⚡ Performance Optimized:** Uses `useEffect` and `sessionStorage` intelligently to prevent unnecessary re-renders during high-frequency scroll events.
- **🎨 Premium UI/UX:** Styled completely with `TailwindCSS` featuring glassmorphism (`backdrop-blur`), smooth gradients, dynamic shadows, and elegant stagger animations.

## 🛠️ Tech Stack

- **Core:** React 18, TypeScript, Vite
- **Routing:** React Router v6
- **Animations:** GSAP (GreenSock Animation Platform)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API Fetching:** Axios

## 📂 Project Architecture

```
src/
├── _api/              # Fake API calls fetching JSON data
├── components/        # Reusable UI components (e.g. LoadingScreen)
├── pages/
│   ├── choose_langage/ # The landing page with the 3D scroll picker
│   ├── main_cv/        # The core Interactive CV page with ScrollTrigger
│   └── options/        # Picker logic & GSAP animations
├── service/           # Axios instance & interceptors
├── App.tsx            # Main wrapper + View Transitions Dark Mode
└── route.tsx          # App routing
public/
└── language/          # Local JSON databases (lang.json, cv_data.json)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and create your own `.env` file:
   ```bash
   cp .env.example .env
   ```
   *(By default, `VITE_API_BASE_URL` is set to `/` for fetching local JSON data).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 👨‍💻 Author

**Dư Bảo Nhàn**
- **Role:** Front-End Developer (React.js, Next.js)
- **LinkedIn:** [linkedin.com/in/nhan-du-mohick](https://linkedin.com/in/nhan-du-mohick/)

---
*Built with passion and lots of GSAP timelines.* 🚀
