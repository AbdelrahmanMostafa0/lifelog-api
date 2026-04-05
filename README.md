# Lifelog API

A personal life logging REST API built with Express, TypeScript, and MongoDB.

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express 5
- **Database:** MongoDB via Mongoose
- **Auth:** JWT (access + refresh tokens via `httpOnly` cookies)
- **File uploads:** Multer + Cloudinary
- **Validation:** Zod
- **Email:** Resend
- **Docs:** Swagger (coming soon)

## Project Structure

```
src/
├── config/
├── middlewares/
│   ├── auth.middleware.ts
│   ├── multer.middleware.ts
│   └── validation.middleware.ts
├── models/
│   ├── user.model.ts
│   └── logs.model.ts
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   ├── auth.service.ts
│   │   ├── auth.types.ts
│   │   └── auth.validator.ts
│   ├── logging/
│   │   ├── logs.controller.ts
│   │   ├── logs.route.ts
│   │   ├── logs.service.ts
│   │   └── logs.validator.ts
│   └── user/
│       ├── user.controller.ts
│       ├── user.route.ts
│       └── user.service.ts
├── types/
├── utils/
│   ├── cloudinary.ts
│   ├── jwt.ts
│   └── response.ts
├── app.ts
├── routes.ts
└── index.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/AbdelrahmanMostafa0/lifelog-api.git
cd lifelog-api
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable               | Description                        |
| ---------------------- | ---------------------------------- |
| `MONGO_URI`            | MongoDB connection string          |
| `PORT`                 | Server port (default: 9000)        |
| `NODE_ENV`             | `development` or `production`      |
| `ACCESS_TOKEN_SECRET`  | Secret for signing access tokens   |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens  |
| `CLOUDINARY_CLOUD_NAME`| Cloudinary cloud name              |
| `CLOUDINARY_API_KEY`   | Cloudinary API key                 |
| `CLOUDINARY_API_SECRET`| Cloudinary API secret              |
| `RESEND_API_KEY`       | Resend API key for transactional email |
| `EMAIL_FROM`           | Sender address for emails          |
| `CLIENT_URL`           | Frontend URL (for CORS)            |

### Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint    | Description                          | Auth required |
| ------ | ----------- | ------------------------------------ | ------------- |
| POST   | `/register` | Register with email and password     | No            |
| POST   | `/login`    | Login with email and password        | No            |
| POST   | `/google`   | Login or register via Google OAuth   | No            |
| POST   | `/logout`   | Clear auth cookies                   | No            |

### Logs — `/api/logs` _(in progress)_

| Method | Endpoint  | Description        | Auth required |
| ------ | --------- | ------------------ | ------------- |
| GET    | `/`       | Get all user logs  | Yes           |
| POST   | `/`       | Create a new log   | Yes           |
| PATCH  | `/:id`    | Update a log       | Yes           |
| DELETE | `/:id`    | Delete a log       | Yes           |

## Auth Flow

Tokens are issued as `httpOnly` cookies on login/register and cleared on logout. Protected routes require a valid access token cookie.

Google OAuth is handled client-side — the client exchanges a Google access token with `/api/auth/google`, which verifies it against the Google userinfo endpoint and issues app tokens.
