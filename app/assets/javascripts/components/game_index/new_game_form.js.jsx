var NewGameForm = React.createClass({
  blankAttrs: {
    name: '',
    public: true,
    private: false
  },

  getInitialState: function() {
    return this.blankAttrs;
  },

  render: function() {
    return (
      <div className='row'>
        <form action="/games" className="col s12" method="post">
          <input name="authenticity_token" value={this.props.token} type="hidden" />
          <div className="modal-content">

            <div className='row'>
              <div className='input-field'>
                <input name="game[name]" id="game_name" type="text"/>
                <label htmlFor="game_name">Name</label>
              </div>
            </div>

            <p>
              <input name="game[private]"
                     type="radio"
                     id="public_game"
                     value="false" />
                   <label htmlFor="public_game">Public</label>
            </p>

            <p>
              <input name="game[private]"
                     type="radio"
                     id="private_game"
                     value='true' />
                   <label htmlFor="private_game">Private</label>
            </p>
          </div>

          <div className='modal-footer'>
            <input type='submit' value='create' className="btn" />
          </div>

        </form>
      </div>
    );
  }
});
