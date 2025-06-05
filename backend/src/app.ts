import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/weather', weatherRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})