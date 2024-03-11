const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus: async (req, res) => {
    // Check if Redis and DB are alive
    const redisIsAlive = await redisClient.isAlive();
    const dbIsAlive = await dbClient.isAlive();

    // Prepare response object
    const status = {
      redis: redisIsAlive,
      db: dbIsAlive
    };

    // Return response with status code 200
    res.status(200).json(status);
  },

  getStats: async (req, res) => {
    try {
      // Get number of users
      const usersCount = await dbClient.nbUsers();
      // Get number of files
      const filesCount = await dbClient.nbFiles();

      // Prepare response object
      const stats = {
        users: usersCount,
        files: filesCount
      };

      // Return response with status code 200
      res.status(200).json(stats);
    } catch (error) {
      // Handle errors
      console.error('Error fetching stats:', error);
      // Return response with status code 500 for internal server error
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = AppController;
