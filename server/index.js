import exprees from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import routes from './src/routes/index.js';

const app = exprees();

app.use(cors());
app.use(exprees.json());
app.use(exprees.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/v1', routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Mongodb connected');
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    process.exit(1);
  });
