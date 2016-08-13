var UserActions = require('../actions/user_actions');
var Connection = require('./connection');

module.exports = {
	signup: function(user, successCB, errorCB){
		$.ajax({
			url: "/api/user",
			type: "post",
			data: {user: user},
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				Connection.reset();
				if (successCB) { successCB(data); }
			}),
			error: (function(error) {
				UserActions.handleError(error);
				if (errorCB) { errorCB(error); }
			})
		});
	},

	login: function(user, successCB, errorCB){
		$.ajax({
			url: "/api/session",
			type: "post",
			data: {user: user},
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				Connection.reset();
				if (successCB) { successCB(data); }
			}),
			error: (function(error) {
				UserActions.handleError(error);
				if (errorCB) { errorCB(error); }
			})
		});
	},

	logout: function(successCB, errorCB){
		$.ajax({
			url: '/api/session',
			method: 'delete',
			success: (function(data) {
				UserActions.removeCurrentUser();
				Connection.reset();
				if (successCB) { successCB(data); }
			}),
			error: (function(error) {
				UserActions.handleError(error);
				if (errorCB) { errorCB(error); }
			})
		});
	},

	fetchCurrentUser: function(successCB, errorCB){
		$.ajax({
			url: '/api/session',
			method: 'get',
			success: (function(data) {
				UserActions.receiveCurrentUser(data);
				Connection.reset();
				if (successCB) { successCB(data); }
			}),
			error: (function(error) {
				UserActions.handleError(error);
				if (errorCB) { errorCB(error); }
			})
		});
	}
};
