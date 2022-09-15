import 'express-async-errors';
import express from 'express';
import projectsRoute from './routes/projects.route';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/projects', projectsRoute);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Application running on port ${PORT}.`));