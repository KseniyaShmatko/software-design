import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/participant';

export default async function handleParticipant() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get One By Name and Surname', 'Update', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'name', message: 'Enter participant name:' },
        { name: 'surname', message: 'Enter participant surname:' },
        { name: 'birth', message: 'Enter participant birth date:' },
        { name: 'death', message: 'Enter participant death date (if applicable):' },
        { name: 'photo', message: 'Enter participant photo URL:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const participants = await axios.get(`${BASE_URL}/`);
      console.log(participants.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter participant ID:' }]);
      const participantById = await axios.get(`${BASE_URL}/${id}`);
      console.log(participantById.data);
      break;
    case 'Get One By Name and Surname':
      const { name, surname } = await inquirer.prompt([
        { name: 'name', message: 'Enter participant name:' },
        { name: 'surname', message: 'Enter participant surname:' },
      ]);
      const participantByNameSurname = await axios.get(`${BASE_URL}/${name}/${surname}`);
      console.log(participantByNameSurname.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter participant ID to update:' },
        { name: 'name', message: 'Enter new participant name:' },
        { name: 'surname', message: 'Enter new participant surname:' },
        { name: 'birth', message: 'Enter new participant birth date:' },
        { name: 'death', message: 'Enter new participant death date (if applicable):' },
        { name: 'photo', message: 'Enter new participant photo URL:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter participant ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}