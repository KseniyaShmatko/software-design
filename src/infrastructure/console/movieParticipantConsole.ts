import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/movieparticipant';

export default async function handleMovieParticipant() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get By Movie ID', 'Get By Participant ID', 'Update', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'movie_id', message: 'Enter movie ID:' },
        { name: 'participant_id', message: 'Enter participant ID:' },
        { name: 'role', message: 'Enter role:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const movieParticipants = await axios.get(`${BASE_URL}/`);
      console.log(movieParticipants.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter movie-participant ID:' }]);
      const movieParticipantById = await axios.get(`${BASE_URL}/${id}`);
      console.log(movieParticipantById.data);
      break;
    case 'Get By Movie ID':
      const { movieId } = await inquirer.prompt([{ name: 'movieId', message: 'Enter movie ID:' }]);
      const movieParticipantByMovieId = await axios.get(`${BASE_URL}/movie/${movieId}`);
      console.log(movieParticipantByMovieId.data);
      break;
    case 'Get By Participant ID':
      const { participantId } = await inquirer.prompt([{ name: 'participantId', message: 'Enter participant ID:' }]);
      const movieParticipantByParticipantId = await axios.get(`${BASE_URL}/participant/${participantId}`);
      console.log(movieParticipantByParticipantId.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter movie-participant ID to update:' },
        { name: 'role', message: 'Enter new role:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter movie-participant ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}