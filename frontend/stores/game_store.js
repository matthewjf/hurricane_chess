var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_index_constants');

var _gameId = {};
var _error = null;

var setGameId = function(gameId) {
  _gameId = gameId;
};

var removeGame = function() {
  _gameId = {};
};

var setError = function(error) {
  _error = error;
};

var clearError = function(error) {
  _error = null;
};

var GameStore = new Store(Dispatcher);

GameStore.gameId = function() {
  return _gameId;
};

GameStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case GameConstants.GAME_JOINED:
      setGameId(payload.gameId);
      break;
    case GameConstants.ERROR_RECEIVED:
      setGameId(payload.gameId);
      break;
  }
  this.__emitChange();
};

module.exports = GameStore;
