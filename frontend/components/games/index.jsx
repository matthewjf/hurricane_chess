var React = require('react');

var GameIndexSubscription = require('../../util/game_index_subscription'),
    GameIndexApi = require('../../util/game_index_api'),
    GameIndexStore = require('../../stores/game_index_store'),
    CurrentUserState = require("../../mixins/current_user_state");

var GameIndexItem = require('./index_item'),
    NewGameForm = require('./new_game_form');

module.exports = React.createClass({
  getInitialState: function() {
    return { games: [], error: null, openModal: false };
  },

  getGames: function() {
    this.setState({games: GameIndexStore.all(), error: GameIndexStore.error()});
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

  openNewGameForm: function() {
		$('#new-game-modal').openModal();
  },

  gameList: function(games) {
    if (games) {
      return games.map(function(game) {
        return <GameIndexItem game={game} key={game.id} />;
      });
    } else {
      return null;
    }
  },

  renderError: function(error) {
    if (error) {
      return (
        <div id='index-error' className="card-panel white-text error-color">
          <span>Uh oh. Something bad happened. Try refreshing.</span>
        </div>
      );
    } else {
      return null;
    }
  },

  render: function() {
    return(
      <div id='game-index'>
        { this.renderError(this.state.error) }
        <div className='split'>
          <h2>GAMES</h2>

          <a className="waves-effect waves-light btn modal-trigger"
             onClick={this.openNewGameForm}>
            new game
          </a>

          <div id="new-game-modal" className="modal">
            <NewGameForm />
          </div>
        </div>

        <ul id='game-list'>
          { this.gameList(this.state.games) }
        </ul>
      </div>
    );
  }
});
