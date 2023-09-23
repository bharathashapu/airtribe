var mangoose = require('mongoose'),
Schema = mangoose.Schema;

/**
 * fullName,
 * email,
 * password,
 * preferences,
 * created,
 * updated
 * */ 
var userSchema = new Schema({
   fullName: {
    type: String,
    required: [true, 'Fullname not provided'] 
   },
   email: {
    type: String,
    unique: [true, 'Email already exists in the DB'],
    lowercase: true,
    trim: true,
    required: [true, 'Email not provided'],
    validate: {
        validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Email is not in the right format and is a Invalid Email'
    }
   },
   password: {
    type: String,
    required: [true, "Password not Provided"]
   },
   preferences: {
    category: {
        type: [String],
        required: [true, "Atleast one category is mandatory"]
    },
    sources: {
        type: [String],
        required: [true, "Atleast one sources is mandatory"]
    }
   },
   created: {
    type: Date,
    default: Date.now
   },
   updated: {
    type: Date,
    default: Date.now
   }
});

module.exports = mangoose.model('User', userSchema);