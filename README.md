# Nextgen_Academy
# Course Management System

## Overview

This is a Course Management System built using **React** for the frontend ans subabase for the backend. The system allows users to manage and display courses, each with a title, description, and an associated author. The course data is stored in a PostgreSQL database managed by Supabase.

---

## Features

- **Course Creation**: Add new courses to the platform.
- **Course Display**: View a list of all available courses.
- **Dashboard**: Display the number of courses and basic information.
- **Profile Management**: Link courses to specific authors through a user profile.
- **Backend**: Powered by Supabase for database management and authentication.
- **Frontend**: Built with React to render the course data dynamically.

---

## Prerequisites

- **Node.js**: Version 14 or higher.
- **Supabase account**: Required for managing the database and authentication.
- **npm or yarn**: Package managers for installing dependencies.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abeleyasu/nextgenacademy.git
cd course-management-system
2. Install dependencies
Use npm or yarn to install the required dependencies:

bash
Copy
Edit
npm install
# or
yarn install
3. Set up Supabase
Create a Supabase project at Supabase.
Create the required tables (courses, profiles, etc.) in the Supabase dashboard.
Obtain the Supabase API keys and URL and store them in a .env file in the root of the project:
env
Copy
Edit
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Run the application
To start the React development server and view the application locally:

bash
Copy
Edit
npm start
# or
yarn start
This will launch the app in your browser at http://localhost:5173.

Database Schema
Courses Table
id (uuid): Unique identifier for each course.
title (text): The title of the course.
description (text): A brief description of the course.
image_url (text): URL for an image representing the course.
author_id (uuid): A foreign key linking to the profiles table to associate a course with an author.
created_at (timestamptz): Timestamp when the course was created.
Profiles Table
id (uuid): Unique identifier for each profile (links to auth.users.id).
username (text): Username of the profile.
full_name (text): Full name of the profile's user.
role (text): The user's role (e.g., Admin, Instructor).
API Endpoints
Courses API
GET /courses: Fetch all courses.
POST /courses: Add a new course (requires title, description, author_id).
Technologies Used
Frontend: React
Backend: Supabase (PostgreSQL, Auth)
Authentication: Supabase Authentication
Database: PostgreSQL
Contributing
Feel free to open issues and create pull requests to contribute to the project. All contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Supabase for the backend platform.
React for building the frontend.
markdown
Copy
Edit

### Explanation:

1. **Overview**: Describes the purpose of the project.
2. **Features**: Lists the core features of the system.
3. **Prerequisites**: Lists necessary software and tools to run the project.
4. **Getting Started**: Explains how to clone, install dependencies, and run the project.
5. **Database Schema**: Describes the structure of the tables in the database.
6. **API Endpoints**: Provides a simple overview of the available API routes.
7. **Technologies Used**: Highlights the tech stack used in the project.
8. **Contributing**: Encourages others to contribute to the project.
9. **License**: Lists the project's open-source license (MIT by default).
10. **Acknowledgments**: Credits the tools and libraries used.
11.
---

