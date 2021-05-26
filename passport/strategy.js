const passport = require ('passport');
const jwt = require ('jsonwebtoken');
const BearerStrategy = require ('passport-http-bearer');
const User = require ('../models/userSchema');

passport.use(new BearerStrategy(
  
    async(token, done) =>{
      const decodeData = await jwt.verify(token , 'secret')
      // console.log(decodeData);

      User.findOne({ _id: decodeData.userId }, function (err, user) {
        console.log(user);
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));