var GameIndexStore = require('../stores/game_index_store');

module.exports = {
  subscribe: function() {
    var self = this;
    /* global App */
    App.games_index = App.cable.subscriptions.create("GamesIndexChannel", {
      connected: function() {
        console.log('connected to games index');
      },

      disconnected: function() {
        console.log('disconnected from games index');
      },

      received: function(data) {
        console.log('received data');
        debugger
      }
    });
  },

  unsubscribe: function() {
    App.games_index.unsubscribe();
  }
};
