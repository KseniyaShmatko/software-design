import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/user';

export default async function handleUser() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Registration', 'Get All', 'Get One By ID', 'Check', 'Login', 'Update', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Registration':
      const registrationData = await inquirer.prompt([
        { name: 'name', message: 'Enter user name:' },
        { name: 'surname', message: 'Enter user surname:' },
        { name: 'registration', message: 'Enter user registration date:' },
        { name: 'login', message: 'Enter user login:' },
        { name: 'password', message: 'Enter user password:' },
        { name: 'role', message: 'Enter user role:' },
      ]);
      await axios.post(`${BASE_URL}/`, registrationData);
      break;
    case 'Get All':
      const users = await axios.get(`${BASE_URL}/`);
      console.log(users.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter user ID:' }]);
      const userById = await axios.get(`${BASE_URL}/id/${id}`);
      console.log(userById.data);
      break;
    case 'Check':
      const checkData = await inquirer.prompt([
        { name: 'id', message: 'Enter user ID:' },
        { name: 'login', message: 'Enter user login:' },
        { name: 'role', message: 'Enter user role:' },
      ]);
      const token = await axios.get(`${BASE_URL}/auth/`, checkData);
      console.log(token.data);
      break;
    case 'Login':
      const loginData = await inquirer.prompt([
        { name: 'login', message: 'Enter user login:' },
        { name: 'password', message: 'Enter user password:' },
      ]);
      const loginToken = await axios.post(`${BASE_URL}/login`, loginData);
      console.log(loginToken.data);
      break;
    case 'Update':
      const updateData = await inquirer.prompt([
        { name: 'id', message: 'Enter user ID to update:' },
        { name: 'name', message: 'Enter new user name:' },
        { name: 'surname', message: 'Enter new user surname:' },
      ]);
      await axios.put(`${BASE_URL}/${updateData.id}`, updateData);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter user ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}