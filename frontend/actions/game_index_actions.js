var Dispatcher = require('../dispatcher/dispatcher'),
    GameIndexConstants = require('../constants/game_index_constants');

module.exports = {
  receiveGames: function(games) {
    Dispatcher.dispatch({
      actionType: GameIndexConstants.GAMES_RECEIVED,
      games: games
    });
  },
  receiveGame: function(game) {
    Dispatcher.dispatch({
      actionType: GameIndexConstants.GAME_RECEIVED,
      game: game
    });
  }
};
