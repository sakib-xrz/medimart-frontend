# 💊 [Medi Mart](https://medimart-shop.vercel.app) - Online Pharmacy E-commerce Platform

## 📌 Project Overview

Medi Mart is a **comprehensive online pharmacy platform** designed to provide a seamless experience for purchasing medications and healthcare products. The application features **user authentication, prescription management, secure checkout, and a robust admin dashboard** for inventory and order management. Built with **Next.js, TypeScript, and Tailwind CSS**, Medi Mart offers a responsive, accessible, and user-friendly interface for customers seeking healthcare products online.

---

## 🔥 **Key Features & Functionalities**

### **🌍 Public Features (Accessible to All)**

✅ **User Registration & Authentication**

- Secure **login and signup** system
- Password management with validation
- User profile management

✅ **Home Page**

- **Responsive Navbar**: Logo, navigation, cart, and user account access
- **Hero Section**: Engaging banner highlighting key offerings
- **Featured Products**: Showcases popular medical products
- **Categories Section**: Easy navigation through product categories
- **Testimonials**: Customer reviews and feedback
- **CTA Section**: Encourages users to explore more products
- **Footer**: Comprehensive links, contact information, and newsletter signup

✅ **Products Browsing**

- **Advanced Filtering**: Filter by category, form, price range, prescription requirements
- **Search Functionality**: Find products by name or description
- **Pagination**: Navigate through product listings efficiently
- **Responsive Grid Layout**: Adapts to different screen sizes

✅ **Product Details**

- **Comprehensive Information**: Detailed product descriptions, dosage, usage instructions
- **Price Information**: Clear pricing with discount calculations
- **Availability Status**: Stock information and expiry dates
- **Prescription Requirements**: Clearly marked prescription-only medications
- **Related Products**: Alternative or complementary products

✅ **Shopping Cart**

- **Real-time Updates**: Add, remove, and update quantities
- **Price Calculations**: Automatic subtotal and discount calculations
- **Prescription Validation**: Warnings for prescription-required items
- **Stock Validation**: Prevents ordering expired or out-of-stock items

---

### **🔐 Private Features (Protected Routes)**

✅ **Checkout Process**

- **Shipping Information**: Comprehensive address collection
- **Prescription Upload**: For prescription-required medications
- **Payment Integration**: Secure payment processing via SSLCOMMERZ
- **Order Summary**: Clear breakdown of items and costs

✅ **User Account Management**

- **Order History**: View past orders and their status
- **Profile Management**: Update personal information
- **Password Management**: Secure password changing functionality

✅ **Admin Dashboard**

- **Overview Dashboard**:
  - Sales analytics and key performance indicators
  - Recent orders and inventory alerts
- **Order Management**:
  - View and process customer orders
  - Update order status and payment status
  - View order details including products and customer information
- **Product Management**:
  - Add, edit, and delete products
  - Manage inventory, pricing, and discounts
  - Handle prescription requirements and expiry dates
- **Customer Management**:
  - View and manage customer accounts
  - Track customer orders and spending

---

## 🖥️ **Technology Stack**

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Redux Toolkit, RTK Query
- **Form Handling**: Formik, Yup validation
- **Data Visualization**: Recharts

### Backend

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Token)
- **File Storage**: Cloudinary for prescription uploads
- **Payment Processing**: SSLCOMMERZ integration
