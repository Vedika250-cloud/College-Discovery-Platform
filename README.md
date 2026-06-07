# 🎓 CollegeFinder – Smart College Discovery Platform

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

CollegeFinder is a modern full-stack web application that helps students discover, compare, and evaluate colleges across India. The platform provides personalized recommendations, fit-score analysis, admission insights, and comparison tools to help students make informed higher education decisions.

---

## 🚀 Features

### 🔍 College Discovery

* Browse colleges across India
* Search and filter colleges by:

  * State
  * Course
  * Fees
  * Ownership Type
  * Placement Statistics

### 📊 Personalized Fit Score

* Analyze student-college compatibility
* Generate personalized recommendations
* Visual fit score and matching insights

### ⚖️ College Comparison

* Compare multiple colleges side-by-side
* Evaluate:

  * Fees
  * Placements
  * Rankings
  * Facilities
  * Campus Culture

### ❤️ Saved Colleges

* Save favorite colleges
* Create a personalized shortlist
* Access saved colleges from the dashboard

### 👤 Student Profile Management

* Personal Information
* Academic Information
* Entrance Exam Scores
* College Preferences
* Editable profile settings

### 📈 Dashboard

* Personalized recommendations
* Saved colleges overview
* Recent activity
* Profile completion tracking

### 🌙 Dark & Light Mode

* Modern responsive UI
* Theme persistence
* Consistent design system

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Shadcn/UI

### Backend

* Next.js API Routes
* Prisma ORM

### Database

* PostgreSQL / SQLite (Development)

### Authentication

* NextAuth.js

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── dashboard/
│   ├── colleges/
│   ├── compare/
│   ├── fit-score/
│   ├── profile/
│   ├── settings/
│   └── api/
│
├── components/
│   ├── college/
│   ├── layout/
│   ├── profile/
│   ├── dashboard/
│   └── ui/
│
├── lib/
├── prisma/
└── public/
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/College-Discovery-Platform.git
cd College-Discovery-Platform
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### Run Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🎯 Future Enhancements

* AI-powered college recommendations
* Admission chance prediction
* Scholarship finder
* College reviews and ratings
* Student community forums
* Application tracking dashboard
* Real-time cutoff analysis

---

## 📸 Screenshots

Add screenshots of:

* Landing Page
* Dashboard
* College Comparison
* Fit Score Analysis
* Profile Page

---

## 🤝 Contributors

* Vedika Singh
* Team Members (Add Names Here)

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

⭐ If you found this project useful, consider giving it a star on GitHub.
