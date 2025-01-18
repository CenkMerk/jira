# Jira Clone Project

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://jira-topaz.vercel.app/)

A Jira-like project management application built with Next.js, featuring drag-and-drop functionality and persistent storage.

## Features

- 📋 Kanban board with drag-and-drop functionality
- 💾 Local storage persistence for data management
- 📱 Responsive design for all devices
- ⚡ Real-time updates without page refresh
- 🎯 Project progress tracking
- 📊 Task management with status tracking

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- @hello-pangea/dnd (for drag and drop functionality)
- LocalStorage API
- Custom UI Component Collection (no external UI libraries)
- Vercel (for deployment)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jira-clone.git
cd jira-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Persistence

The application uses LocalStorage for data persistence, allowing users to:
- Maintain their data between page refreshes
- Keep track of project progress
- Save task states and updates locally

## Deployment

The project is deployed on Vercel and can be accessed at [https://jira-topaz.vercel.app/](https://jira-topaz.vercel.app/)


