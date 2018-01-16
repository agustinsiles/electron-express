const bodyParser = require('body-parser'),
	express = require('express')
	createServer = require('http').createServer
	morgan = require('morgan'),
    config = require('./config'),
    products = require('./routes/products');
    
function init() {
	const app = express();

	app.use(morgan('tiny'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
    app.use(express.static('public'));
    
    app.set('views',`${__dirname}/views`);
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');

    app.get('/', (req, res) => res.render('index.html'));
    app.use('/products', products);

	const server = createServer();
	server.on('request', app);
	server.listen(config.port, () => console.warn(`Listen: ${config.port}`));
}

exports.init = init;
