# Video Link
- https://drive.google.com/file/d/1qmC3osHr_ELGFRl7NKKkJg5B5TOp2iuI/view?usp=sharing

# MERN Machine Test Documentation  

## Table of Contents  
1. [Introduction](#introduction)  
2. [Technologies Used](#technologies-used)  
3. [Project Structure](#project-structure)  
4. [Installation and Setup](#installation-and-setup)  
5. [Features](#features)  
6. [API Endpoints](#api-endpoints)  
7. [Usage Guide](#usage-guide)  
8. [Demo and Output](#demo-and-output)  
9. [Troubleshooting](#troubleshooting)  
10. [Contact Information](#contact-information)  

---

## Introduction  

This project is a submission for the MERN Developer internship machine test for **DealsDray Online Pvt. Ltd.** It demonstrates the ability to create a full-stack web application using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  

---

## Technologies Used  

- **Frontend**:  
  - React.js  
  - CSS/Tailwind CSS (if applicable)  
  - Axios (for API requests)  

- **Backend**:  
  - Node.js  
  - Express.js  

- **Database**:  
  - MongoDB  

- **Additional Tools**:  
  - Postman (for API testing)  
  - Git and GitHub (version control)  

---

## Project Structure  

```
project-name/  
│  
├── backend/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── server.js  
│   ├── package.json  
│  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── App.js  
│   │   ├── index.js  
│   ├── package.json  
│  
├── .env  
├── README.md  
```  

---

## Installation and Setup  

### Prerequisites  
- Ensure **Node.js** and **npm** are installed.  
- MongoDB should be running locally or you have a connection string for a cloud-based database.  

### Steps  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/your-github-username/project-name.git  
   ```  

2. **Navigate to the Project Directory**  
   ```bash  
   cd project-name  
   ```  

3. **Install Backend Dependencies**  
   ```bash  
   npm install  
   ```  

4. **Install Frontend Dependencies**  
   ```bash  
   cd frontend  
   npm install  
   cd ..  
   ```  

5. **Set up Environment Variables**  
   Create a `.env` file in the root directory and include:  
   ```plaintext  
   MONGO_URI=<your_mongodb_connection_string>  
   PORT=5000  
   ```  

6. **Run the Application**  
   - Start the backend:  
     ```bash  
     npm run server  
     ```  
   - Start the frontend:  
     ```bash  
     cd frontend  
     npm start  
     ```  

---

## Features  

1. User Authentication and Authorization (if applicable).  
2. CRUD operations for [specific functionality].  
3. Responsive and user-friendly UI.  
4. RESTful API integration.  

---

## API Endpoints  

### Base URL  
`http://localhost:5000/api`  

### Endpoints  

1. **Users**  
   - `POST /users/register` - Register a new user.  
   - `POST /users/login` - User login.  

2. **[Additional Resources]**  
   - `GET /[resource]` - Fetch all [resource].  
   - `POST /[resource]` - Add new [resource].  
   - `PUT /[resource]/:id` - Update [resource] by ID.  
   - `DELETE /[resource]/:id` - Delete [resource] by ID.  

---

## Usage Guide  

1. Launch the application by opening `http://localhost:3000` in your browser.  
2. Register or log in (if authentication is implemented).  
3. Perform [describe key actions, e.g., adding, editing, deleting, or fetching resources].  

---



## Troubleshooting  

- **Issue: Application not connecting to MongoDB**  
  - Ensure the MongoDB URI in `.env` is correct.  
  - Check if MongoDB is running.  

- **Issue: Frontend not loading**  
  - Verify the backend is running on the correct port.  
  - Check if the API endpoint URLs are correctly configured in the frontend code.  

---

## Contact Information  

If you have any questions or need further assistance, feel free to reach out:  

- **Name**: Jaskamal Singh  
- **Email**: jaskamalsingh7872@gmail.com

