import express from 'express';
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';



const app = express();
app.use(cors())
app.use(express.json());

app.use('/users', userRoutes);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});