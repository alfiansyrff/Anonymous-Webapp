const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const {loadMessages, addMessages} = require('./utils/message.js');
const session = require('express-session');
const cokkieParser = require('cookie-parser');
const flash = require('connect-flash');


const app = express();
const port = 3000;


// SetUp EJS
// Gunakan ejs 
app.set('view engine', 'ejs');
//Third Party Middleware
app.use(expressLayouts);
//Built in middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

//Konfigurasi flash
app.use(cokkieParser('secret'));
app.use(session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(flash());

// Halaman Utama
app.get('/', (req, res) => {
    const pesans = loadMessages();
    
    res.render('index', {
        layout: 'layouts/main-layout',
        title : 'Halaman Pesan',
        pesans,
        msg : req.flash('msg'),
    });
    
});

// Halaman tambah pesan
app.get('/pesan', (req, res) => {
    res.render('add-message', {
        title : "Form Tambah Message",
        layout : 'layouts/main-layout',
    });
});


// Tambah Pesan
app.post('/',
(req, res) => {
    addMessages(req.body);
    //kirimkan flash message
    req.flash('msg', 'Pesan berhasil dikirim! Terimakasih sudah mengisi😉');
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Anonymous Message App | Listening at http://localhost:${port}`)
});