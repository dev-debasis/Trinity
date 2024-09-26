# **Combined Web App: Screenshot, Random User Data, QR Code PDF with User Profile & Authorization**

![image alt](https://github.com/dev-debasis/DevInnov8/blob/11047f6269625bbab54fd56b053edf5327e96f4f/DevInnov8_WebApp_Banner.jpg)

## **Overview**
This is a full-stack web application that allows users to perform three core functionalities:
1. **Take Website Screenshots**: Enter a URL and capture a screenshot of the website.
2. **Generate Random User Data**: Dynamically generate random user profiles based on input count.
3. **Generate PDF with QR Code**: Enter any data and generate a PDF file containing a QR code.

Additionally, the application implements user authentication and authorization, enabling user profiles.

### **Technologies Used**
- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js, MongoDB

### **Features**
- Website screenshot generation.
- Random user data generation based on input count.
- QR code generation in PDF.
- User profile with JWT-based authentication.
- MongoDB as the database for storing user information.

---

## **Getting Started**

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dev-debasis/DevInnov8
   cd DevInnov8
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## **Directory Structure**

```bash
DevInnov8/
│
├── backend/
│   ├── routes/                    # API routes for different functionalities
│   ├── controllers/               # Business logic for each API endpoint
│   ├── models/                    # Mongoose models (User, etc.)
│   ├── middleware/                # Middleware (Auth, etc.)
│   ├── utils/                     # Utilities (for puppeteer, random data generation, QR code, etc.)
│   ├── app.js                     # Entry point of the backend
│   └── package.json               # Backend dependencies
│
├── frontend/
│   ├── public/                    # Static assets
│   ├── src/                       # React.js components and app structure
│   ├── App.js                     # Main React component
│   └── package.json               # Frontend dependencies
│
└── README.md                      # Project documentation
```

---

## **Backend Setup**

### **Running the Backend**

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Start the backend server:
   ```bash
   npm start
   ```

   By default, the backend server runs on `http://localhost:5000`.

### **API Endpoints**

#### **1. User Authentication & Profile**

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive a JWT token.
- **GET** `/api/users/profile`: Get user profile information (requires JWT).

#### **2. Website Screenshot**

- **POST** `/api/screenshot`: Capture a screenshot of a given URL.
  - **Request Body**:
    ```json
    { "url": "https://debasis.site" }
    ```
  - **Response**: Returns a PNG image of the website screenshot.

#### **3. Random User Data**

- **POST** `/api/userData`: Generate random user data.
  - **Request Body**:
    ```json
    { "count": 10 }
    ```
  - **Response**: Returns a csv file of 10 random user data.

#### **4. PDF with QR Code**

- **POST** `/api/qrcode-pdf`: Generate a PDF with QR code.
  - **Request Body**:
    ```json
    { "inputData": "Hey, this is Debasis an aspiring ʙᴀᴄᴋᴇɴᴅ ᴅᴇᴠᴇʟᴏᴘᴇʀ skilled in ɴᴏᴅᴇ.ᴊᴤ, ᴇᴥᴘʀᴇᴤᴤ.ᴊᴤ, ᴍᴏɴɢᴏᴅʙ, ᴊᴀᴠᴀ, ᴘʏᴛʜᴏɴ, ᴊᴀᴠᴀᴤᴄʀɪᴘᴛ, Ғᴜɴᴅᴀᴍᴇɴᴛᴀʟᴤ ᴏҒ ᴄ++, ᴄ, ᴅᴀᴛᴀ ᴤᴛʀᴜᴄᴛᴜʀᴇᴤ & ᴀʟɢᴏʀɪᴛʜᴍᴤ. ᴄᴀᴍᴘᴜᴤ ᴀᴍʙᴀᴤᴤᴀᴅᴏʀ @ᴘᴡ" }
    ```
  - **Response**: Returns a PDF containing the QR code.

---

## **Frontend Setup**

### **Running the Frontend**

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Start the React.js frontend:
   ```bash
   npm start
   ```

   By default, the frontend runs on `http://localhost:3000`.

### **Frontend Features**

- **User Registration and Login**: Users can register and log in to access the app functionalities.
- **Screenshot Feature**: A form to enter the website URL and capture the screenshot.
- **Random User Data Generator**: Generate random user profiles by specifying the count.
- **QR Code PDF Generator**: Enter data and generate a PDF with a QR code.

---

## **Authorization**

### **JWT Authentication**
This app uses JWT (JSON Web Tokens) for user authentication. On successful login, the server generates a token which is stored in the frontend (typically in `localStorage`). This token is used to authenticate protected routes and access user profile information.

### **Protected Routes**
- **User Profile**: The `/profile` route is protected and requires the user to be authenticated. The token is passed in the `Authorization` header for validation.

---

## **Deployment**

1. **Create a Production Build of Frontend**:

2. **Deploy Backend & Frontend**:

---

## **Testing**

1. **Unit Tests**:
   - We use `Jest` for unit and integration testing.
   - Run tests with:
     ```bash
     npm test
     ```

2. **Postman Testing**:
   - `Postman` collection to test the API endpoints manually.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### **Contributing**
We welcome contributions! Feel free to raise issues or create pull requests.

---

## Contributors
- **Debasis Khamari** - Backend Developer
- **Aman Prasad** - Frontend Developer

---

## Contact
For any issues, feel free to contact us at: [debasiskhamari7@gmail.com](mailto:your-email@example.com) | [debasiskhamari7@gmail.com](mailto:your-email@example.com)

---
