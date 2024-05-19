import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/reward';

export default async function handleReward() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get One By Name', 'Update', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'name', message: 'Enter reward name:' },
        { name: 'description', message: 'Enter reward description:' },
        { name: 'photo', message: 'Enter reward photo URL:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const rewards = await axios.get(`${BASE_URL}/`);
      console.log(rewards.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter reward ID:' }]);
      const rewardById = await axios.get(`${BASE_URL}/${id}`);
      console.log(rewardById.data);
      break;
    case 'Get One By Name':
      const { name } = await inquirer.prompt([{ name: 'name', message: 'Enter reward name:' }]);
      const rewardByName = await axios.get(`${BASE_URL}/name/${name}`);
      console.log(rewardByName.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter reward ID to update:' },
        { name: 'name', message: 'Enter new reward name:' },
        { name: 'description', message: 'Enter new reward description:' },
        { name: 'photo', message: 'Enter new reward photo URL:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter reward ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}