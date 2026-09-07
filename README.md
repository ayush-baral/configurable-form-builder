# Configurable Form Builder

Interactive form builder: edit a nested field schema and see a live preview, export/import the config as JSON.

This react app uses Pnpm as package manager. so first install pnpm if you don't have it yet.

then run the following commands to install the dependencies and start the development server.

## Run

```bash
pnpm install
pnpm dev
```

Then open the URL `http://localhost:5173`.

## What it does

- Field types: **text**, **number**, **group** (groups nest inside each other)
- Edit label, required, number min/max
- Add, delete, move up/down within the same group
- Preview validates required fields and number min/max
- **Export JSON** / **Import JSON** (paste). Import checks the shape before replacing the schema

## Stack

Vite + React + TypeScript. Schema lives in React context. Tree updates and JSON parse/validate are plain functions in `src/utils/`. CSS Modules for styling.
