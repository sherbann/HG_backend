/// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');



const { User } = require('../models/user');
//const { Event } = require('../models/event')
const { Profile } = require('../models/profile');
mongoose.connect('mongodb+srv://mongo-DevAcademy:sheffield22@cluster0.buz9v.mongodb.net/HOG?retryWrites=true&w=majority');
//mongoose.connect('mongodb+srv://mongo-bronte:Mongo2021@cluster0.w6kx5.mongodb.net/HOGProject?retryWrites=true&w=majority');


const port = process.env.PORT || 3001;
// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


app.post('/auth', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  console.log(req.body)
  if (!user) {
    return res.sendStatus(401);
  }
  if (req.body.password !== user.password) {
    return res.sendStatus(403)
  }

  user.token = uuidv4()
  await user.save()
  // added username: usernam 2 Feb
  res.send({
    token: user.token, userType: user.userType,
    username: user.username
  })

})

app.use(async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const user = await User.findOne({ token: authHeader })
  if (user) {
    next()
  } else {
    res.sendStatus(403);
  }
})


// defining CRUD operations
app.get('/', async (req, res) => {
  res.send(await Profile.find());
});

app.post('/', async (req, res) => {
  const newProfile = req.body;
  const profile = new Profile(newProfile);
  await profile.save();
  res.send({ message: 'New profile inserted.' });
});

app.delete('/:id', async (req, res) => {
  await Profile.deleteOne({ _id: ObjectId(req.params.id) })
  res.send({ message: 'Profile removed.' });
});

app.put('/:id', async (req, res) => {
  await Profile.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body)
  res.send({ message: 'Profile updated.' });
});

//Employer Find - Frontend
app.post('/tda/employersearch', async (req, res) => {
  const { sEmail, sFirstname, sLastname, sSkills, sLocation } = req.body
  const query = {}
  if (sFirstname) {
    query.firstName = { $regex: sFirstname, $options: 'i' }
  }
  if (sLastname) {
    query.lastName = { $regex: sLastname, $options: 'i' }
  }
  if (sEmail) {
    query.email = { $regex: sEmail, $options: 'i' }
  }

  if (sSkills != "") {
    query.skills = { $in: sSkills }
  }
  if (sLocation) {
    query.location = { $regex: sLocation, $options: 'i' }
  }


  console.log(query)
  res.send(await Profile.find(query).where("isEmployed").equals(false).lean())
})


// starting the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Database connected!")
});
