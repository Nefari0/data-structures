require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./controllers/authController');
const cancerStatController = require('./controllers/cancerStatController');
const dataTestController = require('./controllers/dataTestController');
const employeeController = require('./controllers/employeeController');
const titanicController = require('./controllers/titanicController');
const docsController = require('./controllers/docsController')
const path = require('path');
// const docsController = require('./controllers/docsController');

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.use(
    session({
            resave: false,
            saveUninitialized: true,
            secret: SESSION_SECRET,
            cookie: { maxAge: 1000 * 60 * 5 },
        }),
    )

// user end points
app.post('/api/auth/register', authController.register)
app.post('/api/auth/login', authController.login)
app.get('/api/auth/logout', authController.logout)
app.post('/api/auth/browser/login', authController.browserLogin)

// --- memos / docs endpoinds --- //
app.get('/api/memos/get',docsController.getDocs)
app.post('/api/memo/update',docsController.editMemo)

// test data endpoints
app.get('/api/testdata/all', dataTestController.getData)
// app.get('/api/projects/all', dataTestController.getData)

// cancer stats endpoints
app.get('/api/cancer/all', cancerStatController.getAllStats)
app.post('/api/cancer/add',cancerStatController.addToDatabase)
app.post('/api/cancer/transceive',cancerStatController.oneResult)
// app.get('/api/cancer/result',cancerStatController.oneResult)

// breaking bad endpoints
// app.get('/api/bb/all')

// employee endpoints
app.get('/api/employees/all',employeeController.getAllEmployees)

// titanic end points
app.get('/api/passengers/all', titanicController.getAll)

// -----server ------
app.use( express.static( __dirname + '/../build'));
app.get('*', (req,res) => {
res.send(path.join(__dirname, '../build/index.html'))
})
// -------------------

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