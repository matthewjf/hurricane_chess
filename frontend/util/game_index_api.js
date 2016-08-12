var GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  fetchGames: function() {
    $.ajax({
      url: 'api/games',
      success: GameIndexActions.receiveGames,
      error: GameIndexActions.handleError
    });
  }
};
