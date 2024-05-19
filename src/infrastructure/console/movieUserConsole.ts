import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/movieuser';

export default async function handleMovieUser() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get By Movie ID', 'Get By User ID', 'Update', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'movie_id', message: 'Enter movie ID:' },
        { name: 'user_id', message: 'Enter user ID:' },
        { name: 'mark', message: 'Enter mark:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const movieUsers = await axios.get(`${BASE_URL}/`);
      console.log(movieUsers.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter movie-user ID:' }]);
      const movieUserById = await axios.get(`${BASE_URL}/${id}`);
      console.log(movieUserById.data);
      break;
    case 'Get By Movie ID':
      const { movieId } = await inquirer.prompt([{ name: 'movieId', message: 'Enter movie ID:' }]);
      const movieUserByMovieId = await axios.get(`${BASE_URL}/movie/${movieId}`);
      console.log(movieUserByMovieId.data);
      break;
    case 'Get By User ID':
      const { userId } = await inquirer.prompt([{ name: 'userId', message: 'Enter user ID:' }]);
      const movieUserByUserId = await axios.get(`${BASE_URL}/user/${userId}`);
      console.log(movieUserByUserId.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter movie-user ID to update:' },
        { name: 'mark', message: 'Enter new mark:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter movie-user ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}