require('dotenv').config();
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./controllers/authController');
const cancerStatController = require('./controllers/cancerStatController');
const employeeController = require('./controllers/employeeController');
const titanicController = require('./controllers/titanicController');
const docsController = require('./controllers/docsController')
const tableController = require('./controllers/tableController')
const linksController = require('./controllers/linksController');
const path = require('path');

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.use(
    session({
            resave: false,
            saveUninitialized: true,
            secret: SESSION_SECRET,
            cookie: { maxAge: 1000 * 60 * 60 * 24 },
        }),
    )

// --- user / auth end points --- //
app.post('/api/auth/register', authController.register)
app.post('/api/auth/login', authController.login)
app.get('/api/auth/logout', authController.logout)
app.post('/api/auth/browser/login', authController.browserLogin)

// --- memos / docs endpoinds --- //
app.get('/api/memos/get',docsController.getDocs)
app.get('/api/memos/spec/get',docsController.getSpecDocs)
app.put('/api/memos/update',docsController.editMemo)
app.post('/api/memos/new',docsController.newMemo)
app.delete('/api/memos/delete/:memo_id',docsController.deleteMemo)
app.get('/api/memos/encrypt/all',docsController.encryptAll) // Tests encryption

// --- cancer stats endpoints --- //
app.get('/api/cancer/all', cancerStatController.getAllStats)
app.post('/api/cancer/add',cancerStatController.addToDatabase)
app.post('/api/cancer/transceive',cancerStatController.oneResult)
// app.get('/api/cancer/result',cancerStatController.oneResult)

// --- employee endpoints --- //
app.get('/api/employees/all',employeeController.getAllEmployees)

// --- titanic end points --- //
app.get('/api/passengers/all', titanicController.getAll)

// --- Get column names --- //
app.post('/api/column/names',tableController.getNames)

// --- Links --- //
app.get('/api/links/get', linksController.getLinks)
app.post('/api/links/new', linksController.newLink)
app.put('/api/links/edit', linksController.editLink)
app.delete('/api/links/delete/:link_id', linksController.deleteLink)

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