import express from 'express';
import 'dotenv/config'
import userRoutes from './routes/userRoutes.js';



const app = express();
app.use(express.json());

app.use('/', userRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log("http://localhost:3000/users")
});