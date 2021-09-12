require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./controllers/authController');
const cancerStatController = require('./controllers/cancerStatController');
const dataTestController = require('./controllers/dataTestController')

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.use(
    session({
            resave: true,
            saveUninitialized: false,
            secret: SESSION_SECRET,
            cookie: { maxAge: 1000 * 60 * 5 },
        }),
    )

// user end points
app.post('/api/auth/register', authController.register)
app.post('/api/auth/login', authController.login)
// app.post('/api/auth/login', authController.login)

// test data endpoints
app.get('/api/testdata/all', dataTestController.getData)
// app.get('/api/projects/all', dataTestController.getData)

// cancer stats endpoints
app.get('/api/cancer/all', cancerStatController.getAllStats)

// breaking bad endpoints
// app.get('/api/bb/all')

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
}).then((dbInstance) => {
    app.set('db',dbInstance);
    console.log('db connected');
    app.listen(SERVER_PORT, () => console.log(`server ready on ${SERVER_PORT}`))
});