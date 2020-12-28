const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { registerVal, LoginVal } = require("../validation/validation");
const jwt = require("jsonwebtoken");
const { validate } = require("../model/user");
const verify = require("../routes/verifyToken");

router.post("/register", async (req, res) => {
  // let { email, password, passwordCheck, username, fname, lname } = req.body;
  let email = req.body.email;
  let password = req.body.password;
  let passwordCheck = req.body.passwordCheck;
  // let username = req.body.username;
  // let fname = req.body.fname;
  // let lname = req.body.lname;

  if (!email || !password)
    return res.status(400).json({ msg: "Not all fields have been entered." });

  // console.log(passwordCheck);
  // if (password.length < 5)
  //   return res
  //     .status(400)
  //     .json({ msg: "The password needs to be at least 5 characters long." });

  if (password !== passwordCheck)
    return res
      .status(400)
      .json({ msg: "Enter the same password twice for verification." }); //
  /**Let's validate the data before making a user
   *
   * Val Function registerVal
  
    //*** JOI validation */
    const { error } = registerVal(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });


    /** Checking if user is already in database*** */ const emailExists = await User.findOne(
    { email: req.body.email }
  );
  if (emailExists) {
    return res
      .status(400)
      .json({ msg: "An account with this email already exists." });
  } //

  /** Hash Password*** */ const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  /**
   * Create new user
   */

  const user = new User({
    username: req.body.username,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    /**Try adding new user to the database */
    const savedUser = await user.save();
    res.send({ user_id: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verifytoken", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified;
    res.send(req.user._id);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", verify, async (req, res) => {
  // const user = await User.findById(req.user);
  // res.json(
  //     {
  //         username : user.username,
  //         id : user._id,
  //     }
  // );
  res.send(req.user._id);
});

/**
 *! Login
 */
router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    // ***** Checking if all fields have been entered  */
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    //*** JOI validation */
    const { error } = LoginVal(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    // **** Cheking email exists or not  **//
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res

        .status(400)
        .json({ msg: "No account with this email has been registered." });

    //** Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).json({ msg: "Invalid credentials." });
    //create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    //  res.header('auth-token',token).send(token);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
