# Futhero Launcher

Futhero Launcher is a production-ready **Tauri v2 + React (Vite) desktop launcher** that lets users open **official browser games** inside an app-controlled WebView experience.

Initial games:
- Haxball: https://www.haxball.com/play
- Bonk.io: https://bonk.io

## Features

- Modern gaming-style dashboard (dark theme, responsive layout)
- Sidebar navigation (Home / Games / Settings / About)
- Animated game cards (Framer Motion scroll-reveal + hover lift)
- “Play” opens a dedicated **in-app game window** (separate Tauri WebviewWindow)
- In-game top bar with **Back** button (returns to launcher)
- Built for Windows distribution and Microsoft Store submission workflow

## Tech Stack

- Frontend: React + Vite + TypeScript
- Styling: TailwindCSS
- Motion: Framer Motion
- Desktop: Tauri v2

## Project Structure

```
src/
  components/
    Footer/
    GameCard/
    Navbar/
    Sidebar/
  hooks/
  pages/
    About/
    Games/
    Home/
    Play/
    Settings/
  utils/
src-tauri/
  src/
    main.rs
    lib.rs
  tauri.conf.json
```

## Prerequisites (Windows)

- Node.js (LTS recommended)
- Rust toolchain (includes `cargo`): https://rustup.rs
- Microsoft C++ Build Tools (MSVC) via Visual Studio Installer

## Development

Install dependencies:

```bash
npm install
```

Run in dev mode (Tauri + Vite):

```bash
npm run tauri dev
```

If you are using Git Bash and Tauri/Rust fails with `link.exe` errors, use the Windows helper script (it prepends the MSVC + Windows SDK toolchain paths so Git’s `link.exe` won’t be picked up):

```bash
npm run tauri:dev:win
```

## Build (Production)

Build the desktop app:

```bash
npm run tauri build
```

If you hit the same `link.exe` issue on Windows terminals, use:

```bash
npm run tauri:build:win
```

Optional: choose the Windows bundle type explicitly:

```bash
npm run tauri build -- --bundles msi
```

## Microsoft Store (MSIX) Publishing Guide

The Microsoft Store accepts MSIX packages. Tauri’s Windows bundling currently outputs MSI/NSIS, so the typical workflow is:
1) build your signed Windows installer with Tauri; then
2) wrap/convert it into an MSIX for Store submission.

### 1) Create a Microsoft Developer account

- Create or sign into a Microsoft account.
- Register as a developer here: https://developer.microsoft.com/
- Complete identity verification and accept agreements.

### 2) Reserve an app name in Partner Center

- Open Microsoft Partner Center.
- Create a new app submission.
- Reserve the name you want to show in the Store (this is separate from your local folder name).

### 3) Configure the app identity

You must keep these consistent across builds and submissions:
- **Package/identity name**: the identity reserved in Partner Center.
- **Publisher**: the exact publisher ID from Partner Center.
- **App identifier**: this repo uses `com.futhero.launcher` in [tauri.conf.json](src-tauri/tauri.conf.json).

When you generate an MSIX, set the package identity and publisher to match Partner Center, otherwise Store validation will fail.

### 4) Generate release artifacts with Tauri

Build your release binaries:

```bash
npm run tauri build
```

### 5) Create an MSIX package

Common options:
- **MSIX Packaging Tool**: Convert a desktop installer (MSI/EXE) into MSIX and set package identity/publisher.
- **Windows App SDK packaging**: Use an MSIX packaging project if you have a Windows-specific pipeline.

Key things to set during MSIX creation:
- Package identity name and publisher (must match Partner Center)
- Versioning (must increase for Store updates)
- Capabilities (keep minimal; request only what you truly need)

### 6) Upload the package to Microsoft Store

- In Partner Center, open your app submission.
- Upload the generated `.msix` (or `.msixbundle`, if applicable).
- Run Store validation checks and address any reported issues.

### 7) Screenshots and store listing metadata

Partner Center requires store listing assets. Prepare:
- Screenshots of the dashboard and a game window (use clear, readable UI)
- App icons (this project uses the generated Tauri icons in `src-tauri/icons/`)
- Description, keywords, category, and support contact

Follow the exact screenshot sizes and counts required by Partner Center at submission time (requirements can change).

## Legal Notice

This application only provides access to official game websites. All games belong to their respective owners.

It does not host, download, or redistribute game assets.
