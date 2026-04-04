<div align="center">

# 💻 KABIR-OS v1.0
### Interactive Retro Developer Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

*A fully functional retro operating system — running entirely in your browser.*

</div>

---

## 🖥️ What Is This?

KABIR-OS is my developer portfolio, reimagined as an interactive desktop OS. Instead of a standard scrolling page, visitors get a live desktop environment complete with draggable windows, an animated wallpaper engine, a working terminal, built-in arcade games, and a unified theme system — all with **zero backend required**.

> Built with real engineering: proper window z-index isolation, sandboxed code execution, canvas-based live wallpapers, and a responsive mobile mode for phone visitors.

---

## ✨ Feature Highlights

| Feature | Description |
|---------|-------------|
| 🖥️ **Multi-OS Themes** | Switch between Win95 Retro, macOS Modern, and Windows 11 Aero — live |
| 🎨 **Color Palette Engine** | 6 named presets (Matrix, Vaporwave, Amber, BSOD, etc.) via CSS variables |
| 🌊 **Live Wallpaper Engine** | Canvas-animated Cyber Rain, Matrix Rain, Starfield, Pixel Clouds, Retro Grid |
| 🗂️ **Draggable Windows** | Mouse drag, z-index management, minimize/restore, viewport clamping |
| 📱 **Mobile Responsive** | Dedicated mobile layout (app grid + bottom-sheet panels) for ≤768px |
| >_ **Interactive Terminal** | Full CLI with `help`, `projects`, `skills`, `whoami`, secret commands |
| 💻 **Code Playground** | Live JS/TS sandbox in a CSP-enforced iframe — no XSS risk |
| 🎮 **Arcade Games** | Fully playable Tetris, Snake, and Minesweeper built in React |
| 🏆 **Portfolio Apps** | About, Projects, Experience, Skills Radar, Resume (printable), Contact |
| 📎 **Clippy** | The infamous assistant — with rotating retro tips |
| 👁️ **Live View Counter** | Real-time visit count via countapi.xyz |
| 🖨️ **Print Mode** | Resume app renders a clean, print-ready PDF layout |

---

## 🛠️ Tech Stack

```
Frontend     React 19 · TypeScript 5 · Vite 8
Styling      Tailwind CSS v4 · CSS Custom Properties (HSL tokens)
Graphics     HTML Canvas API (Wallpaper Engine)
Security     Content-Security-Policy header · Sandboxed postMessage iframe
Responsive   CSS matchMedia hook · Mobile-first breakpoints
Analytics    countapi.xyz (free, anonymous view counter)
```

---

## 🚀 Running Locally

> You need [Node.js 18+](https://nodejs.org/) installed.

```bash
# 1. Clone
git clone https://github.com/signingoff-dubey/portfolio-website.git
cd portfolio-website

# 2. Install
npm install

# 3. Dev server → http://localhost:5173
npm run dev

# 4. Production build
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── apps/          # All portfolio app windows (Terminal, Projects, etc.)
│   ├── boot/          # Boot animation screen
│   ├── clippy/        # Clippy assistant
│   ├── desktop/       # Desktop, icon grid, wallpaper engine, context menu
│   ├── landing/       # Landing / splash screen
│   ├── mobile/        # Mobile layout + bottom sheet panel
│   ├── taskbar/       # Taskbar + Start menu
│   └── window/        # Window chrome, drag logic, WindowManager
├── context/
│   ├── SettingsContext.tsx   # Theme · wallpaper · OS style · boot mode
│   ├── WindowContext.tsx     # Window state, z-index, position clamping
│   └── ThemeController.ts   # Named theme presets
├── data/              # Static content (icons, achievements, tips, etc.)
├── hooks/             # useIsMobile, useViewCount
└── types/             # Shared TypeScript interfaces
```

---

## 🎨 Themes & OS Styles

| Preset | Colors | OS Style |
|--------|--------|----------|
| Retro Classic | BSOD Blue + Phosphor Green | Win95 |
| The Matrix | Deep Green monochrome | Win95 |
| Vaporwave | Purple/Pink neon | Win95 |
| Amber Terminal | Warm amber on dark | Win95 |
| macOS Modern | Frosted glass + white | macOS |
| Win 11 Aero | Dark blur + accent blue | Win11 |

Settings are persisted to `localStorage` — your OS stays the same on reload.

---

## 👋 Connect

- **LinkedIn:** [Aryan Dubey](https://linkedin.com/in/aryan-dubey-9b2271357/)
- **GitHub:** [@signingoff-dubey](https://github.com/signingoff-dubey)
- **Email:** kabir.aryandubey@gmail.com
