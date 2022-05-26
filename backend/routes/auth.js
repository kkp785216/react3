const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "krishnaisagoodb$oy";

// Route 1:  Create a User using: POST "api/auth/createruser" . Doesn't require Auth , No login required
// Validate users data - if not valid then send error in response
router.post('/createuser', [
    body('name', 'Please Enter a valid name').isLength({ min: 3 }),
    body('email', 'Please Enter a valid email').isEmail(),
    body('password', 'Please Enter a valid password').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether email already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "This email is already exist" });
        }

        // Generate Secure password
        const salt = bcrypt.genSaltSync(10);
        securePassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
        }).then((user) => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        })
            .catch((error) => { console.log(error); res.send({ error: "Email already exist", message: error.message }) });

    } catch {
        console.log("Faild to connect to the database");
        res.status(500).json({ error: "Some error occured" });
    }
});

// Route 2: Authenticate a User using: POST "api/auth/login" . Doesn't require Auth , No login required
router.post('/login', [
    body('email', 'Please Enter a valid email').isEmail(),
    body('password', 'Please Enter a valid password').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether email already exist
        const { email, password } = req.body;

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Please input valid credintials" });
        }

        // Compare Secure password
        const passwordConpare = await bcrypt.compare(password, user.password);
        if (!passwordConpare) {
            return res.status(400).json({ error: "Please input valid credintials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch {
        console.log("Faild to connect to the database");
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route 3: Get Loged in user details using: POST "api/auth/getuser" . Doesn't require Auth , Login required
router.post('/getuser', fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-passowrd");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;