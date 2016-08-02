var GameIndex = React.createClass({
  getInitialState: function() {
    return {games: this.props.games};
  },

  getDefaultProps: function() {
    return {games: []};
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

  componentDidMount: function() {
    this._setSubscription();
  },

  processBroadcast: function(data) {
    if (data['type'] === 'new') {
      this.setState({games: [data['game']].concat(this.state.games)});
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
            <NewGameForm token={this.props.token} />
          </div>
        </div>

        <ul id='game-list'>
          {this.gameList(this.state.games) }
        </ul>
      </div>
    );
  },

  _setSubscription: function() {
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
        self.processBroadcast(data);
      }
    });

  }
});
