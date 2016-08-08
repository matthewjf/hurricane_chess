var UserConstants = require('../constants/user_constants'),
		UserStore = require('../stores/user_store'),
		AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {

	receiveCurrentUser: function(data){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: {username: data.username}
		});
	},

	handleError: function(error) {
		AppDispatcher.dispatch({
			actionType: UserConstants.ERROR,
			errors: error
		});
	},

	removeCurrentUser: function(){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGOUT,
		});
	},

	resetErrors: function(errors) {
		AppDispatcher.dispatch({
			actionType: UserConstants.ERROR,
			errors: errors
		});
	}
};
