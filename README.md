# VTrust

### A Smart Student & Community Networking Platform

> Building a student space where **who you trust is as important as what you learn.**

---

## What is VTrust?

VTrust is a platform designed to simplify how students **ask, connect, and collaborate**.

Instead of switching between multiple apps, VTrust brings everything into one focused system built specifically for students.

---

## The Problem

Students today:

* Struggle to find **reliable answers**
* Hesitate to ask doubts in the wrong spaces
* Cannot easily connect with the *right* peers or mentors

There is no single platform that combines:

* Doubt solving
* Networking
* Messaging

---

## Our Idea

VTrust combines all essential student interactions into one system:

* Ask questions
* Discover people
* Chat directly
* Build your profile

The focus is on **clarity, simplicity, and trust-based interaction**.

---

## What Makes VTrust Unique

VTrust introduces a **trust and reputation layer** on top of interactions.

* Users earn **badges** based on contributions and activity
* **Verification ticks** highlight trusted users
* Profiles reflect **upvotes, engagement, and consistency**

This allows users to:

* Quickly identify credible answer providers
* Trust responses with more confidence
* Improve overall quality of discussions

---

## Key Features

### Authentication

* Login / Signup (OTP-based mock)
* Protected routes

### Home Feed

* Post questions
* Like and comment
* Topic-based filtering

### Discover

* Explore users and mentors
* Search and filters

### Messaging

* Chat interface with real-time feel
* Unread indicators

### Profile

* Editable profile
* Bio, interests, activity

---

## Tech Stack

| Layer      | Technology      |
| ---------- | --------------- |
| Frontend   | React 19        |
| Build Tool | Vite            |
| Routing    | React Router v7 |
| Styling    | Tailwind CSS    |
| Storage    | LocalStorage    |
| Icons      | Lucide React    |

Built with a focus on **performance, scalability, and clean UI**.

---

## Architecture

```
User → React UI → State Management → localStorage
```

* Component-based structure
* Routing via React Router
* Data persistence using localStorage

---

## Project Structure

```
src/
  pages/
  components/
  hooks/
  routes/
```

* Modular design
* Reusable components
* Custom hooks (e.g. useProfileData)

---

## UI / UX

* Clean and minimal layout
* Dark theme
* Responsive design
* Smooth navigation

---

## Demo Flow

1. Login / Signup
2. Browse home feed
3. Post and interact
4. Discover users
5. Chat via messaging
6. Edit profile

---

## Future Scope

* Backend integration (Node.js / Firebase)
* Real-time chat using WebSockets
* AI-based mentor suggestions
* Recommendation system
* Mobile application

---

## Challenges

* Managing state without backend
* Handling routing and authentication
* Maintaining UI consistency

---

## Conclusion

VTrust is designed to improve how students connect, learn, and collaborate.

It focuses not just on interaction, but on **building trust within the community**.

---

## Team

Add your team details here

---

## Repository Setup

```bash
git clone <your-repo-link>
cd vtrust
npm install
npm run dev
```

---

## Support

If you found this project interesting, consider giving it a star.

---
