const express = require('express');
const cartsRoutes = require('../src/routes/carts.routes');
const productsRoutes = require('../src/routes/products.routes');
const viewsRoutes = require('../src/routes/views.routes');
const sessionsRouter = require ('./routes/sessions.router.js');
const handlebars = require('express-handlebars');
const __dirname = require('.utils.js/');
const Server = require('socket.io');
const mongoose = reqire('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store');
const MongoStore = require ('connect-mongo');
const passport = require ('passport');
const initializePassport = require ('./config/passport.config.js');
const githubLoginViewRouter = require ('./routes/github-login.views.router.js');


const app = express();
const PORT = 8080; 

//Configuracion Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Configuracion de Acceso a la carpeta public
app.use(express.static(__dirname+'/public'));


//Configuracion del servidor para recibir JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Creamos los enrutadores
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/realTimePorducts', viewsRoutes);
app.use("/api/sessions/current", sessionsRouter);
app.use("/github", githubLoginViewRouter);

//Rutas de Sessions y Usuarios
app.use('/users', usersViewRouter);
app.use('/api/sessions', sessionsRouter);


//Conectando Sessions con Mongo
app.use(session({
    store: MongoStore.create({
        mongoUrl: "",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 10 * 60,
    }),

    secret: "coderS3cr3t",
    resave: false,
    saveUninitialized: true,
}))


//Middlewares Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());




//Conectando Sessions con FileStorage
// const FileStorage = FileStore(session);

// app.use(session({
//     store: new FileStorage({path:'./sessions', ttl:100, retries:0}),
//     resave:false,
//     saveUninitialized: false
// }))



app.get('*', function (req, res) {
    res.send({status: "error", description: `ruta ${req.url} no encontrada`})
});

const httpServer = app.listen(PORT, ()=>{
    console.log(`Funcionando en puerto ${PORT}`);
})

//Instanciamos Socket del lado del Server
const socketServer = new Server(httpServer);
socketServer.on('connection', socket =>{
    socket.on('mensaje1', data =>{
        console.log(data);
    })

    socket.broadcast.emit('mensaje2', "Producto Eliminado")

})



//-----------Chat-------------------
// let messages = []
// socketServer.on('connection', socket => {

//     socket.on('message', data => {
//         messages.push(data);
//         socket.broadcast.emit('messageLogs', messages);
//         socketServer.emit('messageLogs', messages);
//     })

//     socket.on('userConnected', data => {
//         socket.broadcast.emit('userConnected', data.user);
//     })

//     // socket.disconnect()
//     socket.on('closeChat', data => {
//         if (data.close === 'close')
//             socket.disconnect();
//     })
// })


//-----------------Declaramos la conexion con la DB
const DB = 'mongodb+srv://disagustinalopez:RtPszX4bFwr4t0VB@cluster0.mfqjqym.mongodb.net/ecommerce?retryWrites=true&w=majority'
const connectMongoDB = async()=>{
    try {
        await mongoose.connect(DB);
        console.log("Conectado con exito a MongoDB usando Mongoose");
    } catch(error) {
        console.error("No se pudo conectar a la BD usando Mongoose: " + error);
        process.exit();
    }
}
connectMongoDB();