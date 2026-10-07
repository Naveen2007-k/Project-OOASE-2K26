# 3. DATABASE DESIGN (MongoDB)

## Database Name: `beauty_salon_db`

## Collections & Schemas

### 1. `users`
Stores all system users (Customers, Beauticians, Admins).
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'beautician', 'admin'], default: 'customer' },
  phone: { type: String },
  address: { type: String },
  specialization: { type: String }, // For beauticians
  experienceYears: { type: Number }, // For beauticians
  createdAt: Date,
  updatedAt: Date
}
```

### 2. `services`
Stores the salon services available.
```javascript
{
  _id: ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  category: { type: String }, // e.g., Hair, Skin, Nails
  isActive: { type: Boolean, default: true },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. `appointments`
Stores booking details.
```javascript
{
  _id: ObjectId,
  customerId: { type: ObjectId, ref: 'User', required: true },
  beauticianId: { type: ObjectId, ref: 'User', required: true },
  serviceId: { type: ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g., "10:00 AM"
  endTime: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'], default: 'Pending' },
  totalAmount: { type: Number, required: true },
  createdAt: Date,
  updatedAt: Date
}
```

### 4. `payments`
Stores payment transaction records.
```javascript
{
  _id: ObjectId,
  appointmentId: { type: ObjectId, ref: 'Appointment', required: true },
  customerId: { type: ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Card', 'Cash', 'Online'], required: true },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  transactionId: { type: String },
  paymentDate: { type: Date, default: Date.now }
}
```

### 5. `reviews`
Stores customer reviews for completed services.
```javascript
{
  _id: ObjectId,
  appointmentId: { type: ObjectId, ref: 'Appointment', required: true },
  customerId: { type: ObjectId, ref: 'User', required: true },
  beauticianId: { type: ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
}
```

## Sample Data Overview
*To be inserted upon initialization:*
- **3 Customers:** Alice Smith, Bob Johnson, Carol White.
- **2 Beauticians:** Emma Davis (Hair Expert), Sarah Wilson (Skin Care).
- **5 Services:** 
  - Haircut & Styling ($50, 60 mins)
  - Full Facial ($80, 45 mins)
  - Manicure & Pedicure ($60, 90 mins)
  - Hair Coloring ($120, 120 mins)
  - Bridal Makeup ($200, 180 mins)
- **Appointments & Payments:** Dummy bookings linking the customers, beauticians, and services.
