# BricolAi

**BricolAi** is an AI-powered educational platform that enhances learning through interactivity. It generates custom flashcards, quizzes, physics simulations, and math problem visualizations, providing an engaging, real-time learning experience.

## Getting Started

This guide is for developers looking to set up BricolAi on their local machine. Please follow the steps below carefully.

### 1. Install Dependencies

Make sure you are in the root folder, then run the following command to install all necessary dependencies:

```bash
npm install
```

### 2. Setup Environment Variables

After installing the dependencies, create a `.env` file in the root directory (at the same level as `README.md` and `package.json`). Populate it with the following values:

```bash
AIML_API_KEY=your_aiml_api_key
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_mongodb_atlas_connection_string

NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=your_random_secret

# OAuth Google Provider
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AWS S3 Bucket for file storage
BUCKET=your_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key

```

### 3. Database Setup

To migrate the database schema with Prisma, run:

```bash
npx prisma generate
```

### 4. Start Development Server

After installing dependencies and setting up the database, run the following command in the root directory to start the development server:

```bash
npm run dev
```
