# Assumptions – TriviaHub Project

## General Assumptions

- The project was expected to be a monolithic Laravel + Inertia + React stack instead of Laravel + Flutter as initially requested. This was a deliberate deviation due to development preferences and existing setup constraints.
- Email invitations using Mailtrap were assumed to be for testing only and not for real user delivery.
- The app was scoped for a small number of users (~10–20 concurrently) given the nature of a take-home assignment and local testing.

## Learnings and Insights

### Laravel + Inertia + React Stack

- Inertia bridges the gap between Laravel and React seamlessly without a separate API layer.
- Sanctum makes handling auth in SPAs simple and secure.
- Laravel Breeze is a quick and powerful starter kit for auth scaffolding.
- PHP unit tests can be modularly implemented on models, controllers, and routes for robust backend validation.

### Database Design

- Learned how to structure a normalized schema for a quiz engine:
    - `games`, `questions`, `choices`, `quiz_attempts`, and `invitations` all map to real-world trivia interactions.
    - Foreign key constraints and relationships like `hasMany` and `belongsTo` helped enforce integrity.
    - Seeding test data saved time when testing the flow end-to-end.

### Gameplay Mechanics

- Gameplay was implemented using simple GET/POST routes and session handling without the need for advanced real-time features.
- Score evaluation is done after quiz submission using a backend comparison of selected choices.

### Email & Invitation System

- Used Mailtrap for testing email invitations.  
  📌 **Assumption:** Mailtrap only delivers emails to the developer’s own inbox and cannot send real invitations to external users. A production-ready app would need to use a real SMTP provider (e.g., SendGrid, Mailgun, SES).
- Tokenized invitation links allowed secure and direct access to trivia sessions for invited users.
- Laravel Mailables provided an easy way to customize and format email content.

### UI/UX

- Used Tailwind CSS for rapid UI development.
- Emphasis was placed on responsive design, clean layout, and accessibility.
- React hooks helped manage quiz flow and user interaction state effectively.

## Testing & Documentation

- Postman was used to document all API endpoints and test their behavior.
- Focused heavily on writing a thorough README with screenshots, setup instructions, and a visual ERD for clarity.

## Trade-offs / Simplifications

- In-app notifications were scoped out due to time constraints, though event-based architecture was considered.
- Admin panel and Firebase notifications were marked as optional and not implemented to prioritize core functionality.
- Chose PostgreSQL but included MySQL support fallback in `.env.example`.
