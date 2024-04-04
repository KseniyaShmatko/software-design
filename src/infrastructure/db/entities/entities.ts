import { sequelize } from '../dbConf';
const { DataTypes } = require("sequelize");

const CommentDB = sequelize.define('comment',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    movie_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'movies', key: 'id' }},
    user_id: { type: DataTypes.INTEGER, allowNull: false , references: { model: 'users', key: 'id' }}
  }
);

const GenreDB = sequelize.define('genre',
  { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    description: { type: DataTypes.STRING, allowNull: false } 
  }
);

const MovieDB = sequelize.define('movie',
  { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    description: { type: DataTypes.STRING, allowNull: false }, 
    country: { type: DataTypes.STRING, allowNull: false }, 
    release: { type: DataTypes.DATE, allowNull: false }, 
    photo: { type: DataTypes.STRING, allowNull: false }, 
    trailer: { type: DataTypes.STRING, allowNull: false } 
  }
);

const ParticipantDB = sequelize.define ('participant',
  { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false }, 
    surname: { type: DataTypes.STRING, allowNull: false }, 
    birth: { type: DataTypes.DATE, allowNull: false }, 
    death: { type: DataTypes.DATE, allowNull: true }, 
    photo: { type: DataTypes.STRING, allowNull: false } 
  },
  { indexes: [
    {
      unique: true,
      fields: ['name', 'surname']
    }] 
  }
);

const RewardDB = sequelize.define('reward',
  { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    description: { type: DataTypes.STRING, allowNull: false }, 
    photo: { type: DataTypes.STRING, allowNull: false } 
  }
);

const StudioDB = sequelize.define('studio',
  { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    founder: { type: DataTypes.STRING, allowNull: false }, 
    country: { type: DataTypes.STRING, allowNull: false }, 
    foundation: { type: DataTypes.DATE, allowNull: false }, 
    photo: { type: DataTypes.STRING, allowNull: false } 
  }
);

const UserDB = sequelize.define('user',
  { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, 
    name: { type: DataTypes.STRING, allowNull: false }, 
    surname: { type: DataTypes.STRING, allowNull: false }, 
    registration: { type: DataTypes.DATE, allowNull: false }, 
    login: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    password: { type: DataTypes.STRING, allowNull: false }, 
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' } 
  }
);

const MovieGenreDB = sequelize.define('movie_genre',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movie_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'movies', key: 'id' } },
    genre_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'genres', key: 'id' } }
  }
);

const MovieParticipantDB = sequelize.define('movie_participant',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movie_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'movies', key: 'id' } },
    participant_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'participants', key: 'id' } },
    role: { type: DataTypes.STRING, allowNull: false }
  }
);

const MovieRewardDB = sequelize.define('movie_reward',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movie_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'movies', key: 'id' } },
    reward_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'rewards', key: 'id' } }
  }
);

const MovieStudioDB = sequelize.define('movie_studio',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movie_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'movies', key: 'id' } },
    studio_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'studios', key: 'id' } }
  }
);

const MovieUserDB = sequelize.define('movie_user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    movie_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'movies', key: 'id' } },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    mark: { type: DataTypes.BOOLEAN, allowNull: false }
  }
);

const ParticipantRewardDB = sequelize.define('participant_reward',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    participant_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'participants', key: 'id' } },
    reward_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'rewards', key: 'id' } }
  }
);

MovieDB.belongsToMany(StudioDB, {through: MovieStudioDB});
StudioDB.belongsToMany(MovieDB, {through: MovieStudioDB});

MovieDB.belongsToMany(ParticipantDB, {through: MovieParticipantDB});
ParticipantDB.belongsToMany(MovieDB, {through: MovieParticipantDB});

MovieDB.belongsToMany(RewardDB, {through: MovieRewardDB});
RewardDB.belongsToMany(MovieDB, {through: MovieRewardDB});

MovieDB.belongsToMany(GenreDB, {through: MovieGenreDB});
GenreDB.belongsToMany(MovieDB, {through: MovieGenreDB});

MovieDB.belongsToMany(UserDB, {through: MovieUserDB});
UserDB.belongsToMany(MovieDB, {through: MovieUserDB});

ParticipantDB.belongsToMany(RewardDB, {through: ParticipantRewardDB});
RewardDB.belongsToMany(ParticipantDB, {through: ParticipantRewardDB});

MovieDB.hasMany(CommentDB)
CommentDB.belongsTo(MovieDB, { foreignKey: 'movie_id' });

UserDB.hasMany(CommentDB)
CommentDB.belongsTo(UserDB, { foreignKey: 'user_id' });

export {
  MovieDB,
  ParticipantDB,
  StudioDB, 
  RewardDB, 
  GenreDB, 
  UserDB, 
  CommentDB,
  MovieGenreDB,
  MovieParticipantDB,
  MovieRewardDB,
  MovieStudioDB,
  MovieUserDB,
  ParticipantRewardDB
};