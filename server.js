import express from 'express';
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';



const app = express();
app.use(cors())
app.use(express.json());

app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log("http://localhost:3000/users")
});