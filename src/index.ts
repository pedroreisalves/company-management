import 'express-async-errors';
import express from 'express';
import projectsRoute from './routes/projects.route';
import errorMiddleware from './middlewares/error.middleware';
import loginRoute from './routes/login.route';
import managersRoute from './routes/managers.route';
import employeesRoute from './routes/employees.route';
import departmentsRoute from './routes/departments.route';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/login', loginRoute);

app.use('/projects', projectsRoute);

app.use('/managers', managersRoute);

app.use('/employees', employeesRoute);

app.use('/departments', departmentsRoute);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Application running on port ${PORT}.`));