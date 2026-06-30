const User = require('../models/User');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if(!email || !pwd) return res.status(400).json({'message' : 'Email and password are required.'});

  const foundUser = await User.findOne({ email : email }).exec();
  if(!foundUser) return res.sendStatus(401); 

  const match = await bcrypt.compare(pwd, foundUser.password);
  if(match) {
    const accessToken = jwt.sign(
      {
        "email" : email
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' }
    );

    const refreshToken = jwt.sign(
      {"email" : foundUser.email},
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );  
    
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    
    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  handleLogin
};

