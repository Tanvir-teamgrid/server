const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/userSchema');
const SocialMedia = require('../model/socialMediaSchema');

// Configure Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ socialMediaId: profile.id, authType: 1 });
    if (!user) {
      user = await new User({
        email: profile.emails[0].value,
        userName: profile.displayName,
        profilePhoto: profile._json.picture,
        authType: 1, // Google
        socialMediaId: profile.id
      }).save();
    }
    await SocialMedia.findOneAndUpdate(
      { userId: user._id },
      { google: profile.id },
      { upsert: true, new: true }
    );
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

// Configure Facebook OAuth
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name', 'photos', 'link', 'gender']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Facebook Profile:', profile); // Log the profile object

    const email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : 'no-email@example.com';
    const userName = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`; // Fallback to name parts
    const profilePhoto = (profile.photos && profile.photos[0]) ? profile.photos[0].value : '';

    let user = await User.findOne({ socialMediaId: profile.id, authType: 2 });
    if (!user) {
      user = new User({
        email: email,
        userName: userName,
        profilePhoto: profilePhoto,
        authType: 2, // Facebook
        socialMediaId: profile.id
      });
      await user.save();
    }

    await SocialMedia.findOneAndUpdate(
      { userId: user._id },
      { facebook: profile.id },
      { upsert: true, new: true }
    );

    done(null, user);
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    done(error, null);
  }
}));

 

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
  