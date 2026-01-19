# Copilot instructions (Bluestock — Company Registration & Verification Module)

## Stack (must-follow)
- Frontend: React 19 + Vite, react-router-dom, MUI (@mui/material + emotion), Redux Toolkit (no Context/plain Redux), React Query (@tanstack/react-query), axios.
- Forms: react-hook-form, react-phone-input-2, react-datepicker.
- Notifications/UI helpers: react-toastify, sweetalert2, react-responsive, recharts (as needed).
- Auth: Firebase (email/password + SMS OTP). Backend mints JWT (jsonwebtoken) with **90-day validity**.
- Backend: Node 20 LTS + Express, pg (PostgreSQL 15), bcrypt, express-validator, sanitize-html, libphonenumber-js, plus helmet/cors/compression.
- Media: Cloudinary for logo/banner; store returned URLs in Postgres.

## Big picture architecture
- Client uses Firebase SDK to authenticate (email/password and phone OTP), then calls backend to establish an app session.
- Backend verifies Firebase ID token, upserts user/company linkage in Postgres, then issues an app JWT used for protected APIs.
- Postgres is the source of truth for company profile, registration-step progress (multi-step), verification metadata, and stored Cloudinary URLs.

## Local ports (confirmed)
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:5001
- Postgres: localhost:5432

## Backend module system (confirmed)
- Backend uses **CommonJS** (`require`, `module.exports`). Entry: `backend/src/server.js`.

## Runbook (exact steps + commands)
### 1) Prereqs
- Install Node.js 20.x LTS
- Install PostgreSQL 15

### 2) Create project folders
```bash
mkdir -p /Users/monukaswan/bluestock_workspace/{frontend,backend}
mkdir -p /Users/monukaswan/bluestock_workspace/.github
```

### 3) Database setup (local)
Create a DB and import the provided schema SQL.
```bash
createdb company_db
# Download/import the provided SQL (path/name may vary based on your download)
psql -d company_db -f company_db.sql

# Quick verify
psql -d company_db -c "\dt" 
psql -d company_db -c "\d users" 
psql -d company_db -c "\d company_profile" 
```

### 4) Backend setup (Express)
```bash
cd /Users/monukaswan/bluestock_workspace/backend
npm init -y

# Runtime deps
npm i express pg jsonwebtoken bcrypt express-validator sanitize-html libphonenumber-js helmet cors compression http-errors dotenv firebase-admin cloudinary multer

# Dev/test deps
npm i -D nodemon jest supertest
```
Recommended basic scripts in `backend/package.json`:
- `dev`: run `nodemon src/server.js`
- `start`: run `node src/server.js`
- `test`: run `jest`

Run backend:
```bash
cp .env.example .env
npm run dev
# Expect: listening on http://localhost:5000
```

### 5) Frontend setup (React 19 + Vite)
```bash
cd /Users/monukaswan/bluestock_workspace
npm create vite@latest frontend -- --template react
cd frontend
npm i

# Required deps
npm i react-router-dom @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-redux @tanstack/react-query axios firebase react-hook-form react-phone-input-2 react-toastify react-responsive

# Optional/common per spec (install if used)
npm i sweetalert2 react-datepicker recharts

# Testing deps
npm i -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
Run frontend:
```bash
cp .env.example .env
npm run dev
# Expect: http://localhost:5173
```

### 6) Dev proxy (frontend → backend)
Prefer Vite proxy so axios can call `/api/*` without hardcoding URLs.
- Configure Vite to proxy `/api` to `http://localhost:5001`.

### 7) Demo/API testing
- Prepare a Postman collection (or VS Code Thunder Client) covering all endpoints:
  - valid + invalid payloads
  - missing/expired JWT (401)

## .env.example (backend)
Create `backend/.env.example` with:
- `PORT=5001`
- `NODE_ENV=development`
- `JWT_SECRET=replace_me_with_long_random_secret`
- `JWT_EXPIRES_IN_DAYS=90`
- `CORS_ORIGIN=http://localhost:5173`

# Postgres
- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USER=postgres`
- `DB_PASSWORD=postgres`
- `DB_NAME=company_db`

# Firebase Admin (server-side)
- `FIREBASE_PROJECT_ID=your_project_id`
- `FIREBASE_CLIENT_EMAIL=your_service_account_email`
- `FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`

# Cloudinary
- `CLOUDINARY_CLOUD_NAME=your_cloud_name`
- `CLOUDINARY_API_KEY=your_api_key`
- `CLOUDINARY_API_SECRET=your_api_secret`

## .env.example (frontend)
Create `frontend/.env.example` with:
- `VITE_API_BASE_URL=http://localhost:5001`

# Firebase client config
- `VITE_FIREBASE_API_KEY=your_api_key`
- `VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com`
- `VITE_FIREBASE_PROJECT_ID=your_project_id`
- `VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com`
- `VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id`
- `VITE_FIREBASE_APP_ID=your_app_id`

## Frontend implementation notes (must-follow)
- Multi-step registration form: build with `react-hook-form` for validation + step navigation.
- Dashboard: show user + company details and provide edit actions; use `@mui/material` components.
- State: Redux Toolkit manages auth/session + user/company state (e.g., `authSlice`, `companySlice`).
- API: use React Query for all server state; axios functions live in `src/api/*`.
- Responsive: implement Figma with `react-responsive` and MUI breakpoints.
- Notifications: use `react-toastify` for success/error.

## Frontend directory structure (expected)
- `frontend/`
  - `public/assets/` static assets
  - `src/assets/` images/fonts
  - `src/components/` reusable components (e.g., `FormStep`, `ProfileCard`, `ImageUploader`)
  - `src/pages/` route pages (e.g., `Login`, `Register`, `Dashboard`, `Settings`)
  - `src/store/` Redux slices (e.g., `authSlice`, `companySlice`)
  - `src/api/` axios service functions
  - `src/styles/` global styles + MUI theme
  - `src/App.jsx` routing
  - `src/main.jsx` entry

## Backend implementation notes (must-follow)
- Auth: Firebase for login/OTP, JWT (90-day) for API sessions.
- DB: Postgres 15 via `pg` using the provided SQL schema.
- Media: Cloudinary uploads; persist URLs to `company_profile.logo_url` / `company_profile.banner_url`.
- Security: express-validator + sanitize-html; helmet headers.

## Backend directory structure (expected)
- `backend/`
  - `src/controllers/` request handlers (e.g., `authController`, `companyController`)
  - `src/middleware/` JWT auth + validation middleware
  - `src/routes/` API route definitions
  - `src/services/` Firebase/Cloudinary/DB services
  - `src/models/` Postgres queries + schema helpers
  - `src/utils/` JWT helpers, error handling (`http-errors`)
  - `src/config/` env config (Firebase, Cloudinary, DB)
  - `src/tests/` unit + integration tests
  - `src/server.js` Express bootstrap

## Database schema (must-match)
- Database is normalized with **two tables**: `users` and `company_profile`.
- Relationship: `company_profile.owner_id` is a **FK → users(id)** (one user owns one company profile).
- `users` (auth + identity):
  - `id` PK serial/int
  - `email` unique not null
  - `password` bcrypt hash (not null)
  - `full_name` not null
  - `signup_type` char(1) default `'e'`
  - `gender` char(1) in `'m'|'f'|'o'`
  - `mobile_no` unique not null (with country code)
  - `is_mobile_verified` bool default false
  - `is_email_verified` bool default false
  - `created_at`, `updated_at` timestamps default current_timestamp
- `company_profile` (company details):
  - `id` PK serial/int
  - `owner_id` FK not null
  - `company_name`, `address`, `city`, `state`, `country`, `postal_code` not null
  - `industry` not null
  - Optional: `website`, `logo_url`, `banner_url`, `founded_date`, `description`, `social_links` (jsonb)
  - `created_at`, `updated_at` timestamps default current_timestamp
- Expect DB triggers to update `updated_at` on modifications; do not implement app-side logic that fights trigger-updated timestamps.
- Import schema from: https://bluestock.in/backoffice-tech/company_db (connect to local Postgres).

## Functional requirements (match behavior)
- Registration fields: email, password, full_name, gender, mobile_no, signup_type ('e').
- Firebase handles: email/password auth, SMS OTP for mobile verification, and email verification link.
- After OTP verification: set `users.is_mobile_verified = true`.
- After email link verification: set `users.is_email_verified = true`.
- Login: authenticate with Firebase; backend returns app JWT (90 days). Frontend stores JWT in Redux Toolkit and sends it in `Authorization: Bearer <token>`.
- Company registration: post-login dashboard shows multi-step form (per Figma). Persist into `company_profile` keyed by `owner_id`.
- Profile management: dashboard settings can update both `users` and `company_profile`. Support re-upload of logo/banner.

## API endpoints (contract)
- All APIs return JSON with proper status codes + error messages.
- Protected endpoints require JWT in `Authorization` header.
- Auth:
  - `POST /api/auth/register` Register user (email, password, full name, gender, mobile, signup_type)
  - `POST /api/auth/login` Login (returns JWT token)
  - `GET /api/auth/verify-email` Verify email via Firebase link
  - `POST /api/auth/verify-mobile` Verify mobile via Firebase OTP
- Company (JWT protected):
  - `POST /api/company/register` Submit company profile details
  - `GET /api/company/profile` Fetch company profile details
  - `PUT /api/company/profile` Update company profile details
  - `POST /api/company/upload-logo` Upload company logo to Cloudinary
  - `POST /api/company/upload-banner` Upload company banner to Cloudinary

## Error handling (must-follow)
- Backend: use `http-errors` to throw standardized HTTP errors (e.g., 400 invalid input, 401 unauthorized) and convert to JSON error responses.
- Frontend: display API/auth errors using `react-toastify`.

## Testing (required tooling + coverage targets)
- Frontend: use **Jest + React Testing Library** to test components, Redux slices, and API integration behavior.
  - Cover: wizard form validation and step navigation, profile display, image upload UI.
- Backend: use **Jest + Supertest** to test API endpoints.
  - Cover: user registration/login, company profile CRUD, JWT validation/authorization.
- Demo/API testing: be ready to run the full API through **Postman** or **VS Code Thunder Client** with valid + invalid inputs and edge cases.

## Documentation deliverables
- API documentation (Google Docs): endpoints, headers, request/response formats, and error codes.
- Technical documentation: setup steps, DB import/connection notes, code structure, Firebase + Cloudinary configuration.

## Security requirements
- Hash passwords with bcrypt.
- Validate with express-validator and sanitize with sanitize-html.
- Use helmet + cors; enable compression.
- Implement JWT auth middleware for all protected routes.

## Backend conventions (implement consistently)
- Express route structure: `routes/*` → `controllers/*` → `services/*` (keep DB access in services).
- Validation: use express-validator; sanitize string inputs with sanitize-html before persistence.
- Phone numbers: validate/normalize with libphonenumber-js.
- Auth middleware: verify JWT on protected routes; session JWT expiry = 90 days.

## UI reference
- Follow Figma strictly: https://www.figma.com/design/KL8dxFw2iWjnRpiPEJ8ljO/3-Warm-UP-Assignment?node-id=0-1
- Sample UI: https://bluestock.in/backoffice-tech/company-module-sample/index.html
