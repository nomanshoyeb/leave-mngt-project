# Leave Management System (MERN Stack)

A full-stack Leave Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows employees to apply for leave and admins to manage and approve/reject requests.

---
## Admin Credentials
To Login as a admin use following credentials
- **Email:** admin@gmail.com  
- **Password:** 12345678
---

## Features

### User Features
- Register & Login
- Apply for leave
- View leave status (Pending / Approved / Rejected)
 
### Admin Features
- Secure admin login
- View all leave requests
- Approve / Reject leaves
 
---
## Environment Setup

To run this project locally, you need to configure environment variables for the backend.

---

### Backend (.env file)

Create a `.env` file inside the `server/` directory and add the following:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

NODE_ENV=development
```
### Frontend (.env file)

Create a `.env` file inside the `client/` directory and add:

```env
VITE_API_URL= your_backend_URL
```
---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB



