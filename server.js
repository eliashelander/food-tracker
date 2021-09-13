import express from 'express';
import cors from 'cors';
import router from './apiRouter.js';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', router)

app.listen(process.env.PORT || PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

export default app;