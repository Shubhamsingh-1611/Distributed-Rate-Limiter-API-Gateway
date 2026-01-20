const registerUser = (req, res) => {
  // Registration logic here
  const { username, email, password } = req.body;
  console.log(`Registering user: ${username}, Email: ${email}`);
  // You would typically add user to the database here
  res.status(201).send(`User ${username} registered successfully`);

};

const loginUser = (req, res) => {
  // Login logic here
 const { email, password } = req.body;
 console.log(`Logging in user with Email: ${email}`);

};

export { registerUser, loginUser };