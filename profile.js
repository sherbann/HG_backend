const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  username: String,
  userType: String,
  title: String,
  firstName: String,
  lastName: String,
  bio: String,
  email: String,
  image: String,
  cv: String,
  location: String,
 
    isEmployed: String,
    employedInTech: String,
    employedOther: String,
    freelance: String,
    notEmployed: String,
    inEducation: String,
  

 saveForLater: Boolean,

 portfolioLink: String,
 githubLink: String,
 LinkedInLink: String
})

module.exports.Profile = mongoose.model('Profile', profileSchema)