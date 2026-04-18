# Interior Design Management Platform

## Overview
This project is a full-stack web application that allows users to explore, upload, and manage interior design ideas. It provides category-based browsing, user authentication, and an interactive like system. The platform also includes an admin panel for managing all designs.

---

## Problem Statement
Users often rely on multiple platforms to find and manage interior design inspirations. There is no centralized system where users can:
- Upload and manage their own designs
- Explore categorized design ideas
- Interact with designs in real-time
- Have role-based access for better control

---

## Features

### Authentication
- User Registration and Login
- JWT-based authentication
- Secure API access

### Design Management
- Add new design with image upload
- Edit existing designs
- Delete designs

### Gallery and Categories
- View all designs in a gallery
- Category-based pages:
  - Bedroom
  - Living Room
  - Kitchen
  - Front Design

### Search and Filtering
- Global search from navbar
- Category-based filtering

### Like System
- Like and unlike designs
- Dynamic like count update

### Role-Based Access
- USER: Can view and manage own designs
- ADMIN: Can delete any design

### Admin Panel
- View all designs
- Delete any design from the platform

---

## Tech Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- Spring Boot
- REST APIs

### Database
- MySQL

### Authentication
- JWT (JSON Web Token)

### Tools
- VS Code
- Thunder Client

---

## Installation and Setup

### Backend Setup

1. Navigate to backend folder
2. Configure MySQL database in application.properties
3. Run the Spring Boot application

### Frontend Setup

1. Navigate to frontend folder
2. Install dependencies:
   npm install
3. Start the application:
   npm start

---

## API Endpoints

### Authentication
- POST /users/register
- POST /users/login

### Designs
- GET /api/designs/public
- POST /api/designs
- DELETE /api/designs/{id}

### Likes
- POST /api/likes/{designId}/{userId}
- GET /api/likes/{designId}

---

## Test Credentials

### User
Email: dilip@gmail.com  
Password: test123  

### Admin
Email: isha@gmail.com  
Password: test123  

---

## Test Cases

1. User Registration  
   Input: Valid user details  
   Output: User created successfully  

2. Login  
   Input: Correct credentials  
   Output: Token generated and stored  

3. Add Design  
   Input: Title, description, image  
   Output: Design added successfully  

4. Like Feature  
   Action: Click like button  
   Output: Like count updates  

5. Admin Access  
   Action: Login as admin  
   Output: Access to admin panel  

---

## Unique Features
- Full-stack integration using React and Spring Boot
- JWT-based authentication system
- Role-based access control
- Real-time like system
- Image modal popup with blur effect
- Global search functionality
- Admin panel for content management

---

## Future Improvements
- Comment system on designs
- Save/favorite designs
- Advanced filtering options
- User profile page
- Pagination for large datasets
- Deployment to cloud platforms

---

## Author
Isha Gupta
