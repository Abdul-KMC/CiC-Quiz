const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// Register User
exports.registerUser = async(req, res) => {
    const { userName, email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (user)
        return res
            .status(400)
            .send({ error: "User with this email already exists" });

    user = new User({
        userName,
        email,
        password,
    });

    user.password = await bcrypt.hash(user.password, 12);

    let savedUser = await user.save();
    savedUser = _.pick(savedUser, ["_id", "userName", "email"]);

    res.status(201).send(savedUser);
};

// logIn User
exports.logIn = async(req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (!user)
        return res.status(404).send("User with this email doesn't Exist");

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) return res.status(403).send("Incorrect Password");

    user = _.pick(user, [
        "_id",
        "userName",
        "email",
    ]);
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    res.status(200).send(token);
};

// Find User by Id
exports.getUser = async(req, res) => {
    const { userId } = req.params;

    let user = await User.findById({ _id: userId });

    user = user.toObject();
    user = _.omit(user, "password");

    res.status(200).send(user);
};