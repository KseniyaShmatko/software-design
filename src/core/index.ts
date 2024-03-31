import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from '../infrastructure/db/dbConf';
import { MovieDB, ParticipantDB, StudioDB, RewardDB, GenreDB, UserDB, CommentDB } from '../infrastructure/db/entities/entities';
import { router } from '../infrastructure/routes';
import { errorHandling } from '../infrastructure/middleware/ErrorHandlingMiddleware';

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
const arr = [MovieDB, ParticipantDB, StudioDB, RewardDB, GenreDB, UserDB, CommentDB];

app.use(errorHandling);

app.get('/', (req, res) => {
    res.status(200).json({message: 'i am working'});
});

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true, logging: console.log });
        app.listen(PORT, () => console.log(`Server ${PORT}`))

    } catch (e) {
        console.log(e);
    }
}

start();

// localhost:21990/?key=7ccd89ad-1d51-4f53-a3a4-83c90929391e
// to change all repositories to promise type