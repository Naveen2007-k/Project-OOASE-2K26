# 4. REST API & POSTMAN TESTING

## 1. Authentication APIs

### Register User
- **Method:** POST
- **URL:** `/api/auth/register`
- **Body:** `{ "name": "John", "email": "john@test.com", "password": "pass", "role": "customer" }`
- **Success:** 201 Created

### Login User
- **Method:** POST
- **URL:** `/api/auth/login`
- **Body:** `{ "email": "john@test.com", "password": "pass" }`
- **Success:** 200 OK (Returns JWT token)

## 2. Users & Roles APIs

### Get All Users (Admin)
- **Method:** GET
- **URL:** `/api/users`
- **Headers:** `Authorization: Bearer <token>`
- **Success:** 200 OK

### Get Beauticians
- **Method:** GET
- **URL:** `/api/beauticians`
- **Success:** 200 OK

## 3. Services APIs

### Get All Services
- **Method:** GET
- **URL:** `/api/services`
- **Success:** 200 OK

### Add New Service (Admin)
- **Method:** POST
- **URL:** `/api/services`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "name": "Haircut", "price": 50, "durationMinutes": 60 }`
- **Success:** 201 Created

## 4. Appointments APIs

### Create Appointment (Customer)
- **Method:** POST
- **URL:** `/api/appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "serviceId": "...", "beauticianId": "...", "date": "2026-10-15", "startTime": "10:00 AM" }`
- **Success:** 201 Created

### Get User Appointments
- **Method:** GET
- **URL:** `/api/appointments/my-appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Success:** 200 OK

### Update Appointment Status (Staff/Admin)
- **Method:** PUT
- **URL:** `/api/appointments/:id/status`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "status": "Confirmed" }`
- **Success:** 200 OK

## 5. Payments APIs

### Process Payment
- **Method:** POST
- **URL:** `/api/payments`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "appointmentId": "...", "amount": 50, "paymentMethod": "Card" }`
- **Success:** 201 Created

## 6. Reviews APIs

### Add Review
- **Method:** POST
- **URL:** `/api/reviews`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `{ "appointmentId": "...", "beauticianId": "...", "rating": 5, "comment": "Great!" }`
- **Success:** 201 Created

## Postman Testing Specifications
A complete JSON collection will be generated/available to test these endpoints with predefined requests covering:
1. Invalid registration (Missing fields) -> 400 Bad Request
2. Invalid login -> 401 Unauthorized
3. Unauthorized access to Admin endpoints -> 403 Forbidden
4. Successful end-to-end booking flow -> 201/200 Statuses
