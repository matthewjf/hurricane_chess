var GameIndexStore = require('../stores/game_index_store'),
    GameIndexActions = require('../actions/game_index_actions');

module.exports = {
  subscribe: function() {
    /* global App */
    App.games_index = App.cable.subscriptions.create("GamesIndexChannel", {
      connected: function() {
        console.log('connected to games index');
      },

      disconnected: function() {
        console.log('disconnected from games index');
      },

      received: function(data) {
        console.log('received');
        if (data['type'] === 'create')
          GameIndexActions.receiveGame(data['game']);
      }
    });
  },

  unsubscribe: function() {
    App.games_index.unsubscribe();
  }
};
