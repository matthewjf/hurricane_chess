var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    GameIndexConstants = require('../constants/game_index_constants');

var _games = {};
var _error = null;

var resetGames = function(games) {
  _games = {};

  games.forEach(function(game) {
    _games[game.id] = game;
  });
  clearError();
};

var setGame = function(game) {
  _games[game.id] = game;
};

var removeGame = function(game) {
  delete _games[game.id];
};

var setError = function(error) {
  _error = error;
};

var clearError = function() {
  _error = null;
};

var GameIndexStore = new Store(Dispatcher);

GameIndexStore.all = function() {
  var games = Object.keys(_games).map(function(gameId){
    return _games[gameId];
  });

  return games.sort(function(g1, g2){
    return new Date(g2.updated_at) - new Date(g1.updated_at);
  });
};

GameIndexStore.error = function() {
  return _error;
};

GameIndexStore.find = function(id) {
  return _games[id];
};

GameIndexStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case GameIndexConstants.GAMES_RECEIVED:
      resetGames(payload.games);
      break;
    case GameIndexConstants.GAME_RECEIVED:
      setGame(payload.game);
      break;
    case GameIndexConstants.GAME_REMOVED:
      removeGame(payload.game);
      break;
    case GameIndexConstants.ERROR_RECEIVED:
      setError(payload.error);
      break;
  }
  this.__emitChange();
};

module.exports = GameIndexStore;
