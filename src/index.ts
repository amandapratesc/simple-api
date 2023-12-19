import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Hello World!'
  });
});

const port = '3000';
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${port}`);
});
