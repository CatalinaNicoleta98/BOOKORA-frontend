# Bookora Frontend

Bookora is a modern reading tracker inspired by platforms like Goodreads and StoryGraph.  
The platform allows readers to discover books, track reading progress, organize personal libraries, write reviews, explore authors and series, and interact with the reading community.

This repository contains the frontend application for Bookora.

## Live Application

Frontend: https://bookora.catalinavrinceanu.com/login
Backend API: https://bookora-backend-592x.onrender.com/api  
Swagger Documentation: https://bookora-backend-592x.onrender.com/docs/

## Features

### Authentication
- User registration and login
- Persistent authentication state
- Protected routes

### Book Discovery
- Search books and readers
- Browse books by genre
- Detailed book pages
- Similar book recommendations
- Edition support
- Author pages
- Series pages with reading order

### Personal Library
- Reading statuses
  - Want to Read
  - Currently Reading
  - Finished Reading
  - Currently Listening
  - Finished Listening
  - On Break
  - Did Not Finish
- Ownership tracking
  - Physical
  - Ebook
  - Audiobook
- Reading dates
- Custom lists and shelves

### Social Features
- Public reader profiles
- Activity feed
- Reader statistics
- Reading goals
- Follow system
- Community reviews and ratings

### UI & UX
- Responsive modern interface
- Feature-based frontend architecture
- Dark mode support
- Reusable component system
- Scroll restoration handling
- Shared navigation and layout system

---

# Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Vitest
- React Testing Library

---

# Project Structure

src/
├── app/
│   └── router/
│
├── features/
│   ├── auth/
│   ├── authors/
│   ├── book/
│   ├── browse/
│   ├── home/
│   ├── legal/
│   ├── library/
│   ├── profile/
│   ├── search/
│   ├── series/
│   └── social/
│
├── shared/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── navigation/
│   ├── theme/
│   └── types/
│
├── styles/
├── tests/
├── App.tsx
└── main.tsx
