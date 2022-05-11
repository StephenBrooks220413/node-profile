const express = require('express');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const app = new express();

require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(expressSession({
    secret:process.env.SECRET
}));
app.use(flash());

globalloggedIn = null;
app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next()
});

// DB Connection
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
if(!mongoose){
    console.log('No DB connection')
} else {
    console.log('DB connection')
}

/////////////////////////////////////////////////////////////
// Middlewares
const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

//////////////////////////////////////////////////
//Server Starting
let port = process.env.PORT;
if(port == null || port == ""){
    port = 4000
}

// Controllers
const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const catalogController = require('./controllers/catalog')
const loginController = require('./controllers/login');
const registerController = require('./controllers/register');
const storeUserController = require('./controllers/storeUser');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

app.listen(process.env.PORT || 8000, () => {
    console.log('App.listening')
})

app.get('/', homeController)
app.get('/about', aboutController)
app.get('/catalog', authMiddleware, catalogController)

///////////////////////////////////////////////////
// Users
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.get('/auth/register', redirectIfAuthenticated, registerController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get('/auth/logout', logoutController);