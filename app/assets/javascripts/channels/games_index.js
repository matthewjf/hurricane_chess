App.games_index = App.cable.subscriptions.create("GamesIndexChannel", {
  connected: function() {
    console.log('connected to games index');
  },

  disconnected: function() {
    console.log('disconnected from games index');
  },

  received: function(data) {
    var li = $("<li>").addClass('row');
    var a = $("<a>").attr('href', "/games/" + data.game.id);
    var div = $('<div>').addClass('game card-panel hoverable waves-effect');
    var span = $('<span>').attr('data', data.game.id).text("id " + data.game.id);
    var newGame = li.append(a.append(div.append(span)));

    $('#game-list').prepend(newGame);
  }
});
