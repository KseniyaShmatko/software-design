import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/participantreward';

export default async function handleParticipantReward() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get By Participant ID', 'Get By Reward ID', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'participant_id', message: 'Enter participant ID:' },
        { name: 'reward_id', message: 'Enter reward ID:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const participantRewards = await axios.get(`${BASE_URL}/`);
      console.log(participantRewards.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter participant-reward ID:' }]);
      const participantRewardById = await axios.get(`${BASE_URL}/${id}`);
      console.log(participantRewardById.data);
      break;
    case 'Get By Participant ID':
      const { participantId } = await inquirer.prompt([{ name: 'participantId', message: 'Enter participant ID:' }]);
      const participantRewardByParticipantId = await axios.get(`${BASE_URL}/participant/${participantId}`);
      console.log(participantRewardByParticipantId.data);
      break;
    case 'Get By Reward ID':
      const { rewardId } = await inquirer.prompt([{ name: 'rewardId', message: 'Enter reward ID:' }]);
      const participantRewardByRewardId = await axios.get(`${BASE_URL}/reward/${rewardId}`);
      console.log(participantRewardByRewardId.data);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter participant-reward ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}