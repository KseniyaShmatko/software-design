import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/genre';

export default async function handleGenre() {
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
        { name: 'name', message: 'Enter genre name:' },
        { name: 'description', message: 'Enter genre description:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const genres = await axios.get(`${BASE_URL}/`);
      console.log(genres.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter genre ID:' }]);
      const genreById = await axios.get(`${BASE_URL}/${id}`);
      console.log(genreById.data);
      break;
    case 'Get One By Name':
      const { name } = await inquirer.prompt([{ name: 'name', message: 'Enter genre name:' }]);
      const genreByName = await axios.get(`${BASE_URL}/name/${name}`);
      console.log(genreByName.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter genre ID to update:' },
        { name: 'name', message: 'Enter new genre name:' },
        { name: 'description', message: 'Enter new genre description:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter genre ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}