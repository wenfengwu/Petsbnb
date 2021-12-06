import mongoose from 'mongoose'
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "First name is required"]
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    },
    stripe_account_id:'',
    stripe_host:{},
    stripeSession:{}
  }, {timestamps: true});
  
  // add this after UserSchema is defined

  UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

  UserSchema.pre('validate', function(next) {
      if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
      }
      next();
    });

    UserSchema.pre('save', function(next) {
      bcrypt.hash(this.password, 12) //add salt
        .then(hash => {
          this.password = hash;
          next();
        });
  });


  UserSchema.methods.passwordCompared = function (password, next) {
    //compare the passwords
    bcrypt.compare(password, this.password, function(err, match) {
      if(err){
        console.log('Password does not match...', err);
        return next(err, false);
      }
      //if matches: we get null
      console.log("Password matched...", match);
      return next(null, match);
    })
  }

//   UserSchema.pre('save', function(next) {
//       if(this.isModified('password')){
//           return bcrypt.hash(this.password, 12, function(err, hash){
//               if(err){
//                   console.log("ERROR when hashing password",err)
//                   return next(err);
//               }
//               this.password = hash;
//               return next();
//           }) //add salt
//       }
//       return next();
//   });

// make the User schema and export
const User = mongoose.model("User", UserSchema);
export default User;