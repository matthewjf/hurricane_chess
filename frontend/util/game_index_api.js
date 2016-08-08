var GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  fetchGames: function() {
    $.ajax({
      url: 'api/games',
      success: function(games) {
        GameIndexActions.receiveGames(games);
      }
    });
  },

  createGame: function(data, success, error) {
    $.ajax({
      url: 'api/games',
      type: "POST",
      data: {game: data},
      success: function(game){
        
      }
    });
  }
};
