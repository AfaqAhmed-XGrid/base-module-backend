/*
Copyright (c) 2023, Xgrid Inc, http://xgrid.co

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Package imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Developing user schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: undefined,
  },
  githubId: {
    type: String,
    default: undefined,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: undefined,
  },
  password: String,
  passwordResetToken: {
    type: String,
    default: undefined,
  },
  profilePicture: {
    type: String,
    default: undefined,
  },
  role: {
    type: String,
    default: 'user',
  },
  method: {
    type: String,
    default: 'local',
  },
});

// Hashig pasword before saving into db
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.pre('save', async function(next) {
  if (this.googleId) {
    this.method = 'google';
  }
  if (this.githubId) {
    this.method = 'github';
  }
  next();
});

// Adding password checking method
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Adding token generating method
userSchema.methods.generatePasswordResetToken = async function() {
  const resetToken = jwt.sign(
      {
        id: this._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 1000*60*5,
      },
  );
  this.passwordResetToken = resetToken;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
