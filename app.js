// Carregando módulos
const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const admin = require('./routes/admin');
const user = require('./routes/user');
const session = require('express-session');
const flash = require('connect-flash');
require('./models/Poll');
const Poll = mongoose.model('poll');
require('./models/Topic');
const Topic = mongoose.model('topic');
const db = require("./config/db");

// Config
    // sessão
        app.use(session( {
            secret: "jogodoabateeloko",
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash());
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })
    // Body-Parser
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
    // handlebars
        app.engine('handlebars', engine({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    // Mongoose
        mongoose.connect(db.mongoURI).then(() => {
            console.log("Conectado ao mongo.")
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar se conectar ao mongo:" + err )
        });
    // public static files
        app.use(express.static(path.join(__dirname, "public")))

// Routes
    app.get('/', (req, res) => {
        res.render("index")
    })
    app.use("/admin", admin);
    app.use("/user", user);

// Outros 
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log("Servidor rodando.")
})