var GameStore = require('../stores/game_store'),
    GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  subscribe: function() {
    /* global App */
    App.game = App.cable.subscriptions.create("GamesIndexChannel", {
      connected: function() {
        console.log('connected to games index');
      },

      disconnected: function() {
      },

      received: function(data) {
        console.log('received');
        if (data['action'] === 'create')
          GameIndexActions.receiveGame(data['game']);
      }
    });
  },

  unsubscribe: function() {
    App.games_index.unsubscribe();
  }
};
