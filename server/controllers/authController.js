const User = require('../models/user')
const StoreOwner = require('../models/storeOwnerModel');
const StoreModel = require('../models/storeModel');
const Product = require('../models/productModel');
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working') 
}


//Register Endpoint
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //Check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        //Check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        }
        //Check email
        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)
        //Create a user in database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}


// Register Store Owner Endpoint
const registerStoreOwner = async (req, res) => {
    try {
        const { name, storeName, email, password, contact, location, ethnicCategory } = req.body;

        // Check if all required fields are provided
        if (!name || !storeName || !email || !password || !ethnicCategory) {
            return res.status(400).json({ error: 'Name, storeName, email, password, and ethnicCategory are required' });
        }

        // Check if store owner already exists
        const exist = await StoreOwner.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new store owner
        const storeOwner = await StoreOwner.create({
            name,
            storeName,
            email,
            password: hashedPassword
        });

        // Automatically create a store for the store owner
        const newStore = await StoreModel.create({ name: storeName, contact, location, ethnicCategory });

        res.status(201).json({ storeOwner, newStore });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Login Endpoint
const loginUser = async (req, res) => {
    try {
       const { email, password } = req.body;
       
       // Check if user exists in the User collection
       const user = await User.findOne({ email });
       if (user) {
           // If user is found in the User collection, check if passwords match
           const match = await comparePassword(password, user.password);
           if (match) {
               // If passwords match, generate JWT token and send user data
               jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                   if (err) throw err;
                   res.cookie('token', token).json({ user, isStoreOwner: false });
               });
           } else {
               // If passwords do not match, send error message
               res.json({ error: 'Invalid email or password' });
           }
       } else {
           // If user is not found in the User collection, check the StoreOwner collection
           const storeOwner = await StoreOwner.findOne({ email });
           if (storeOwner) {
               // If store owner is found, check if passwords match
               const match = await comparePassword(password, storeOwner.password);
               if (match) {
                   // If passwords match, generate JWT token and send store owner data
                   jwt.sign({ email: storeOwner.email, id: storeOwner._id, name: storeOwner.name }, process.env.JWT_SECRET, {}, (err, token) => {
                       if (err) throw err;
                       res.cookie('token', token).json({ user: storeOwner, isStoreOwner: true });
                   });
               } else {
                   // If passwords do not match, send error message
                   res.json({ error: 'Invalid email or password' });
               }
           } else {
               // If user is not found in both collections, send error message
               res.json({ error: 'Invalid email or password' });
           }
       }
    } catch (error) {
       console.error("Login error:", error);
       res.status(500).json({ error: 'Server error' });
    }
   }
   

// Logout Endpoint
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
}

// Get User Profile
const getProfile =(req, res) => {
const{token} = req.cookies
if(token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
    })
} else {
    res.json(null)
}
}

// Function to get store owner profile
const getStoreOwnerProfile = async (req, res) => {
    try {
        const token = req.cookies.token; // Retrieve token from cookies
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' }); // No token found, return 401 Unauthorized
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const { email } = decoded; // Extract email from decoded token
        const storeOwner = await StoreOwner.findOne({ email }); // Find store owner based on email

        if (storeOwner) {
            res.json(storeOwner); // Send store owner profile if found
        } else {
            res.status(404).json({ error: 'Store owner not found' }); // Store owner not found
        }
    } catch (error) {
        console.error('Error fetching store owner profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Function to create a store
const createStore = async (req, res) => {
    try {
        const { name, contact, location, ethnicCategory } = req.body;
        // Create the store in the database
        const newStore = await StoreModel.create({ name, contact, location, ethnicCategory });
        res.status(201).json(newStore);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Function to add product to store
const addProductToStore = async (req, res) => {
    try {
        const { name, price } = req.body;
        const storeName = req.body.storeName; // Extract storeName from request body

        // Check if all required fields are provided
        if (!name || !price || !storeName) {
            return res.status(400).json({ error: 'Name, price, and storeName are required' });
        }

        // Create a new product in the database and associate it with the store
        const product = await Product.create({
            name,
            price,
            storeName
        });

        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product to store:', error);
        res.status(500).json({ error: 'Server error' });
    }
};



module.exports = {
    test,
    registerUser,
    registerStoreOwner,
    loginUser,
    logoutUser,
    getProfile,
    getStoreOwnerProfile,
    createStore,
    addProductToStore
};