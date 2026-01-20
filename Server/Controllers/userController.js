import mogoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = (req, res) => {
  // Registration logic here
  const { username, email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists with this email.');  
      res.status(400).json({ message: 'User already exists with this email' });
    } else {
      const newUser = new User({
        username,
        email,
        password: bcrypt.hashSync(password, 10)
      });

      newUser.save().then(user => {
        console.log('User registered successfully:', user);
        res.status(201).json({ message: 'User registered successfully' });
      });
    }
  });
};

const loginUser = (req, res) => {
  // Login logic here
 const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      console.log('No user found with this email.');
      res.status(404).json({ message: 'No user found with this email' });
    } else {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id , username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful. Token:', token);

        res.cookie("token", token, { httpOnly: true, // prevents JS access (XSS protection) 
          secure: process.env.NODE_ENV === 'production', // only over HTTPS in production
          sameSite: "strict", // prevents CSRF
          maxAge: 1000 * 60 * 60 // 1 hour 
        });

        res.status(200).json({ token });
      } else {
        console.log('Incorrect password.');
        res.status(401).json({ message: 'Incorrect password' });
      } 
    }
  });

};

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
  });
  res.status(200).json({ message: 'Logged out successfully' });
};  

export { registerUser, loginUser, logoutUser };