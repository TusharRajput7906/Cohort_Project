import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import contentRoutes from './src/routes/contentRoutes.js';
import collectionRoutes from './src/routes/collectionRoutes.js';
import highlightRoutes from './src/routes/highlightRoutes.js';
import { startResurfacingCron } from './src/utils/resurfacing.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database connection
connectDB();

// Routes
app.use('/api/content', contentRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/highlights', highlightRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'ContentVault API is running' });
});

// Start resurfacing cron job
startResurfacingCron();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
