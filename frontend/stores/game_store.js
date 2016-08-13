var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    GameConstants = require('../constants/game_index_constants');

var _gameId = {};

var setGameId = function(gameId) {
  _gameId = gameId;
};

var removeGame = function() {
  _gameId = {};
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
  }
  this.__emitChange();
};

module.exports = GameStore;
