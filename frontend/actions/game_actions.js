var Dispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_constants');

module.exports = {
  gameJoined: function(gameId) {
    Dispatcher.dispatch({
      actionType: GameConstants.GAME_JOINED,
      gameId: gameId
    });
  }
};
