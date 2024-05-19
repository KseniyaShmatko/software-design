import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/movie';

export default async function handleMovie() {
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
        { name: 'name', message: 'Enter movie name:' },
        { name: 'description', message: 'Enter movie description:' },
        { name: 'country', message: 'Enter movie country:' },
        { name: 'release', message: 'Enter movie release date:' },
        { name: 'photo', message: 'Enter movie photo URL:' },
        { name: 'trailer', message: 'Enter movie trailer URL:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const movies = await axios.get(`${BASE_URL}/`);
      console.log(movies.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter movie ID:' }]);
      const movieById = await axios.get(`${BASE_URL}/${id}`);
      console.log(movieById.data);
      break;
    case 'Get One By Name':
      const { name } = await inquirer.prompt([{ name: 'name', message: 'Enter movie name:' }]);
      const movieByName = await axios.get(`${BASE_URL}/name/${name}`);
      console.log(movieByName.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter movie ID to update:' },
        { name: 'name', message: 'Enter new movie name:' },
        { name: 'description', message: 'Enter new movie description:' },
        { name: 'country', message: 'Enter new movie country:' },
        { name: 'release', message: 'Enter new movie release date:' },
        { name: 'photo', message: 'Enter new movie photo URL:' },
        { name: 'trailer', message: 'Enter new movie trailer URL:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter movie ID to delete:' }]);
      console.log(idToDelete);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}