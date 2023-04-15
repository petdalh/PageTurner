const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/User');
const { protect } = require('../../middleware/authMiddleware');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your_test_jwt_secret';


const app = express();
app.use(express.json());

const testRoute = express.Router();
testRoute.route('/').get(protect, (req, res) => res.send('Protected route'));
app.use('/test', testRoute);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Protect middleware', () => {
    it('should return 401 if no token is provided', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(401);
        expect(response.text).toBe('Not authorized, no token');
    });

    it('should return 401 if token is invalid', async () => {
        const response = await request(app)
            .get('/test')
            .set('Authorization', 'Bearer invalid_token');
        expect(response.status).toBe(401);
        expect(response.text).toBe('Not authorized, token failed');
    });

    it('should return 200 if token is valid', async () => {
        const user = new User({ name: 'Test User', email: 'test@example.com', password: 'test1234' }); // Add the 'name' field
        await user.save();
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    
        const response = await request(app)
            .get('/test')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Protected route');
    });
});