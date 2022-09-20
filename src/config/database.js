require('dotenv').config();

module.exports = {
  logging: false,
  dialect: process.env.db_dialect,
  host: process.env.db_host,
  username: process.env.db_user_name,
  password: process.env.db_password,
  database: process.env.db_name,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};