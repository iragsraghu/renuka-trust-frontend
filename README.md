# Renuka Trust Frontend

Frontend application for Shri Renuka Yellamma Devi Trust Donation Management System.

## Features

- Dashboard
- Donor Management
- Village Management
- Donation Management
- Reports
- Receipt Download
- Search and Filters
- Responsive UI

## Tech Stack

- React
- Vite
- Bootstrap 5
- Axios
- React Router DOM

## Project Structure

```text
src/
├── assets/
├── components/
├── pages/
│   ├── Dashboard.jsx
│   ├── Donors.jsx
│   ├── Donations.jsx
│   ├── Reports.jsx
│   └── Receipts.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── router.jsx
```

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/renuka-trust-frontend.git
```

Move to project directory:

```bash
cd renuka-trust-frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

## Backend Repository

The frontend consumes APIs from the Renuka Trust Backend application built using:

- Go (Golang)
- Gin Framework
- MySQL
- GORM

## Modules

### Dashboard

- Total Villages
- Total Donors
- Total Donations
- Total Collection

### Donors

- Add Donor
- Update Donor
- Delete Donor
- Search Donor

### Donations

- Create Donation
- View Donations
- Search Donations
- Download Receipt

### Reports

- Village Wise Collection
- Donor Donation History
- Dashboard Reports

## Future Enhancements

- JWT Authentication
- Excel Export
- Daily Collection Report
- Monthly Collection Report
- Role Based Access
- Mobile Responsive Design

## License

This project is developed for Shri Renuka Yellamma Devi Trust.