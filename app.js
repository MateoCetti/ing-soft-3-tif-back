import express from 'express';
import cors from 'cors'

import pokemon_router from './routes/routes.js';

const app = express()
app.use(cors())

app.use('/pokemon', pokemon_router);

export default app;