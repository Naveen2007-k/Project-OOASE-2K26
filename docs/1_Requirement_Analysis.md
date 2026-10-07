# 1. REQUIREMENT ANALYSIS

## 1. Project Title
Beauty Salon Appointment System

## 2. Introduction
The Beauty Salon Appointment System is a full-stack web application designed to streamline the process of booking and managing salon appointments. It provides an intuitive interface for customers to explore services, choose beauticians, and book time slots, while offering a robust dashboard for staff and administrators to manage their schedules, services, and overall business operations.

## 3. Problem Statement
Traditional beauty salons often rely on manual booking systems (phone calls, walk-ins, paper ledgers), which lead to double bookings, inefficient time management, and poor customer experiences. Customers lack visibility into available slots and services, while salon owners struggle to manage staff schedules and track revenue effectively.

## 4. Existing System
Currently, most local salons use a manual entry system or generic scheduling tools that are not tailored for the beauty industry. Customers must call the salon during working hours to inquire about availability and book appointments.

## 5. Limitations of Existing System
- High chance of human error (double bookings, incorrect times).
- Customers cannot see service pricing, beautician profiles, or real-time availability.
- No automated reminders or notifications, leading to no-shows.
- Difficulty in tracking payments, generating reports, and managing staff shifts.
- Lack of a centralized platform for customer reviews and feedback.

## 6. Proposed System
The proposed system is an automated, web-based platform tailored specifically for beauty salons. It allows 24/7 online booking, real-time availability checking, online payments, and centralized management for administrators and staff members.

## 7. Advantages of Proposed System
- **24/7 Accessibility:** Customers can book appointments anytime, from anywhere.
- **Real-Time Availability:** Prevents double booking and optimizes staff schedules.
- **Role-Based Access:** Distinct interfaces for Customers, Staff, and Admins.
- **Automated Workflow:** Streamlines everything from booking to payment and reviews.
- **Business Insights:** Admins can view reports on revenue, popular services, and staff performance.

## 8. Objectives
- To develop a secure, user-friendly web application for salon appointments.
- To provide a catalog of services with prices and duration.
- To allow customers to select preferred beauticians based on availability.
- To enable online payment processing and status tracking.
- To provide a management portal for admins to handle operations effectively.

## 9. Scope of the Project
The project encompasses the design, development, and deployment of the web application. It includes user authentication, service management, schedule and availability tracking, appointment booking, payment simulation, and a feedback system. It does not include advanced features like inventory management for salon products or payroll processing.

## 10. Functional Requirements
- **Authentication:** Registration and Login for all roles (Customer, Staff, Admin).
- **Service Browsing:** Customers can view available services, prices, and durations.
- **Booking Management:** Customers can book, reschedule, or cancel appointments.
- **Staff Management:** Staff can accept/reject appointments and update their availability.
- **Admin Control:** Admins can manage users, services, staff schedules, and view reports.
- **Payment Handling:** Customers can make payments for confirmed appointments.
- **Reviews & Ratings:** Customers can leave reviews for completed services.

## 11. Non-Functional Requirements
- **Performance:** System should respond within 2 seconds for all actions.
- **Security:** Passwords must be hashed; APIs must be secured with JWT authentication.
- **Usability:** The UI must be modern, responsive, and intuitive (usable on mobile and desktop).
- **Reliability:** The system should be highly available and handle concurrent bookings properly.

## 12. Hardware Requirements
- **Server:** Minimum 2GB RAM, 1 CPU Core (Node.js backend)
- **Client:** Any modern smart device (PC, Tablet, Smartphone) with an internet connection.

## 13. Software Requirements
- **Frontend:** React.js, TailwindCSS (via Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Tools:** VS Code, Postman, Jira, ArgoUML

## 14. User Roles
1. **Customer:** End-user who books and pays for services.
2. **Beautician/Staff:** Service provider who manages their assigned appointments.
3. **Admin:** System owner/manager who oversees all operations.

## 15. System Features
- JWT-based Authentication & Authorization.
- Dynamic Service & Staff Listing.
- Conflict-free Time Slot booking engine.
- Appointment Lifecycle Management (Pending, Confirmed, Completed, Cancelled).
- Payment Processing Simulation.
- Review and Rating System.
- Admin Dashboard with metrics and reporting.

## 16. Assumptions and Constraints
- **Assumptions:** Users have access to modern web browsers and stable internet. Staff members will regularly update their availability.
- **Constraints:** The payment system will be simulated (no real credit card processing in the academic scope). The project must be completed within the academic semester timeframe using the specified MERN stack.
