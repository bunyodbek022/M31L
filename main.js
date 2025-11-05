import express from 'express';
import morgan from 'morgan';
import { connectDB } from './src/db/db.js';
import { mainRouter } from './src/routes/index.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import logger from './src/utils/logger.js';
const app = express();
app.use(express.json());
await connectDB();
app.use(
  morgan('tiny', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);

app.use('/', mainRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
