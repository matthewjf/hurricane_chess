var UserActions = require('../actions/user_actions');

module.exports = {
	signup: function(user, success){
		$.ajax({
			url: "/api/user",
			type: "post",
			data: {user: user},
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
					if (success) { success(data); }
			}),
			error: UserActions.handleError
		});
	},

	login: function(user, success){
		$.ajax({
			url: "/api/session",
			type: "post",
			data: {user: user},
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				if (success) { success(data); }
			}),
			error: UserActions.handleError
		});
	},

	logout: function(success){
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: (function(data) {
				UserActions.removeCurrentUser();
				if (success) { success(data); }
			}),
			error: UserActions.handleError
		});
	},

	fetchCurrentUser: function(success){
		$.ajax({
			url: '/api/session',
			method: 'get',
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				if (success) { success(data); }
			}),
			error: UserActions.handleError
		});
	}
};
