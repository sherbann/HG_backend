const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  username: String,
  userType: String,
  title: String,
  firstName: String,
  lastName: String,
  bio: String,
  email: String,
  // image: String,
  // cv: String,
  location: String,

  // companyName: String,
  // companyType: String,
  // isRecruiting: Boolean,
  // currentVacancies: String,

 
    isEmployed: Boolean,
    // employedInTech: String,
    // employedOther: String,
    // freelance: String,
    // notEmployed: String,
    // inEducation: String,
  

//  like: Boolean,

  portfolio: String,
  github: String,
  linkedin: String,
  skills: Array,
})

module.exports.Profile = mongoose.model('Profile', profileSchema)
