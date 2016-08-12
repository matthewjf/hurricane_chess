var GameActions = require('../actions/game_actions');

module.exports = {
  createGame: function(data, successCB, errorCB) {
    $.ajax({
      url: 'api/games',
      type: "POST",
      data: {game: data},
      success: function(game) {
        successCB(game);
        GameActions.gameCreated(game);
      },
      error: function(error) {
        errorCB(error);
      }
    });
  },

  joinGame: function(data, successCB, errorCB) {
    $.ajax({
      url: 'api/games/' + data.id,
      type: "POST",
      data: {game: data},
      success: function(game) {
        successCB(game);
        GameActions.gameJoined(game);
      },
      error: function(error) {
        errorCB(error);
      }
    });
  }
};
