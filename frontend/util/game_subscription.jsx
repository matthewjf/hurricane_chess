var ErrorUtil = require('../util/error_util');

var GameStore = require('../stores/game_store'),
    GameActions = require('../actions/game_actions');

module.exports = {
  subscribe: function(gameId) {
    /* global App */
    App.game = App.cable.subscriptions.create(
      {
        channel: "GameChannel",
        game_id: gameId
      },
      {
        connected: function() {
          console.log('connected to game');
        },

        disconnected: function() {
          console.log('disconnected from game');
        },

        rejected: function(msg) {
          console.log('rejected from game');
          ErrorUtil.gameRejected();
        },

        received: function(data) {
          console.log('received');
        }
      }
    );
  },

  unsubscribe: function() {
    App.game.unsubscribe();
  }
};
