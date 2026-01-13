# Government Jobs Portal - Frontend Setup Guide

## Project Structure

This Next.js frontend is designed to consume the Python FastAPI backend that scrapes government job listings from RSS feeds.

## Quick Start (After cloning)

```bash
npm install
# or
yarn install

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=5000
```

For production (Vercel):
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
```

## Project Architecture

### Directory Structure
```
gov-jobs-portal-frontend/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx            # Home page
│   ├── jobs/
│   │   ├── page.tsx       # Job listing page
│   │   └── [id]/
│   │       └── page.tsx   # Job detail page
│   ├── api/
│   │   └── [...route].ts  # API route handler
│   └── globals.css        # Global styles
├── components/               # Reusable components
│   ├── JobCard.tsx
│   ├── JobList.tsx
│   ├── SearchBar.tsx
│   ├── FilterSidebar.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── services/                 # API services
│   └── jobService.ts
├── hooks/                    # Custom hooks
│   ├── useJobs.ts
│   └── useFetch.ts
├── types/                    # TypeScript types
│   └── job.ts
├── styles/                   # Tailwind CSS config
│   └── globals.css
├── public/                   # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Key Features

1. **Job Listings** - Display all government job postings with pagination
2. **Search Functionality** - Search jobs by title, organization
3. **Filters** - Filter by category (job/admit_card/result), qualification, last_date
4. **Job Details** - View complete job information
5. **Responsive Design** - Mobile-first, similar to SarkariResult.com
6. **Fast Performance** - Server-side rendering with Next.js

## Dependencies Installed

- **next**: 14.0.0 - React framework
- **react**: 18.2.0 - UI library
- **axios**: 1.6.0 - HTTP client
- **tailwindcss**: 3.3.0 - CSS framework

## API Endpoints (Backend)

The frontend consumes these endpoints from the Python backend:

```
GET  /jobs/              - Get all jobs with pagination
GET  /jobs/{id}         - Get specific job details
GET  /jobs/stats/count  - Get total jobs count
```

Query Parameters:
- `skip`: Offset for pagination (default: 0)
- `limit`: Number of jobs per page (default: 100)

## File Creation Instructions

After cloning this repository, create the following files with the content provided in the subsequent files:

1. `.gitignore`
2. `next.config.js`
3. `tailwind.config.ts`
4. `tsconfig.json`
5. `postcss.config.js`
6. `app/layout.tsx`
7. `app/page.tsx`
8. `app/jobs/page.tsx`
9. `app/jobs/[id]/page.tsx`
10. `app/globals.css`
11. `components/JobCard.tsx`
12. `components/JobList.tsx`
13. `components/SearchBar.tsx`
14. `components/FilterSidebar.tsx`
15. `components/Header.tsx`
16. `components/Footer.tsx`
17. `services/jobService.ts`
18. `hooks/useJobs.ts`
19. `hooks/useFetch.ts`
20. `types/job.ts`
21. `public/.gitkeep`

Each file's content is provided in subsequent markdown sections.

## Deployment on Vercel

1. Push code to GitHub
2. Import repository on Vercel (https://vercel.com/import)
3. Set environment variable `NEXT_PUBLIC_API_BASE_URL`
4. Click Deploy

Your frontend will be live at `https://your-project-name.vercel.app`

## Development Notes

- Ensure the Python FastAPI backend is running on localhost:8000
- The API must have CORS enabled for localhost:3000
- Jobs are fetched server-side using Next.js API routes for better performance
- Tailwind CSS handles all styling

## Troubleshooting

**CORS Errors**: Ensure backend has CORS middleware enabled
**Jobs not loading**: Check if backend API URL is correct in .env.local
**Build errors**: Run `npm install` again and clear .next folder

## Next Steps

1. Review and customize the components
2. Add more filtering options as needed
3. Implement user authentication if required
4. Add job bookmarking/wishlist feature
5. Set up analytics

---

**See the following files for detailed code implementation.**
