import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/moviestudio';

export default async function handleMovieStudio() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get By Movie ID', 'Get By Studio ID', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'movie_id', message: 'Enter movie ID:' },
        { name: 'studio_id', message: 'Enter studio ID:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const movieStudios = await axios.get(`${BASE_URL}/`);
      console.log(movieStudios.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter movie-studio ID:' }]);
      const movieStudioById = await axios.get(`${BASE_URL}/${id}`);
      console.log(movieStudioById.data);
      break;
    case 'Get By Movie ID':
      const { movieId } = await inquirer.prompt([{ name: 'movieId', message: 'Enter movie ID:' }]);
      const movieStudioByMovieId = await axios.get(`${BASE_URL}/movie/${movieId}`);
      console.log(movieStudioByMovieId.data);
      break;
    case 'Get By Studio ID':
      const { studioId } = await inquirer.prompt([{ name: 'studioId', message: 'Enter studio ID:' }]);
      const movieStudioByStudioId = await axios.get(`${BASE_URL}/studio/${studioId}`);
      console.log(movieStudioByStudioId.data);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter movie-studio ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}