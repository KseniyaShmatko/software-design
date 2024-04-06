import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from '../infrastructure/db/dbConf';
import { MovieDB, ParticipantDB, StudioDB, RewardDB, GenreDB, UserDB, CommentDB } from '../infrastructure/db/entities/entities';
import { router } from '../infrastructure/routes';
import { errorHandling } from '../infrastructure/middleware/ErrorHandlingMiddleware';
import { Router } from 'express';

dotenv.config();
const PORT = process.env.PORT || 5000;

export const app = express();
app.use(cors());
app.use(express.json());
const mainRouter = Router();
mainRouter.use('/api', router);
app.use(mainRouter);

const arr = [MovieDB, ParticipantDB, StudioDB, RewardDB, GenreDB, UserDB, CommentDB];

app.use(errorHandling);

app.get('/', (req, res) => {
    res.status(200).json({message: 'i am working'});
});

const server = app.listen(PORT, () => console.log(`Server ${PORT}`));

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        return server;
    } catch (e) {
        console.log(e);
    }
}

export default start;