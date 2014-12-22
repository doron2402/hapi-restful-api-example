var Server = {
	prod: {
		host: '0.0.0.0',
		port: '3000'
	},
	stage: {
		host: '0.0.0.0',
		port: '3000'
	},
	dev: {
		host: '0.0.0.0',
		port: '3000'
	},
	getSettings: function(env){
		return Server[env];
	}
};

module.exports = Server;