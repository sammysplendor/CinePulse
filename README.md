# CinePulse

React movie discovery app using the TMDB API to browse trending films, filter results, and watch trailers.

## Overview

CinePulse is a modern movie discovery platform focused on delivering a fast, intuitive, and visually engaging experience for exploring films.

The application allows users to discover trending movies, filter content based on preferences, and watch trailers — all within a clean, cinematic interface.

This project emphasizes **scalable frontend architecture, API integration, and production-ready UI patterns.**

## Features

- Browse trending movies (daily/weekly)
- Advanced filtering (genre, year, popularity, TV series)
- Watch official trailers via YouTube integration
- Clean, responsive dashboard (Home page) UI
- Smart content organization (Trending, Explore, Watchlist)
- Fast loading states and optimized API calls

## Tech Stack

### Core Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-1572B6?style=for-the-badge&logo=cssmodules&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Stack Details

- Framework: React (Vite)
- Routing: React Router
- Styling: CSS Modules
- API: TMDB (The Movie Database) API
- State Management: React Hooks

## Architecture & Design Decisions

**1. Component Structure**

The app is built with a modular component architecture to ensure:
- Reusability
- Maintainability
- Clear separation of concerns

**2. API Integration Strategy**

- Centralized API utility functions
- Error handling with fallback UI
- Data normalization before rendering

**3. UI/UX Approach**

- Minimal, distraction-free layout
- Content-first design (posters > text)
- Consistent spacing, typography, and hierarchy

**4. Performance Considerations**

- Lazy loading where necessary
- Efficient state updates
- Optimized image usage from TMDB

## Project Structure

```
src/
│
├── assets/          # Static files (images, icons, logos)
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Page-level views (Home, Explore, Trending)
├── routes/          # Route definitions and navigation logic
└── services/        # API functions
```

## API Integration

CinePulse uses the **TMDB API** to fetch:

- Trending movies
- Top rated movies
- Popular movies
- Movie details
- Genres
- TV series
- Trailer videos

## Getting Started

**1. Clone the repository**

</> Bash
```
git clone https://github.com/your-username/cinepulse.git
cd cinepulse
```

**2. Install dependencies**

</> Bash
```
npm install
```

**3. Add environment variables**

Create a .env file:
```
VITE_TMDB_API_KEY=your_api_key_here
```

**4. Run the app**

</> Bash
```
npm run dev
```

## Live Demo

View Live App

https://cinepulse-xi.vercel.app/

## What I Learned

- Structuring scalable React applications
- Handling real-world API integration and edge cases
- Designing UI systems with consistency and usability in mind
- Building production-ready frontend projects

## Future Improvements

- User authentication
- Personalized recommendations
- Backend layer

## Contributing

Contributions, issues, and feature requests are welcome.

## License

This project is open-source and available under the MIT License.
