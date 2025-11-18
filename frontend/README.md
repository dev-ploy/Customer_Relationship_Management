# CRM Frontend Application

A modern Customer Relationship Management (CRM) frontend application built with Vue 3 and Tailwind CSS.

## Features

- View all customers in a responsive table
- Add new customers with form validation
- Edit existing customer details
- View individual customer details
- Delete customers with confirmation
- Search customers by various criteria (name, email, phone, age)
- Beautiful UI with Tailwind CSS
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure your backend is running on `http://localhost:8080`

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Runs the app in development mode with Vite
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build

## API Endpoints Used

The frontend connects to the following backend endpoints:

- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers/insert` - Create a new customer
- `PUT /api/customers` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/firstName/{firstName}` - Search by first name
- `GET /api/customers/bylastname/{lastName}` - Search by last name
- `GET /api/customers/byemail/{email}` - Search by email
- `GET /api/customers/byphoneNumber/{phoneNumber}` - Search by phone
- `GET /api/customers/byage/{age}` - Search by age

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── Navbar.vue
│   ├── views/
│   │   ├── CustomerList.vue
│   │   ├── AddCustomer.vue
│   │   ├── EditCustomer.vue
│   │   └── ViewCustomer.vue
│   ├── services/
│   │   └── CustomerService.js
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official router for Vue.js
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling

## Contributing

Feel free to submit issues and enhancement requests!
