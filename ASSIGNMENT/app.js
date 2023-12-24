require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoute);

app.use((req, res, next) => {
    res.status(404).send({ message: "Resource  Not Found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

if (process.env.NODE_ENV === 'prod') {
    console.log("hiiii");
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
} else {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
    });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

