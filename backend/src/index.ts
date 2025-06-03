import express from 'express';
import cors from 'cors';
import home from './routes/home.js';
import auth from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/home', home);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));