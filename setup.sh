#!/bin/bash

# Create project directory
PROJECT_NAME="shopping-app"
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Initialize npm project
npm init -y

# Install dependencies
npm install aws-sdk axios bcryptjs bull compression connect-redis cookie-parser cors csurf dayjs dotenv dotenv-vault ejs express express-ejs-layouts express-mongo-sanitize express-rate-limit express-session express-validator googleapis helmet i18n jsonwebtoken mixpanel mongoose mongoose-paginate-v2 morgan multer newrelic node-cache node-cron nodemailer passport passport-google-oauth20 prom-client rate-limiter-flexible redis sanitize-html sharp socket.io socket.io-client swagger-jsdoc swagger-ui-express uuid validator winston
npm install --save-dev eslint eslint-plugin-jest husky jest lint-staged nodemon prettier supertest

# Create advanced folder structure
mkdir -p src/{config,controllers,services,models,routes,middlewares,utils,constants,events,jobs,views/{partials,layouts,pages},tests,public/{uploads,assets/{css,js,images}},docs,logs,scripts,.github/workflows}

# Create .env file
cat <<EOL > .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopping
REDIS_URL=redis://localhost:6379
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
NODE_ENV=development
SES_SENDER_EMAIL=your_verified_ses_email@example.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MIXPANEL_TOKEN=your_mixpanel_token
EOL

# Create .gitignore
cat <<EOL > .gitignore
node_modules/
.env
logs/
public/uploads/
dist/
*.log
newrelic_agent.log
EOL

# Update package.json
cat <<EOL > package.json
{
  "name": "shopping-app",
  "description": "E-commerce website",
  "version": "1.0.0",
  "author": "swapnilMk",
  "private": false,
  "main": "src/server.js",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "prepare": "husky install"
  },
  "dependencies": {
    "aws-sdk": "^2.1559.0",
    "axios": "^1.8.1",
    "bcryptjs": "^2.4.3",
    "bull": "^4.16.5",
    "compression": "^1.7.4",
    "connect-redis": "^8.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "csurf": "^1.10.0",
    "dayjs": "^1.11.13",
    "dotenv": "^16.4.5",
    "dotenv-vault": "^1.26.2",
    "ejs": "^3.1.9",
    "express": "^4.19.2",
    "express-ejs-layouts": "^2.5.1",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^7.5.0",
    "express-session": "^1.18.1",
    "express-validator": "^7.2.1",
    "googleapis": "^146.0.0",
    "helmet": "^7.1.0",
    "i18n": "^0.15.1",
    "jsonwebtoken": "^9.0.2",
    "mixpanel": "^0.18.0",
    "mongoose": "^8.2.0",
    "mongoose-paginate-v2": "^1.9.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "newrelic": "^12.15.0",
    "node-cache": "^5.1.2",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.13",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "prom-client": "^15.1.3",
    "rate-limiter-flexible": "^5.0.5",
    "redis": "^4.7.0",
    "sanitize-html": "^2.14.0",
    "sharp": "^0.33.5",
    "socket.io": "^4.7.5",
    "socket.io-client": "^4.8.1",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1",
    "uuid": "^11.1.0",
    "validator": "^13.12.0",
    "winston": "^3.13.0"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-plugin-jest": "^28.11.0",
    "husky": "^9.1.7",
    "jest": "^29.7.0",
    "lint-staged": "^15.4.3",
    "nodemon": "^3.1.0",
    "prettier": "^3.2.5",
    "supertest": "^7.0.0"
  },
  "engines": {
    "node": ">=22.0.0"
  }
}
EOL

# Create LICENSE file
cat <<EOL > LICENSE
MIT License

Copyright (c) 2025 swapnilMk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
EOL

# Create src/config/db.js
cat <<EOL > src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
EOL

# Create src/config/redis.js
cat <<EOL > src/config/redis.js
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

export default redisClient;
EOL

# Create src/config/aws.js
cat <<EOL > src/config/aws.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const s3 = new AWS.S3();
export const sns = new AWS.SNS();
export const ses = new AWS.SES({ apiVersion: '2010-12-01' });
EOL

# Create src/config/env.js
cat <<EOL > src/config/env.js
import 'dotenv/config';

export default {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  awsRegion: process.env.AWS_REGION,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  sesSenderEmail: process.env.SES_SENDER_EMAIL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mixpanelToken: process.env.MIXPANEL_TOKEN,
};
EOL

# Create src/config/logger.js
cat <<EOL > src/config/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console(),
  ],
});

export default logger;
EOL

# Create src/models/user.model.js
cat <<EOL > src/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
EOL

# Create src/services/user.service.js
cat <<EOL > src/services/user.service.js
import User from '../models/user.model.js';
import { hashPassword } from '../utils/hashUtil.js';
import { s3 } from '../config/aws.js';
import sharp from 'sharp';

const createUser = async (name, email, password, phone, file) => {
  const hashedPassword = await hashPassword(password);
  let avatarUrl = '';
  if (file) {
    const resizedImage = await sharp(file.buffer)
      .resize(200, 200)
      .toBuffer();
    const params = {
      Bucket: 'your-s3-bucket-name',
      Key: \`avatars/\${Date.now()}_\${file.originalname}\`,
      Body: resizedImage,
      ContentType: file.mimetype,
    };
    const upload = await s3.upload(params).promise();
    avatarUrl = upload.Location;
  }
  const user = new User({ name, email, password: hashedPassword, phone, avatar: avatarUrl });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export { createUser, findUserByEmail };
EOL

# Create src/services/auth.service.js
cat <<EOL > src/services/auth.service.js
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '1h' });
};

export { generateToken };
EOL

# Create src/services/email.service.js
cat <<EOL > src/services/email.service.js
import nodemailer from 'nodemailer';
import { ses } from '../config/aws.js';
import env from '../config/env.js';
import logger from '../config/logger.js';

const transporter = nodemailer.createTransport({
  SES: { ses, aws: AWS },
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: env.sesSenderEmail,
      to,
      subject,
      html,
    });
    logger.info(\`Email sent to \${to}: \${subject}\`);
  } catch (error) {
    logger.error(\`Email sending failed: \${error}\`);
    throw error;
  }
};

export { sendEmail };
EOL

# Create src/services/sms.service.js
cat <<EOL > src/services/sms.service.js
import { sns } from '../config/aws.js';
import logger from '../config/logger.js';

const sendSMS = async (phoneNumber, message) => {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
  };
  try {
    await sns.publish(params).promise();
    logger.info(\`SMS sent to \${phoneNumber}: \${message}\`);
  } catch (error) {
    logger.error(\`SMS sending failed: \${error}\`);
    throw error;
  }
};

export { sendSMS };
EOL

# Create src/controllers/user.controller.js
cat <<EOL > src/controllers/user.controller.js
import { createUser } from '../services/user.service.js';
import { sendEmail } from '../services/email.service.js';
import { sendSMS } from '../services/sms.service.js';

const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const file = req.file;
  try {
    const user = await createUser(name, email, password, phone, file);
    await sendEmail(email, 'Welcome!', '<h1>Welcome to Shopping App</h1>');
    if (phone) await sendSMS(phone, 'Welcome to Shopping App!');
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { registerUser };
EOL

# Create src/controllers/auth.controller.js
cat <<EOL > src/controllers/auth.controller.js
import { findUserByEmail } from '../services/user.service.js';
import { generateToken } from '../services/auth.service.js';
import { comparePassword } from '../utils/hashUtil.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id.toString());
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { loginUser };
EOL

# Create src/routes/user.routes.js
cat <<EOL > src/routes/user.routes.js
import express from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { upload } from '../middlewares/upload.middleware.js';
import { validateUser } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.post('/register', upload.single('avatar'), validateUser, registerUser);

export default router;
EOL

# Create src/routes/auth.routes.js
cat <<EOL > src/routes/auth.routes.js
import express from 'express';
import { loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);

export default router;
EOL

# Create src/middlewares/auth.middleware.js
cat <<EOL > src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export { authenticate };
EOL

# Create src/middlewares/error.middleware.js
cat <<EOL > src/middlewares/error.middleware.js
import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
};

export { errorHandler };
EOL

# Create src/middlewares/upload.middleware.js
cat <<EOL > src/middlewares/upload.middleware.js
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images are allowed'));
  },
});

export { upload };
EOL

# Create src/middlewares/rateLimit.middleware.js
cat <<EOL > src/middlewares/rateLimit.middleware.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export { limiter };
EOL

# Create src/middlewares/session.middleware.js
cat <<EOL > src/middlewares/session.middleware.js
import session from 'express-session';
import RedisStore from 'connect-redis';
import redisClient from '../config/redis.js';
import env from '../config/env.js';

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: env.nodeEnv === 'production' },
});

export { sessionMiddleware };
EOL

# Create src/middlewares/validation.middleware.js
cat <<EOL > src/middlewares/validation.middleware.js
import { body, validationResult } from 'express-validator';

const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUser };
EOL

# Create src/utils/hashUtil.js
cat <<EOL > src/utils/hashUtil.js
import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
EOL

# Create src/jobs/email.job.js
cat <<EOL > src/jobs/email.job.js
import { Queue } from 'bull';
import { sendEmail } from '../services/email.service.js';
import redisClient from '../config/redis.js';

const emailQueue = new Queue('email', { redis: redisClient });

emailQueue.process(async (job) => {
  const { email, subject, html } = job.data;
  await sendEmail(email, subject, html);
});

const sendWelcomeEmail = async (email) => {
  await emailQueue.add({ email, subject: 'Welcome!', html: '<h1>Welcome to Shopping App</h1>' });
};

export { sendWelcomeEmail };
EOL

# Create src/app.js
cat <<EOL > src/app.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import morgan from 'morgan';
import expressLayouts from 'express-ejs-layouts';
import { sessionMiddleware } from './middlewares/session.middleware.js';
import { limiter } from './middlewares/rateLimit.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Shopping App API', version: '1.0.0' },
  },
  apis: ['./src/routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(limiter);
app.use(morgan('combined'));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(csurf({ cookie: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.render('pages/index', { csrfToken: req.csrfToken() }));
app.get('/login', (req, res) => res.render('pages/login', { csrfToken: req.csrfToken() }));
app.get('/register', (req, res) => res.render('pages/register', { csrfToken: req.csrfToken() }));

app.use(errorHandler);

export default app;
EOL

# Create src/server.js
cat <<EOL > src/server.js
import 'dotenv/config';
import 'newrelic';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';
import logger from './config/logger.js';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  logger.info('A user connected');
  socket.on('disconnect', () => logger.info('User disconnected'));
});

const startServer = async () => {
  await connectDB();
  server.listen(env.port, () => logger.info(\`Server running on port \${env.port}\`));
};

startServer();

export { server, io };
EOL

# Create src/views/layouts/main.ejs
cat <<EOL > src/views/layouts/main.ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopping App</title>
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <%- include('../partials/header') %>
  <main><%- body %></main>
  <%- include('../partials/footer') %>
  <script src="/assets/js/main.js"></script>
</body>
</html>
EOL

# Create src/views/partials/header.ejs
cat <<EOL > src/views/partials/header.ejs
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </nav>
</header>
EOL

# Create src/views/partials/footer.ejs
cat <<EOL > src/views/partials/footer.ejs
<footer>
  <p>© 2025 Shopping App</p>
</footer>
EOL

# Create src/views/pages/index.ejs
cat <<EOL > src/views/pages/index.ejs
<h1>Welcome to Shopping App</h1>
<p>Explore our products and services.</p>
EOL

# Create src/views/pages/login.ejs
cat <<EOL > src/views/pages/login.ejs
<h1>Login</h1>
<form action="/api/auth/login" method="POST">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <input type="email" name="email" placeholder="Email" required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit">Login</button>
</form>
EOL

# Create src/views/pages/register.ejs
cat <<EOL > src/views/pages/register.ejs
<h1>Register</h1>
<form action="/api/users/register" method="POST" enctype="multipart/form-data">
  <input type="hidden" name="_csrf" value="<%= csrfToken %>">
  <input type="text" name="name" placeholder="Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="password" name="password" placeholder="Password" required>
  <input type="tel" name="phone" placeholder="Phone">
  <input type="file" name="avatar" accept="image/*">
  <button type="submit">Register</button>
</form>
EOL

# Create public/assets/css/styles.css
cat <<EOL > public/assets/css/styles.css
body { font-family: Arial, sans-serif; }
header, footer { background: #333; color: white; padding: 1rem; }
nav a { color: white; margin: 0 1rem; }
main { padding: 2rem; }
form { display: flex; flex-direction: column; gap: 1rem; max-width: 300px; }
EOL

# Create public/assets/js/main.js
cat <<EOL > public/assets/js/main.js
import { io } from 'socket.io-client';
const socket = io();
socket.on('connect', () => console.log('Connected to server'));
EOL

# Create Dockerfile
cat <<EOL > Dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
EOL

# Create docker-compose.yml
cat <<EOL > docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - .env
    depends_on:
      - mongo
      - redis
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  redis:
    image: redis:latest
    ports:
      - "6379:6379"
volumes:
  mongo-data:
EOL

# Create README.md
cat <<EOL > README.md
# Shopping App

E-commerce website built with Node.js, Express, and MongoDB.

## Prerequisites
- Node.js (>= 22.0.0)
- MongoDB
- Redis
- AWS Account (S3, SES, SNS)

## Setup
1. Clone the repository
2. Run \`npm install\`
3. Create a \`.env\` file with the required variables (see .env example)
4. Run \`npm run dev\` for development or \`npm start\` for production

## Scripts
- \`npm start\`: Run in production
- \`npm run dev\`: Run with nodemon
- \`npm test\`: Run tests with Jest
- \`npm run lint\`: Lint code with ESLint
- \`npm run format\`: Format code with Prettier

## Docker
- Build and run: \`docker-compose up --build\`

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
EOL

echo "Project structure created successfully!"
echo "To run the project:"
echo "1. cd $PROJECT_NAME"
echo "2. npm run dev (for development) or npm start (for production)"
echo "3. Or use 'docker-compose up --build' for Docker"