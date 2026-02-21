import express from 'express';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://hk-aplus-kue9.vercel.app',
    /\.vercel\.app$/,
    /\.onrender\.com$/
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.json({ message: '香港A+系統 API 服務運行中' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
