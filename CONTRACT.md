# SRM KTR Opportunities Platform — Shared Contract

> **Both developers must read and follow this document. It is the single source of truth.**

---

## Stack

Fixed — never change:

- **Framework:** Next.js (App Router, JavaScript, `src/` directory, import alias `@/*`)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Postgres + Auth)
- **Deployment:** Vercel
- Every page is a **Client Component** (`"use client"`) for simplicity.

---

## Two-Developer Split

Two developers work in parallel on separate branches.

- **Dev A** — backend/data layer, auth, admin, submit forms
- **Dev B** — public-facing UI, components, main pages

---

## File Ownership

### Dev A owns:
- `/supabase/*`
- `src/lib/*`
- `src/app/login`
- `src/app/signup`
- `src/app/submit`
- `src/app/wall/submit`
- `src/app/admin`
- `.env.local.example`
- `CONTRACT.md`
- `PROGRESS_A.md`
- Vercel / domain setup

### Dev B owns:
- `src/app/layout.js`
- `src/app/globals.css`
- `src/app/page.js`
- `src/app/opportunities/*`
- `src/app/learn`
- `src/app/wall/page.js`
- `src/app/about`
- `src/app/not-found.js`
- `src/components/*`
- `PROGRESS_B.md`

### Shared / read-only:
- `package.json` — **only Dev A adds dependencies**; Dev B is not allowed to.

---

## Database Tables

Exact names and columns — **do not rename anything**.

### `jobs`
| Column | Type | Notes |
|---|---|---|
| id | auto pk | |
| title | text | |
| company | text | |
| type | text | `'internship'` or `'full-time'` |
| apply_link | text | |
| deadline | date | |
| posted_at | timestamp | default `now()` |
| approved | boolean | default `false` |

### `hackathons`
| Column | Type | Notes |
|---|---|---|
| id | auto pk | |
| name | text | |
| organizer | text | |
| mode | text | `'online'` or `'offline'` |
| register_link | text | |
| deadline | date | |
| posted_at | timestamp | default `now()` |
| approved | boolean | default `false` |

### `resources`
| Column | Type | Notes |
|---|---|---|
| id | auto pk | |
| category | text | `'DSA'`, `'Web Dev'`, `'AI/ML'`, etc. |
| title | text | |
| link | text | |
| description | text | |
| approved | boolean | default `false` |

### `marquee_wall`
| Column | Type | Notes |
|---|---|---|
| id | auto pk | |
| student_name | text | |
| company | text | |
| role | text | |
| batch | text | |
| linkedin | text | optional |
| tips | text | optional |
| consent_given | boolean | |
| approved | boolean | default `false` |

---

## Data Layer Contract: `src/lib/api.js`

> Dev A writes this. Dev B only **calls** these functions — never edits the file.

Every function is `async` and returns `{ data, error }`.
- `data` is **always an array** (never `null`)
- `error` is `null` or a string (never thrown)

### Public functions

```js
getApprovedJobs()         // approved jobs, newest first
getLatestJobs(n)          // newest n approved jobs
getApprovedHackathons()   // approved hackathons, soonest deadline first
getLatestHackathons(n)    // n approved hackathons, soonest deadline first
getApprovedResources()    // approved resources
getApprovedWall()         // rows where approved=true AND consent_given=true

submitJob(obj)            // inserts, always sets approved=false → { data, error }
submitHackathon(obj)      // inserts, always sets approved=false → { data, error }
submitResource(obj)       // inserts, always sets approved=false → { data, error }
submitWallEntry(obj)      // inserts, always sets approved=false → { data, error }
```

### Admin-only functions

```js
getPending(table)         // rows where approved=false
approveRow(table, id)     // sets approved=true
rejectRow(table, id)      // deletes the row
```

---

## Auth Contract: `src/lib/auth.js`

> Dev A writes this. Dev B only **calls** these — never edits the file.

```js
useUser()       // → { user, loading }
                //   user is null when logged out
                //   user.email available when logged in

signOut()       // → Promise

isAdmin(user)   // → boolean
                //   compares user.email to NEXT_PUBLIC_ADMIN_EMAIL
```

**Signup / login allowed ONLY for emails ending in `@srmist.edu.in`.**

---

## Component Prop Contract

> Dev B builds these components. Dev A never touches them.

```jsx
<JobCard job={row} />
<HackathonCard hackathon={row} />
<ResourceCard resource={row} />
<WallCard entry={row} />
```

Each takes the **whole DB row** using the exact column names above.

---

## Routes

| Owner | Route |
|---|---|
| Dev B | `/` |
| Dev B | `/opportunities/jobs` |
| Dev B | `/opportunities/hackathons` |
| Dev B | `/learn` |
| Dev B | `/wall` |
| Dev B | `/about` |
| Dev A | `/login` |
| Dev A | `/signup` |
| Dev A | `/submit` |
| Dev A | `/wall/submit` |
| Dev A | `/admin` |

---

## Environment Variables

Names are fixed — **never rename**.

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_ADMIN_EMAIL
NEXT_PUBLIC_USE_MOCK
```

> ⚠️ Never commit `.env.local` to Git.

---

## Design Tokens

Dev B enforces these visually. Dev A must respect them in forms and admin pages.

| Token | Value |
|---|---|
| Primary color | `indigo-600` (hover: `indigo-700`) |
| Page background | `slate-50` |
| Text | `slate-900` |
| Muted text | `slate-600` |
| Card classes | `bg-white rounded-xl border border-slate-200 shadow-sm p-5` |
| Page container | `max-w-6xl mx-auto px-4 py-8` |
| Button classes | `rounded-lg px-4 py-2 font-medium` |
| Input classes | `w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500` |

Mobile-first: base Tailwind classes = mobile, then `sm:` / `md:` / `lg:` for larger screens.

---

## Ethics Rules (non-negotiable)

- No scraped or forwarded private data from Gmail / WhatsApp / college portal — ever.
- Marquee wall entries are only ever displayed publicly if **both** `consent_given = true` **AND** `approved = true`.
