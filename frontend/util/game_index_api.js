var GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  fetchGames: function() {
    $.ajax({
      url: 'api/games',
      success: function(games) {
        GameIndexActions.receiveGames(games);
      }
    });
  }
};
