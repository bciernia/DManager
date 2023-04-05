const express = require("express");
const {static} = require("express");
const {gameRouter} = require("./routes/game");
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/', gameRouter);
app.use('/character', characterRouter);

// app.get('/api', (req, res) => {
//     res.json({
//         "users": ['userOne', 'userTwo', 'userThree'],
//     });
// });

app.listen(5000, '127.0.0.1', () => {
    console.log('Server started on port 5000');
});