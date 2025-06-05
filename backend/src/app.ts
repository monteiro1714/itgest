import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather';
import cors from 'cors';

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: '*' })); // Allow all origins for CORS
app.use(express.json());
app.use('/api/weather', weatherRoutes)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})