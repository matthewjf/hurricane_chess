var ErrorUtil = require('../util/error_util'),
    BrowserHistory = require('react-router').browserHistory;

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
          GameActions.gameJoined(gameId);
        },

        disconnected: function() {
          GameActions.handleError('lost connection');
        },

        rejected: function(msg) {
          console.log('rejected from game');
          BrowserHistory.push("/");
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
