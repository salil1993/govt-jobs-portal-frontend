# Government Jobs Portal - Next.js Frontend

## Overview

A modern, responsive Next.js frontend application for displaying government job listings scraped from RSS feeds by the Python FastAPI backend. Features include job search, category filtering, job details view, and a design similar to SarkariResult.com.

## Demo

**Backend Scraper**: https://github.com/salil1993/govt_job_scraper
**Frontend URL** (when deployed): Will be available on Vercel

## Features

- **Job Listings**: Display all scraped government job postings with pagination
- **Search**: Search jobs by title and organization
- **Filtering**: Filter by category (job/admit_card/result)
- **Job Details**: View complete job information including qualifications, deadline, and links
- **Responsive Design**: Mobile-first UI using Tailwind CSS
- **Server-Side Rendering**: Fast page loads with Next.js
- **Type-Safe**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **React**: 18.2
- **Styling**: Tailwind CSS 3.3
- **HTTP Client**: Axios 1.6
- **Language**: TypeScript
- **Deployment**: Vercel

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python backend running on localhost:8000 (for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/salil1993/govt-jobs-portal-frontend.git
cd govt-jobs-portal-frontend

# Install dependencies
npm install

# Create environment file
echo 'NEXT_PUBLIC_API_BASE_URL=http://localhost:8000' > .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create `.env.local` in the root directory:

```env
# API Backend URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Optional: API Timeout (in ms)
NEXT_PUBLIC_API_TIMEOUT=5000
```

For production (Vercel), set the environment variable to your deployed backend URL.

## Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout wrapper
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global Tailwind styles
│   ├── jobs/
│   │   ├── page.tsx       # Job listings page
│   │   └── [id]/
│   │       └── page.tsx   # Job detail page
│   └── api/
│       └── [...route].ts  # API proxy (optional)
├── components/              # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── JobCard.tsx
│   ├── JobList.tsx
│   ├── SearchBar.tsx
│   └── FilterSidebar.tsx
├── services/               # API service layer
│   └── jobService.ts
├── hooks/                  # Custom React hooks
│   ├── useJobs.ts
│   └── useFetch.ts
├── types/                  # TypeScript interfaces
│   └── job.ts
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## API Integration

The frontend consumes these endpoints from the FastAPI backend:

### Endpoints

```
GET  /jobs/              Get all jobs with pagination
GET  /jobs/{id}         Get specific job details
GET  /jobs/stats/count  Get total count of jobs
```

### Query Parameters

- `skip`: Offset for pagination (default: 0)
- `limit`: Number of jobs per page (default: 100)

### Response Example

```json
[
  {
    "id": 1,
    "title": "Assistant Engineer",
    "organization": "ISRO",
    "posts": 50,
    "qualification": "B.Tech",
    "last_date": "2024-02-15",
    "notification_url": "https://example.com/notification",
    "official_website": "https://isro.gov.in",
    "category": "job",
    "source_type": "scraped",
    "scraped_from": "RSS Feed",
    "created_at": "2024-01-13T10:00:00",
    "updated_at": "2024-01-13T10:00:00"
  }
]
```

## Key Components

### JobCard
Displays a single job in card format with title, organization, posts, qualification, deadline, and category.

### JobList
Container component that handles pagination and displays multiple JobCard components.

### SearchBar
Provides real-time search functionality across job titles and organizations.

### FilterSidebar
Allows filtering by category, qualification, and other criteria.

### Header & Footer
Navigation and branding components for the application.

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Deployment on Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial Next.js frontend setup"
git push origin main
```

2. Visit https://vercel.com/import

3. Import the repository

4. Add Environment Variables:
   - Key: `NEXT_PUBLIC_API_BASE_URL`
   - Value: Your deployed backend URL

5. Click "Deploy"

Your app will be live at `https://govt-jobs-portal-frontend.vercel.app`

## Performance Optimizations

- Server-side rendering for faster initial page loads
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS minification with Tailwind
- API response caching
- Pagination to reduce data transfer

## Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled for localhost:3000 in development
- For Vercel deployment, add your domain to CORS allowed origins

### Jobs Not Loading
- Check if backend is running: `http://localhost:8000/jobs/`
- Verify API URL in `.env.local`
- Check browser console for error messages

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Verify Node.js version: `node --version`

## Future Enhancements

- [ ] User authentication and bookmarks
- [ ] Email notifications for new jobs
- [ ] Advanced filters (location, salary, experience)
- [ ] Job application tracking
- [ ] Admin dashboard for managing listings
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Analytics and tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use in your projects

## Support

For issues or questions:
- GitHub Issues: [Open an issue](https://github.com/salil1993/govt-jobs-portal-frontend/issues)
- Email: your-email@example.com

## Documentation Files

- **SETUP_GUIDE.md** - Detailed setup and configuration guide
- **CODE_IMPLEMENTATION.md** - Complete code implementation with all file contents

---

**Built with ❤️ using Next.js and Tailwind CSS**
