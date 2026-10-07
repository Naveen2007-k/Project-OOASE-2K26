# 2. UML DIAGRAMS - ARGOUML SPECIFICATIONS

## 1. Use Case Diagram

### Actors
- **Customer**: End-user who registers and books appointments.
- **Beautician/Staff**: Salon employee providing services.
- **Admin**: System manager.

### Use Cases & Relationships
- **Register**: Customer
- **Login**: Customer, Beautician, Admin
- **View Services**: Customer
- **View Beauticians**: Customer
- **Check Availability**: Customer
- **Book Appointment**: Customer (Includes: Check Availability)
- **Make Payment**: Customer (Extends: Book Appointment)
- **View Appointment**: Customer, Beautician
- **Reschedule Appointment**: Customer
- **Cancel Appointment**: Customer
- **Give Review**: Customer (Extends: View Appointment)
- **Accept Appointment**: Beautician
- **Reject Appointment**: Beautician
- **Update Appointment Status**: Beautician
- **Manage Availability**: Beautician
- **Manage Customers**: Admin
- **Manage Staff**: Admin
- **Manage Services**: Admin
- **Manage Appointments**: Admin
- **Manage Payments**: Admin
- **View Reports**: Admin

## 2. Class Diagram

### Classes
1. **User** (Abstract)
   - `userId`: int {PK}
   - `name`: string
   - `email`: string
   - `password`: string
   - `role`: string
   - `login()`
   - `logout()`

2. **Customer** (Inherits User)
   - `phone`: string
   - `address`: string
   - `bookAppointment()`
   - `makePayment()`

3. **Admin** (Inherits User)
   - `manageUsers()`
   - `generateReports()`

4. **Beautician** (Inherits User)
   - `specialization`: string
   - `experienceYears`: int
   - `updateAvailability()`

5. **Service**
   - `serviceId`: int {PK}
   - `name`: string
   - `description`: string
   - `price`: float
   - `durationMinutes`: int

6. **Appointment**
   - `appointmentId`: int {PK}
   - `date`: Date
   - `time`: Time
   - `status`: string (Pending, Confirmed, Completed)
   - `totalAmount`: float

7. **Payment**
   - `paymentId`: int {PK}
   - `amount`: float
   - `paymentDate`: Date
   - `paymentMethod`: string
   - `status`: string

8. **Review**
   - `reviewId`: int {PK}
   - `rating`: int
   - `comment`: string
   - `date`: Date

### Relationships
- **Customer (1) - (*) Appointment**: Association
- **Beautician (1) - (*) Appointment**: Association
- **Service (1) - (*) Appointment**: Association
- **Appointment (1) - (1) Payment**: Composition
- **Customer (1) - (*) Review**: Association
- **Appointment (1) - (1) Review**: Association

## 3. Sequence Diagram (Customer Booking)

### Lifelines:
Customer, WebInterface, AuthenticationService, AppointmentController, Database, PaymentService, NotificationService.

### Sequence:
1. Customer -> WebInterface: login(credentials)
2. WebInterface -> AuthenticationService: validate()
3. AuthenticationService --> WebInterface: return token
4. Customer -> WebInterface: viewServices()
5. WebInterface -> Database: getServices()
6. Database --> WebInterface: return servicesList
7. Customer -> WebInterface: selectServiceAndBeautician()
8. Customer -> WebInterface: checkAvailability(date)
9. WebInterface -> AppointmentController: getAvailableSlots()
10. AppointmentController -> Database: querySlots()
11. Database --> AppointmentController: availableSlots
12. AppointmentController --> WebInterface: slots
13. Customer -> WebInterface: bookSlot()
14. WebInterface -> AppointmentController: createAppointment()
15. AppointmentController -> Database: saveAppointment()
16. Customer -> WebInterface: makePayment()
17. WebInterface -> PaymentService: processPayment()
18. PaymentService --> AppointmentController: paymentSuccess
19. AppointmentController -> Database: updateStatus('Confirmed')
20. AppointmentController -> NotificationService: sendConfirmation()
21. WebInterface --> Customer: showSuccessMessage()

## 4. Activity Diagram (Booking Process)

### Nodes:
- [Initial Node]
- [Action: Customer Login]
- [Action: Validate Credentials]
- [Action: View Services]
- [Action: Select Service & Beautician]
- [Action: Check Availability]
- [Action: Select Date/Time]
- [Action: Confirm Booking]
- [Action: Make Payment]
- [Decision: Payment Successful?]
  - Yes -> [Action: Create Appointment] -> [Action: Send Confirmation] -> [Action: Display Details]
  - No -> [Action: Show Payment Failure] -> [Merge] (Loop to Retry or Cancel)
- [Final Node]

## 5. State Chart Diagram (Appointment Entity)

### States:
- Pending
- Confirmed
- Rescheduled
- Cancelled
- Checked-In
- In-Service
- Completed
- Payment Failed

### Transitions:
- [Start] -> Pending (Event: New Booking)
- Pending -> Confirmed (Event: Payment Success / Staff Accept)
- Pending -> Payment Failed (Event: Payment Error)
- Payment Failed -> Pending (Event: Retry Payment)
- Pending -> Rejected (Event: Staff Reject)
- Confirmed -> Rescheduled (Event: Customer Modifies Date)
- Confirmed -> Cancelled (Event: Customer Cancels)
- Confirmed -> Checked-In (Event: Customer Arrives)
- Checked-In -> In-Service (Event: Service Starts)
- In-Service -> Completed (Event: Service Ends)
- [All End States] -> [Final State]

## 6. Component Diagram

### Components:
- **Client Tier:** Customer Web Interface, Admin Dashboard, Staff Dashboard
- **Business Logic Tier:** Authentication Module, Appointment Management Module, Service Management Module, Payment Module, Notification Module
- **Data Tier:** REST API, MongoDB Database Server

### Connections:
- Web Interfaces -> REST API (HTTPS)
- REST API -> Modules
- Modules -> MongoDB

## 7. Deployment Diagram

### Nodes:
- **Customer Device (Mobile/PC):** Runs Web Browser
- **Admin/Staff Device (PC):** Runs Web Browser
- **Web Server (Vite/React):** Hosts the static frontend assets
- **Application Server (Node.js/Express):** Hosts the REST API
- **Database Server:** MongoDB instance
- **External Payment API:** Third-party payment gateway mock

### Communication:
- Customer/Admin Device <--> Web Server: HTTP/HTTPS
- Web Server <--> Application Server: REST API / JSON over HTTPS
- Application Server <--> Database Server: TCP/IP (Mongoose)
- Application Server <--> External Payment API: HTTPS
