import inquirer from 'inquirer';
import handleMovie from './movieConsole';
import handleGenre from './genreConsole';
import handleParticipant from './participantConsole';
import handleComment from './commentConsole';
import handleReward from './rewardConsole';
import handleStudio from './studioConsole';
import handleUser from './userConsole';
import handleMovieGenre from './movieGenreConsole';
import handleMovieParticipant from './movieParticipantConsole';
import handleMovieReward from './movieRewardConsole';
import handleMovieStudio from './movieStudioConsole';
import handleMovieUser from './movieUserConsole';
import handleParticipantReward from './participantRewardConsole';

async function mainMenu() {
    while (true) {
        const { route } = await inquirer.prompt([
            {
                type: 'list',
                name: 'route',
                message: 'Выберите маршрут:',
                choices: [
                    'Movie',
                    'Genre',
                    'Participant',
                    'Comment',
                    'Reward',
                    'Studio',
                    'User',
                    'MovieGenre',
                    'MovieParticipant',
                    'MovieReward',
                    'MovieStudio',
                    'MovieUser',
                    'ParticipantReward',
                    'Exit',
                ],
            },
        ]);

        if (route === 'Exit') {
            break;
        }

        switch (route) {
            case 'Movie':
                await handleMovie();
                break;
            case 'Genre':
              await handleGenre();
              break;
            case 'Participant':
              await handleParticipant();
              break;
            case 'Comment':
              await handleComment();
              break;
            case 'Reward':
              await handleReward();
              break;
            case 'Studio':
              await handleStudio();
              break;
            case 'User':
              await handleUser();
              break;
            case 'MovieGenre':
              await handleMovieGenre();
              break;
            case 'MovieParticipant':
              await handleMovieParticipant();
              break;
            case 'MovieReward':
              await handleMovieReward();
              break;
            case 'MovieStudio':
              await handleMovieStudio();
              break;
            case 'MovieUser':
              await handleMovieUser();
              break;
            case 'ParticipantReward':
              await handleParticipantReward();
              break;
            default:
                console.log('Неизвестный маршрут');
                break;
        }
    }
}

mainMenu();