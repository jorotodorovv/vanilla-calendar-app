## Vanilla Calendar App Documentation

This project provides a simple, user-friendly calendar application built with React, Next.js, Tailwind CSS, and Prisma for data persistence.

### Features

- **Appointment scheduling:** Users can schedule appointments for specific dates and times.
- **Calendar navigation:**  Navigate through months and years using intuitive controls.
- **Appointment view:** View scheduled appointments on the calendar grid.
- **Appointment confirmation:** A confirmation modal prompts users to finalize appointments.
- **Appointment details:** Provides information about the selected appointment, including date and time.
- **Data persistence:** Appointments are stored using a PostgreSQL database via Prisma.

### Usage

To use the application, follow these steps:

1. **Clone the repository:** `git clone https://github.com/your-repo/calendar-app.git`
2. **Install dependencies:** `npm install`
3. **Setup environment variables:** Ensure you have the necessary environment variables defined for database connection and locales.
4. **Run the development server:** `npm run dev`

### Technical Overview

- **Frontend:** The application's front-end is built using React and Next.js for server-side rendering and routing. Tailwind CSS is used for styling and design consistency.
- **Backend:** Prisma is used to connect to the PostgreSQL database and manage data interactions.

### Project Structure

- **src/pages/index.js:** Main component for the calendar view.
- **src/components:** Contains reusable components for the calendar, appointment selection, and modal.
- **src/base:**  Provides utility functions for date and time formatting.
- **src/store:** Manages state using Redux toolkit for handling appointment data.
- **src/lib/prisma.ts:** Contains the Prisma client for database interactions.
- **src/pages/api/appointments:** API endpoints for managing appointment data.

### How to Contribute

Contributions are welcome! Here's how to get involved:

1. **Fork the repository.**
2. **Create a new branch.**
3. **Make your changes and test them thoroughly.**
4. **Submit a pull request.**

### License

This project is licensed under the MIT License. See the LICENSE file for details.
