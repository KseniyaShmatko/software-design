import axios from 'axios';
import inquirer from 'inquirer';

const BASE_URL = 'http://localhost:5000/api/moviegenre';

export default async function handleMovieGenre() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'Выберите операцию:',
      choices: ['Create', 'Get All', 'Get One By ID', 'Get By Movie ID', 'Get By Genre ID', 'Delete'],
    },
  ]);

  switch (operation) {
    case 'Create':
      const createData = await inquirer.prompt([
        { name: 'movie_id', message: 'Enter movie ID:' },
        { name: 'genre_id', message: 'Enter genre ID:' },
      ]);
      await axios.post(`${BASE_URL}/`, createData);
      break;
    case 'Get All':
      const movieGenres = await axios.get(`${BASE_URL}/`);
      console.log(movieGenres.data);
      break;
    case 'Get One By ID':
      const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter movie-genre ID:' }]);
      const movieGenreById = await axios.get(`${BASE_URL}/${id}`);
      console.log(movieGenreById.data);
      break;
    case 'Get By Movie ID':
      const { movieId } = await inquirer.prompt([{ name: 'movieId', message: 'Enter movie ID:' }]);
      const movieGenreByMovieId = await axios.get(`${BASE_URL}/movie/${movieId}`);
      console.log(movieGenreByMovieId.data);
      break;
    case 'Get By Genre ID':
      const { genreId } = await inquirer.prompt([{ name: 'genreId', message: 'Enter genre ID:' }]);
      const movieGenreByGenreId = await axios.get(`${BASE_URL}/genre/${genreId}`);
      console.log(movieGenreByGenreId.data);
      break;
    case 'Delete':
      const { idToDelete } = await inquirer.prompt([{ name: 'idToDelete', message: 'Enter movie-genre ID to delete:' }]);
      await axios.delete(`${BASE_URL}/${idToDelete}`);
      break;
    default:
      console.log('Неизвестная операция');
      break;
  }
}