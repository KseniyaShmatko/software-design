import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/comment';

export default async function handleComment() {
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
        { name: 'content', message: 'Enter comment content:' },
        { name: 'date', message: 'Enter comment date:' },
        { name: 'movie_id', message: 'Enter movie ID:' },
        { name: 'user_id', message: 'Enter user ID:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const comments = await axios.get(`${BASE_URL}/`);
      console.log(comments.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter comment ID:' }]);
      const commentById = await axios.get(`${BASE_URL}/${id}`);
      console.log(commentById.data);
      break;
    case 'Get By Movie ID':
      const { movieId } = await inquirer.prompt([{ name: 'movieId', message: 'Enter movie ID:' }]);
      const commentByMovieId = await axios.get(`${BASE_URL}/movie/${movieId}`);
      console.log(commentByMovieId.data);
      break;
    case 'Get By User ID':
      const { userId } = await inquirer.prompt([{ name: 'userId', message: 'Enter user ID:' }]);
      const commentByUserId = await axios.get(`${BASE_URL}/user/${userId}`);
      console.log(commentByUserId.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter comment ID to update:' },
        { name: 'content', message: 'Enter new comment content:' },
        { name: 'date', message: 'Enter new comment date:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter comment ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}