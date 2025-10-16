# Credit Report Parser - Full Stack MERN Application

A complete full-stack application for processing and viewing Experian XML credit reports. Upload XML files to parse credit data and view comprehensive reports with detailed account information.

## Features

### Backend

- RESTful API built with Express.js
- XML file upload and parsing
- MongoDB data persistence
- Comprehensive error handling
- CORS enabled for cross-origin requests

### Frontend

- Modern React UI with Tailwind CSS
- File upload interface
- Credit report listing
- Detailed report viewing
- Responsive design
- Beautiful, production-ready interface

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **File Processing**: Multer, xml2js

## Project Structure

```
project/
├── server/                    # Backend API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Helper functions
│   │   ├── middleware/        # Express middleware
│   │   └── server.js          # Entry point
│   ├── uploads/               # Temporary file storage
│   ├── .env                   # Environment variables
│   └── package.json
│
├── client/
|   ├──src/                       # Frontend application
│   │   ├── api/                   # API service layer
│   │   ├── components/            # React components
│   │   ├── pages/                 # Page components
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Edit `server/.env`:

```
PORT
MONGO_URI
NODE_ENV=development
```

For MongoDB Atlas:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/credit-reports?retryWrites=true&w=majority
```

4. Start the backend server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. From the project root directory, install dependencies:

```bash
npm install
```

2. Configure API URL (already set in `.env`):

```
VITE_API_URL=http://localhost:{PORT_NO}/api
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/`                | API health check                   |
| POST   | `/api/upload`      | Upload and parse XML credit report |
| GET    | `/api/reports`     | Get all credit reports             |
| GET    | `/api/reports/:id` | Get single report by ID            |

## Usage Guide

### 1. Upload Credit Report

- Click "Upload" in the navigation
- Select an XML file containing credit report data
- Click "Upload & Process"
- Wait for processing confirmation

### 2. View All Reports

- Click "Reports" in the navigation
- Browse all uploaded credit reports
- View summary information for each report
- Click on any report to see full details

### 3. View Report Details

- Click on any report card from the reports list
- View comprehensive information including:
  - Basic details (Name, PAN, Phone, Credit Score)
  - Report summary (Accounts, Balances, Enquiries)
  - Individual credit accounts with full details

## Development

### Backend Development

```bash
cd backend
npm run dev
```

### Frontend Development

```bash
npm run dev
```

### Build for Production

**Frontend:**

```bash
npm run build
```

**Backend:**

```bash
cd backend
npm start
```

## Error Handling

The application includes comprehensive error handling:

- Invalid file format validation
- XML parsing errors
- Database connection errors
- API request failures
- User-friendly error messages
