# Quick Start - Implementation Steps

## Step 1: Clone Repository Locally

```bash
git clone https://github.com/salil1993/govt-jobs-portal-frontend.git
cd govt-jobs-portal-frontend
npm install
```

## Step 2: Create Directory Structure

```bash
mkdir -p app/jobs app/api
mkdir -p components
mkdir -p services
mkdir -p hooks
mkdir -p types
mkdir -p public
```

## Step 3: Create Configuration Files

Copy these files from CODE_IMPLEMENTATION.md:
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS config
- `postcss.config.js` - PostCSS config
- `next.config.js` - Already created, verify it exists

## Step 4: Create TypeScript Types

**File: `types/job.ts`**
```typescript
export interface Job {
  id: number;
  title: string;
  organization: string;
  posts: number | null;
  qualification: string | null;
  last_date: string | null;
  notification_url: string | null;
  official_website: string | null;
  category: 'job' | 'admit_card' | 'result';
  source_type: 'scraped' | 'rss' | 'manual';
  scraped_from: string | null;
  created_at: string;
  updated_at: string;
}
```

## Step 5: Create Services Layer

**File: `services/jobService.ts`**
- Contains API communication logic
- Methods: getJobs(), getJobById(), searchJobs(), getJobsByCategory()
- See CODE_IMPLEMENTATION.md for full code

## Step 6: Create Custom Hooks

**File: `hooks/useJobs.ts`**
- Custom hook for fetching jobs
- Returns: jobs, loading, error state

**File: `hooks/useFetch.ts`**
- Generic fetch hook for any API calls
- Generic type support

## Step 7: Create App Layout

**File: `app/layout.tsx`**
```typescript
export const metadata = {
  title: 'Government Jobs Portal',
  description: 'Find latest government job postings',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Step 8: Create Pages

**File: `app/page.tsx`** - Home page
**File: `app/globals.css`** - Global styles with Tailwind
**File: `app/jobs/page.tsx`** - Job listings page
**File: `app/jobs/[id]/page.tsx`** - Job detail page

## Step 9: Create Components

**File: `components/Header.tsx`**
- Navigation header

**File: `components/Footer.tsx`**
- Footer with links

**File: `components/JobCard.tsx`**
- Single job display card

**File: `components/JobList.tsx`**
- Grid of job cards with pagination

**File: `components/SearchBar.tsx`**
- Search functionality

**File: `components/FilterSidebar.tsx`**
- Category and qualification filters

## Step 10: Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

For production (Vercel):
```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

## Step 11: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## Step 12: Test Locally

1. Ensure Python FastAPI backend is running on localhost:8000
2. Check http://localhost:8000/jobs/ returns data
3. Test frontend can fetch and display jobs
4. Test search and filter functionality

## Step 13: Deploy to Vercel

```bash
git add .
git commit -m "Complete frontend implementation"
git push origin main
```

Then:
1. Go to https://vercel.com/import
2. Select your repository
3. Add environment variable: `NEXT_PUBLIC_API_BASE_URL`
4. Click Deploy

## Important Notes

- All code snippets available in CODE_IMPLEMENTATION.md
- Refer to SETUP_GUIDE.md for detailed info
- Backend must have CORS enabled
- Use TypeScript for better type safety
- Tailwind CSS handles all styling

## Troubleshooting

**Issue: "Cannot find module"**
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules && npm install`

**Issue: "API not responding"**
- Check backend is running
- Verify API_BASE_URL in .env.local
- Check CORS settings on backend

**Issue: "Tailwind styles not applied"**
- Verify tailwind.config.ts paths are correct
- Restart dev server: `npm run dev`

## Next Steps After Implementation

1. Add user authentication
2. Implement job bookmarking
3. Add email notifications
4. Setup analytics
5. Optimize performance
6. Add more filters and advanced search
7. Implement dark mode

---

For complete code, see CODE_IMPLEMENTATION.md
For detailed setup, see SETUP_GUIDE.md
