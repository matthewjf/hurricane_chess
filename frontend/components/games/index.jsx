var React = require('react');

var GameIndexSubscription = require('../../util/game_index_subscription'),
    GameIndexApi = require('../../util/game_index_api'),
    GameIndexStore = require('../../stores/game_index_store');

var GameIndexItem = require('./index_item'),
    NewGameForm = require('./new_game_form');

module.exports = React.createClass({
  getInitialState: function() {
    return {games: []};
  },

  getGames: function() {
    this.setState({ games: GameIndexStore.all() });
  },

  componentDidMount: function() {
    this.gameListener = GameIndexStore.addListener(this.getGames);
    GameIndexApi.fetchGames();
    GameIndexSubscription.subscribe();
  },

  componentWillUnmount: function() {
    this.gameListener.remove();
    GameIndexSubscription.unsubscribe();
  },

  gameList: function(games) {
    if (games) {
      return games.map(function(game) {
        return <GameIndexItem game={game} key={game.id} />;
      });
    } else {
      return <div/>;
    }
  },

  render: function() {
    return(
      <div id='game-index'>
        <div className='split'>
          <h2>GAMES</h2>

          <a className="waves-effect waves-light btn modal-trigger"
              href="#new-game">
            new game
          </a>

          <div id="new-game" className="modal">
            <NewGameForm />
          </div>
        </div>

        <ul id='game-list'>
          {this.gameList(this.state.games) }
        </ul>
      </div>
    );
  }
});
