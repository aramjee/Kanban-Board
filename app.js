//Loads the express module
import express from 'express';
//Loads the handlebars module
import handlebars from 'express-handlebars';
import path from 'path';
import configRoutes from './routes/index.js'; //
const __dirname = path.resolve();

//Creates our express server
const app = express();
const port = 3000;

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    //new configuration parameter
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/'
}));

//Serves static files (we need it to import a css file)
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app); //invoke the application that configure routes

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
