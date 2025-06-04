import express from 'express';
import setupRoutes from './startup/routes.js';
import config from './startup/config.js';

const app = express();
setupRoutes(app);
config();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));