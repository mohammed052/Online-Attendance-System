const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
    role: {
        type: String,
        enum : ['admin', 'teacher', 'student'],
        // required: true
    }
});

// signup user static method
userSchema.statics.signup = async function(name, email, password, role) {
  // validation
  if (!name || !email || !password || !role) {
    throw Error('All fields must be filled');
  }

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }
  // check if email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ name, email, password: hash, role });
  
  return user;
};

// login user static method
userSchema.statics.login = async function(email,password){
  if(!email || !password) {
    throw Error('All fields must be filled');
  }
  const user = await this.findOne({ email });
  if(!user) {
    throw Error('Incorrect email');
  }
  const match = await bcrypt.compare(password, user.password);
  if(!match) {
    throw Error('Incorrect password');
  }
  return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;