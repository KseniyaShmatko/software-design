import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/moviereward';

export default async function handleMovieReward() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get By Movie ID', 'Get By Reward ID', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'movie_id', message: 'Enter movie ID:' },
        { name: 'reward_id', message: 'Enter reward ID:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const movieRewards = await axios.get(`${BASE_URL}/`);
      console.log(movieRewards.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter movie-reward ID:' }]);
      const movieRewardById = await axios.get(`${BASE_URL}/${id}`);
      console.log(movieRewardById.data);
      break;
    case 'Get By Movie ID':
      const { movieId } = await inquirer.prompt([{ name: 'movieId', message: 'Enter movie ID:' }]);
      const movieRewardByMovieId = await axios.get(`${BASE_URL}/movie/${movieId}`);
      console.log(movieRewardByMovieId.data);
      break;
    case 'Get By Reward ID':
      const { rewardId } = await inquirer.prompt([{ name: 'rewardId', message: 'Enter reward ID:' }]);
      const movieRewardByRewardId = await axios.get(`${BASE_URL}/reward/${rewardId}`);
      console.log(movieRewardByRewardId.data);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter movie-reward ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}