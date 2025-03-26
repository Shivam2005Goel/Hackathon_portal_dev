const mongoose = require("mongoose");
const express = require('express');
var cors = require('cors')
const app = express()

app.use(cors());

const mongoURI = "mongodb://127.0.0.1:27017/Hackathon"; // Replace with your DB name

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));


const port = 3000

app.use(express.json());

app.use('/api/auth/student',require('./routes/auth/student'));
app.use('/api/auth/faculty',require('./routes/auth/faculty'));
app.use('/api/auth/admin',require('./routes/auth/admin'));



app.get('/studentlogin', (req, res) => {
  res.send('Hello World!');
})

app.get('/facultylogin', (req, res) => {
    res.send('Hello World!');
})

app.get('/adminlogin', (req, res) => {
    res.send('Hello World!');
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


