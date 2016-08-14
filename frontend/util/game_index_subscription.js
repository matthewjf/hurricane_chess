var GameIndexStore = require('../stores/game_index_store'),
    GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  subscribe: function() {
    /* global App */
    App.games_index = App.cable.subscriptions.create("GamesIndexChannel", {
      connected: function() {
        console.log("connected");
        GameIndexActions.handleError();
      },

      disconnected: function() {
        GameIndexActions.handleError('lost connection');
      },

      rejected: function() {
        GameIndexActions.handleError('lost connection');
      },

      received: function(data) {
        console.log(data);
        if (data['action'] === 'create' || data['action'] === 'update')
          GameIndexActions.receiveGame(data['game']);
        else if (data['action'] === 'destroy')
          GameIndexActions.removeGame(data['game']);
      }
    });
  },

  unsubscribe: function() {
    GameIndexActions.handleError('lost connection');
    App.games_index.unsubscribe();
  }
};
