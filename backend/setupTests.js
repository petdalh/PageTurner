// setupTests.js
import '@testing-library/jest-dom';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

const startDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const stopDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export { startDB, stopDB };
