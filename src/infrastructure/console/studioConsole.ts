import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/studio';

export default async function handleStudio() {
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
        { name: 'name', message: 'Enter studio name:' },
        { name: 'founder', message: 'Enter studio founder:' },
        { name: 'country', message: 'Enter studio country:' },
        { name: 'foundation', message: 'Enter studio foundation date:' },
        { name: 'photo', message: 'Enter studio photo URL:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const studios = await axios.get(`${BASE_URL}/`);
      console.log(studios.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter studio ID:' }]);
      const studioById = await axios.get(`${BASE_URL}/${id}`);
      console.log(studioById.data);
      break;
    case 'Get One By Name':
      const { name } = await inquirer.prompt([{ name: 'name', message: 'Enter studio name:' }]);
      const studioByName = await axios.get(`${BASE_URL}/name/${name}`);
      console.log(studioByName.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter studio ID to update:' },
        { name: 'name', message: 'Enter new studio name:' },
        { name: 'founder', message: 'Enter new studio founder:' },
        { name: 'country', message: 'Enter new studio country:' },
        { name: 'foundation', message: 'Enter new studio foundation date:' },
        { name: 'photo', message: 'Enter new studio photo URL:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter studio ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}