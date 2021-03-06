const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const Schema = mongoose.Schema;


const AdminSchema = new Schema ({

	username: {
		type: String,
		unique: true,
		required: true

	},

	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		required: true
	},
	
	}, {
     toObject: {
     virtuals: true
     },
     toJSON: {
     virtuals: true
     },
	});

AdminSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
      return next();
  }
});

AdminSchema.methods.comparePassword = (passw, cb) => {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Admin', AdminSchema);
