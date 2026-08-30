# SpendIQ

> Smart Expense Tracker with AI-powered spending insights.

SpendIQ is a modern expense tracking web application that helps users record, manage, and understand their daily spending.

The application provides a personalized dashboard with spending summaries, weekly spending charts, category-wise analysis, recent transactions, and AI-powered financial insights.

---

## 🚀 Live Demo

**Live Application:**  
https://pendiq-six.vercel.app/

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Supabase authentication
- Protected application routes
- Logout functionality
- Password reset support

### 💰 Expense Management
- Add new expenses
- Edit existing expenses
- Delete expenses
- Expense categories
- Merchant information
- Notes for transactions
- User-specific expense data

### 📊 Dashboard
- Total spending
- Weekly spending
- Biggest expense
- Recent transactions
- Weekly spending visualization
- Category-wise spending visualization

### 🤖 AI Insights
- AI-generated spending summary
- Identification of major money leaks
- Personalized saving suggestions
- Spending habit recommendations

### 📱 Responsive Design
- Desktop sidebar navigation
- Mobile header
- Mobile bottom navigation
- Responsive dashboard
- Responsive charts and expense lists

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React

### Backend
- Node.js
- Express
- REST API

### Database & Authentication
- Supabase
- PostgreSQL
- Row Level Security (RLS)

### Deployment
- Vercel — Frontend
- Render — Backend

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────┐
                    │     User         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Vercel        │
                    │    Frontend      │
                    │ React + TS       │
                    └────────┬─────────┘
                             │
                 ┌───────────┴───────────┐
                 │                       │
                 ▼                       ▼
        ┌─────────────────┐     ┌─────────────────┐
        │    Supabase     │     │     Render      │
        │ Auth + Database │     │ Express Backend │
        └─────────────────┘     └────────┬────────┘
                                         │
                                         ▼
                                ┌─────────────────┐
                                │    Supabase     │
                                │    Database     │
                                └─────────────────┘
