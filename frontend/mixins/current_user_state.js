var UserStore = require('../stores/user_store');
var UserApi = require('../util/user_api');

module.exports = {

	getInitialState: function(){
		return {
			currentUser: UserStore.currentUser(),
			userErrors: UserStore.errors()
		};
	},

	componentDidMount: function(){
		this.userListener = UserStore.addListener(this.updateUser);
		if (typeof UserStore.currentUser() === 'undefined') {
			UserApi.fetchCurrentUser();
		}
	},

	componentWillUnmount: function() {
		this.userListener.remove();
	},

	updateUser: function(){
		this.setState({
			currentUser: UserStore.currentUser(),
			userErrors: UserStore.errors()
		});
	}
};
