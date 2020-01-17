const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
  async store(req, res) {
    const {github_username, techs, latitude, longitude} = req.body;

    let dev = await Dev.findOne({github_username});
    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const {name = login, avatar_url, bio} = apiResponse.data;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filtrar conexões que estão há no máximo 10 km de distância e que o novo dev tenha pelo menos 1 das techs filtradas
      const sendMessageTo = findConnections(
        {
          latitude,
          longitude,
        },
        techsArray
      );
      sendMessage(sendMessageTo, 'new-dev', dev);
    }

    res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async delete(req, res) {
    const {id} = req.params;

    const dev = await Dev.findById(req.params.id);
    if (!dev) {
      return res.status(404).json({removed: false});
    }
    await dev.remove();

    return res.status(200).json({removed: true});
  },
};
