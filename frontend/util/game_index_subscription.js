var GameIndexStore = require('../stores/game_index_store'),
    GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  subscribe: function() {
    /* global App */
    App.games_index = App.cable.subscriptions.create("GamesIndexChannel", {
      connected: function() {
        console.log("connected to index");
        GameIndexActions.handleError();
      },

      disconnected: function() {
        console.log("disconnected from index");
        GameIndexActions.handleError('lost connection');
      },

      rejected: function() {
        console.log("rejected from index");
        GameIndexActions.handleError('lost connection');
      },

      received: function(data) {
        console.log('received ', data);
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
