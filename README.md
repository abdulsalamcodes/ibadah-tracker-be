# Ibadah Tracker Backend

Node.js/Express backend for the Ibadah Tracker application with MongoDB integration.

## Features

- JWT Authentication
- MongoDB with Mongoose ODM
- RESTful API Architecture
- Input Validation
- Error Handling
- Service Layer Pattern
- Response Standardization

## Prerequisites

- Node.js 18+
- MongoDB 6+
- npm or yarn

## Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/ibadah-tracker-be.git
cd ibadah-tracker-be
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

Required environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ibadah-tracker
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

4. Start server:
```bash
# Development
npm run dev

# Production
npm start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── models/         # Mongoose models
├── controllers/    # Request handlers
├── services/       # Business logic
├── routes/         # API routes
├── middleware/     # Custom middleware
└── utils/          # Utility functions
```

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
```

### Ibadah Endpoints

```
GET    /api/ibadah
POST   /api/ibadah
GET    /api/ibadah/:id
PUT    /api/ibadah/:id
DELETE /api/ibadah/:id
POST   /api/ibadah/:id/toggle
```

### Progress Endpoints

```
GET /api/progress?timeframe=week|month
```

### Settings Endpoints

```
GET    /api/settings
PUT    /api/settings
GET    /api/settings/export
DELETE /api/settings/account
```

## Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  settings: {
    notifications: Boolean,
    darkMode: Boolean,
    language: String
  }
}
```

### Ibadah Model

```javascript
{
  user: ObjectId,
  name: String,
  description: String,
  time: String,
  frequency: String,
  completionStatus: [{
    date: Date,
    completed: Boolean
  }]
}
```

## Error Handling

Standardized error responses:

```javascript
{
  success: false,
  message: string,
  errors?: array
}
```

## Development

### Scripts

```bash
# Development with nodemon
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

### Code Style

- ESLint configuration
- Prettier formatting
- Consistent error handling
- Service layer pattern
- Async/await usage

## Security

- JWT Authentication
- Request validation
- Password hashing
- Rate limiting
- CORS configuration
- Security headers

## Testing

```bash
# Run tests
npm test

# Coverage report
npm run test:coverage
```

## Deployment

1. Build:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

### PM2 Deployment

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "ibadah-tracker" -- start
```

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License

## Configuration Reference

### Database Configuration (config/database.js)
```javascript
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
}
```

### JWT Configuration
```javascript
{
  expiresIn: '7d',
  algorithm: 'HS256'
}
```

### Rate Limiting
```javascript
{
  windowMs: 15 * 60 * 1000,
  max: 100
}