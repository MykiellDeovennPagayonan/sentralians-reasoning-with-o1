<p align="center">
  <br>
  <img width="200" src="https://github.com/MykiellDeovennPagayonan/sentralians-reasoning-with-o1/blob/a553c70a06aba1e7a951241ce513340989138f41/public/logo.png" alt="logo">
  <br>
  <br>
</p>

<h1 align='center'>BricolAI</h1>

<p align='center'>
<strong>BricolAI</strong> is an AI-powered educational platform that enhances learning through interactivity. It generates custom flashcards, quizzes, physics simulations, and math problem visualizations, providing an engaging, real-time learning experience.
<br><br>

<p align='center'>
<i>Created by: team SEntralians</i>
<br>

## Features
🧠 <strong>Powerpoints, Flashcards, and Quizzes!</strong><br>
Turn facts into fun! Simply make a request in order reinforce your knowledge!
<video src="https://github.com/user-attachments/assets/14a8390f-2a50-4362-a6b4-716fcd649d61" controls="controls" style="max-width: 730px;">
</video>

🔤 <strong>Spelling Challenges</strong><br>
Hone your spelling skills with any topic you want!
<video src="https://github.com/user-attachments/assets/c9a08cff-7753-458d-a058-17d1ee714321" controls="controls" style="max-width: 730px;">
</video>

🎨 <strong>Drawing board on a canvas</strong><br>
Visualize ideas or physics problems on a canvas!
<video src="https://github.com/user-attachments/assets/6b34a8ec-166e-459c-845b-e41303a50b91" controls="controls" style="max-width: 730px;">
</video>

⚙️ <strong>Physics-based simulations</strong><br>
Experience science in action, watch the laws of physics come to life!
<video src="https://github.com/user-attachments/assets/42030fc3-e23b-45e9-9938-a642b3fcf5d4" controls="controls" style="max-width: 730px;">
</video>


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

To push the schema into your MongoDB cluster, run:

```bash
npx prisma db push
```

It is recommended to use MongoDB Atlas for hosting your clusters. Check out the official [MongoDB Atlas](https://www.mongodb.com/docs/atlas/) documentation for more info.

### 4. Start Development Server

After installing dependencies and setting up the database, run the following command in the root directory to start the development server:

```bash
npm run dev
```
