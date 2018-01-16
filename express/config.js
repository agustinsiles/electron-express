const argv = require("process.argv")(process.argv.slice(2)),
	config = argv({ port: 3000 });

module.exports = config;
