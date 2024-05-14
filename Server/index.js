
const  express  = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
//Photos                 

app.use(express.static('private')); 
app.use('/images', express.static('images'));

const db = require('./models');
    
var corsOptions = {
    origin: 'http://192.168.0.15:3000',
    origin: 'http://localhost:3000',
    origin: 'http://127.0.0.1:3000',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, POST" // add per need
}

app.use(cors(corsOptions));

const PostRouter = require('./Routes/Posts');
app.use("/posts", PostRouter);

const CommentsRouter = require('./Routes/Comments');
app.use("/comments", CommentsRouter);

const UsersRouter = require('./Routes/Users');
app.use("/auth", UsersRouter);

const LikesRouter = require('./Routes/likes');
app.use("/likes", LikesRouter );

const CommLikesRouter = require('./Routes/Comlike');
app.use("/commlikes", CommLikesRouter );

const Upload = require('./Routes/Upload');
app.use("/post", Upload);

const Follow = require('./Routes/Follow');
app.use("/follow", Follow);



//Server Start
db.sequelize.sync().then(()=>{
    app.listen('3001', () =>{
        console.log("Server Running on port 3001");
    })
})
 