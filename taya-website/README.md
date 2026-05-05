# TAYA - Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.0-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux](https://img.shields.io/badge/Redux-9.0-764ABC?logo=redux&logoColor=white)](https://redux.js.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)

A full-stack e-commerce application built with React, Node.js, Express, Prisma, and SQLite. TAYA provides a complete shopping experience with admin product management, user authentication, cart functionality, and order tracking.

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [License](#license)

##  Features

### For Customers
- **User Authentication**: Register, sign in, and account management
- **Product Browsing**: Browse products by category (Women, Men, Accessories, Unisex)
- **Advanced Filtering**: Filter by subcategory, brand, size, and price range
- **Search**: Full-text product search functionality
- **Shopping Cart**: Add/remove items with real-time updates
- **Checkout**: Complete order flow with address management
- **Order Tracking**: View order history and status
- **Product Reviews**: Rate and review purchased items
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### For Admins
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Product Upload**: Drag-and-drop image upload with Cloudinary integration
- **Order Management**: View and update order statuses
- **Dashboard**: Real-time inventory and order analytics
- **Feature Images**: Manage promotional feature images on homepage
- **Admin Access Control**: Protected routes and role-based access

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality component library
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database abstraction
- **SQLite** - Lightweight relational database
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **Cloudinary** - Image hosting and optimization
- **PayPal** - Payment processing (integration ready)

## 📁 Project Structure

```
taya-website/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── admin-view/          # Admin-specific components
│   │   │   ├── shopping-view/       # Customer-facing components
│   │   │   ├── common/              # Shared components
│   │   │   └── ui/                  # Base UI components (Shadcn)
│   │   ├── pages/                   # Route pages
│   │   ├── store/                   # Redux slices
│   │   ├── context/                 # React context (Auth, Cart)
│   │   ├── lib/                     # Utilities and helpers
│   │   ├── config/                  # API configuration
│   │   ├── data/                    # Static data
│   │   └── assets/                  # Images and static files
│   ├── package.json
│   └── vite.config.js
├── server/                          # Express backend
│   ├── controllers/                 # Request handlers
│   │   ├── admin/                   # Admin operations
│   │   ├── shop/                    # Customer operations
│   │   ├── auth/                    # Authentication
│   │   └── common/                  # Common operations
│   ├── routes/                      # API routes
│   ├── models/                      # Prisma models (schema)
│   ├── helpers/                     # Utilities
│   ├── middleware/                  # Custom middleware
│   ├── server.js                    # Entry point
│   ├── package.json
│   └── dev.db                       # SQLite database
├── package.json                     # Root workspace config
├── README.md                        # Project documentation
└── LICENSE                          # Copyright license

```

##  Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taya-website
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

5. **Configure environment variables**

   Create `.env` file in the `server` directory:
   ```
   PORT=5000
   DATABASE_URL="file:./dev.db"
   CLIENT_ORIGIN=http://localhost:5173,http://localhost:5174
   JWT_SECRET="your_jwt_secret_key_here"
   NODE_ENV=development
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

6. **Set up the database**
   ```bash
   cd server
   npm run prisma:generate
   npm run db:push
   npm run db:seed
   cd ..
   ```

##  Running the Application

### Development Mode (Recommended)

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm start
```
The backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:5174`

### Production Build

```bash
# Build client
cd client
npm run build

# Build and start server
cd server
npm run build
npm start
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Create new user account
- `POST /login` - User login with email/password
- `POST /logout` - Logout and clear session
- `GET /check-auth` - Verify current user session
- `POST /create-admin` - Create admin account (server console only)

### Shop Products (`/api/shop`)
- `GET /products/filter` - Get filtered products with query parameters
  - Query params: `category`, `subcategory`, `brand`, `size`, `sortBy`

### Admin Products (`/api/admin`)
- `POST /products/add` - Create new product
- `GET /products/get` - Retrieve all products
- `PATCH /products/edit/:id` - Update product
- `DELETE /products/delete/:id` - Delete product
- `POST /products/upload-image` - Upload image to Cloudinary

### Admin Orders (`/api/admin`)
- `GET /orders/get` - Get all orders
- `GET /orders/details/:id` - Get order details
- `PATCH /orders/update/:id` - Update order status

### Shop Orders (`/api/shop`)
- `POST /orders/create` - Create new order
- `GET /orders/list/:userId` - Get user orders
- `GET /orders/details/:id` - Get order details

## ⚙️ Configuration

### Database
The project uses SQLite with Prisma ORM. Schema is defined in `server/prisma/schema.prisma`.

Key models:
- **User** - Customer and admin accounts
- **Product** - E-commerce products with pricing
- **Order** - Customer orders and order items
- **Cart** - Shopping cart and items
- **Address** - Delivery addresses
- **ProductReview** - Customer reviews
- **Feature** - Homepage feature images

### Authentication
- JWT tokens stored in HTTP-only secure cookies
- Token expiration: 7 days
- Password hashing: bcryptjs (12 rounds)
- Protected routes require valid JWT

### Image Upload
Images are hosted on Cloudinary for reliable CDN delivery and optimization.

## 👥 User Roles

### Customer
- Browse products
- Search and filter
- Add to cart and checkout
- View order history
- Leave product reviews

### Admin
- Full product CRUD
- Order management
- Inventory tracking
- Feature image management
- Dashboard analytics

##  Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcryptjs
- CORS protection with configurable origins
- Protected admin routes (role-based access)
- Input validation on both client and server
- SQL injection prevention via Prisma ORM


## License
Copyright (c) 2026 Vishwa Nuwan. All rights reserved. See [LICENSE](LICENSE) for details.