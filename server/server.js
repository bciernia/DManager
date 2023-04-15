const express = require("express");
const {static} = require("express");
const {gameRouter} = require("./routes/game");
const {characterRouter} = require("./routes/characters");
const {teamRouter} = require("./routes/teams");
const bodyParser = require('body-parser');
const {dmRouter} = require("./routes/dm");

const app = express();

app.use(express.json({limit: '5mb'}));
app.use(static('public'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use('/', gameRouter);
app.use('/character', characterRouter);
app.use('/teams', teamRouter);
app.use('/dm', dmRouter);

// app.get('/api', (req, res) => {
//     res.json({
//         "users": ['userOne', 'userTwo', 'userThree'],
//     });
// });

app.listen(5000, '127.0.0.1', () => {
    console.log('Server started on port 5000');
});