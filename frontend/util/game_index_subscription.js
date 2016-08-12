var GameIndexStore = require('../stores/game_index_store'),
    GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  subscribe: function() {
    /* global App */
    App.games_index = App.cable.subscriptions.create("GamesIndexChannel", {
      connected: function() {
        GameIndexActions.handleError();
      },

      disconnected: function() {
        GameIndexActions.handleError('lost connection');
      },

      received: function(data) {
        console.log('received');
        if (data['action'] === 'create')
          GameIndexActions.receiveGame(data['game']);
      }
    });
  },

  unsubscribe: function() {
    GameIndexActions.handleError('lost connection');
    App.games_index.unsubscribe();
  }
};
