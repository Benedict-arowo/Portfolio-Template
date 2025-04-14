import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json());
Routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
