var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    GameIndexConstants = require('../constants/game_index_constants');

var _games = {};

var resetGames = function(games) {
  _games = {};

  games.forEach(function(game) {
    _games[game.id] = game;
  });
};

var setGame = function(game) {
  _games[game.id] = game;
};

var removeGame = function(game) {
  delete _games[game.id];
};

var GameIndexStore = new Store(Dispatcher);

GameIndexStore.all = function() {
  return Object.keys(_games).map(function(gameId){
    return _games[gameId];
  });
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
  }
  this.__emitChange();
};

module.exports = GameIndexStore;
