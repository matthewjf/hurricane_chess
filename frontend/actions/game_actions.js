var Dispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

module.exports = {
  gameCreated: function(game) {
    Dispatcher.dispatch({
      actionType: GameConstants.GAME_CREATED,
      game: game
    });
  },
  gameJoined: function(game) {
    Dispatcher.dispatch({
      actionType: GameConstants.GAME_JOINED,
      game: game
    });
  }
};
