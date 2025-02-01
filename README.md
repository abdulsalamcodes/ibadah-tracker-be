# ibadah-tracker-be

backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── config.js         # App configuration
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Ibadah.js        # Ibadah model
│   │   └── Settings.js      # User settings model
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── ibadahController.js
│   │   └── settingsController.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── ibadahService.js
│   │   └── settingsService.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── ibadahRoutes.js
│   │   └── settingsRoutes.js
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   └── validate.js      # Request validation
│   └── utils/
│       ├── asyncHandler.js
│       └── errorResponse.js
├── .env
├── package.json
└── server.js