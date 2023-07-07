// Package imports
const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

// Developing user schema
const userSchema = new mongoose.Schema( {
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
    unique: true,
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
} );

// Hashig pasword before saving into db
userSchema.pre( 'save', async function( next ) {
  if ( !this.isModified( 'password' ) ) {
    next();
  }
  const salt = await bcrypt.genSaltSync( 10 );
  this.password = await bcrypt.hash( this.password, salt );
  next();
} );

// Adding password checking method
userSchema.methods.isPasswordMatched = async function( enteredPassword ) {
  return bcrypt.compare( enteredPassword, this.password );
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

const User = mongoose.model( 'User', userSchema );

module.exports = User;
