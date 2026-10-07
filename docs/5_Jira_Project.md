# 5. JIRA PROJECT / ISSUE TRACKING

## Project Name: Beauty Salon Appointment System

### Epic 1 – User Authentication
- **Task 1.1:** Setup JWT Authentication.
- **Task 1.2:** Create Registration API & UI.
- **Task 1.3:** Create Login API & UI.
- **Task 1.4:** Implement Role-Based Access Control (RBAC).

### Epic 2 – Service Management
- **User Story:** "As an admin, I want to manage services so that customers can see what is offered."
- **Task 2.1:** Create Service Database Schema.
- **Task 2.2:** Build CRUD APIs for Services.
- **Task 2.3:** Build Services view for Customers.
- **Task 2.4:** Build Admin panel for managing Services.

### Epic 3 – Beautician Management
- **Task 3.1:** Create Beautician Profile UI.
- **Task 3.2:** Build API to list Beauticians based on service.
- **Task 3.3:** Implement availability calendar for Staff.

### Epic 4 – Appointment Management
- **User Story:** "As a customer, I want to book a salon appointment so that I can reserve a suitable time slot."
  - *Acceptance Criteria:* Must be logged in, select service/staff/time, appointment is created.
- **Task 4.1:** Build Appointment Booking Engine (Conflict resolution).
- **Task 4.2:** Create Customer UI for booking.
- **Task 4.3:** Build API to Reschedule/Cancel appointments.
- **Task 4.4:** Staff Dashboard UI for accepting/rejecting.

### Epic 5 – Payment Management
- **User Story:** "As a customer, I want to pay online so my booking is confirmed."
- **Task 5.1:** Create Payment Schema and API.
- **Task 5.2:** Build Mock Payment UI Checkout.
- **Task 5.3:** Link payment success to appointment status update.

### Epic 6 – Review and Notification
- **Task 6.1:** Build Review schema and API.
- **Task 6.2:** UI for Customers to rate completed appointments.
- **Task 6.3:** Simulate Email/SMS notification on booking confirmation.

### Epic 7 – Admin Dashboard
- **Task 7.1:** Create Admin layout and navigation.
- **Task 7.2:** Build Reports UI (Total bookings, revenue, users).
- **Task 7.3:** User management UI (Ban/Delete users).

### Epic 8 – Testing and Deployment
- **Task 8.1:** Write Postman API Tests.
- **Task 8.2:** Perform E2E Manual Testing.
- **Task 8.3:** Prepare project for production build.
