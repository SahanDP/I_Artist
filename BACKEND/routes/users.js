const router = require("express").Router();
let User = require("../models/User"); //must be User.js 

//using post method we can insert data to the database
router.route("/add").post((req,res) =>{

    const name = req.body.name;
    const mobile = Number(req.body.mobile);
    const email = req.body.email; 

    const newUser = new User({
        name,
        mobile,
        email
    });

    //passing the created object to the database through the model
    newUser.save().then(() =>{
        res.json("User added")
    }).catch((err) =>{
        console.log(err);
    })

});

router.route("/").get((req,res) =>{
    User.find().then((users) =>{
        req.json(users)
    }).catch((err) =>{
        console.log(err);
    })
});

//find user that we want to update by id

router.route("/update/:id").put(async (req, res) =>{
    let userId = req.params.id;
    const {name, mobile, email} = req.body;

    //update(creating the object)
    const updateUser = {
        name,
        mobile,
        gender
    }

    const update = await User.findByIdAndUpdate(userId, updateUser).then(() =>{
        res.status(200).send({status: "User updated", user:update})
    }).catch((err) =>{
        console.log(err);
        req.status(500).send({status: "Error with updating data", error: err.message});
    })
});

//delete user

router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await User.findByIdAndDelete(userId).then(() =>{
        res.sendStatus(200).send({status: "User deleted"});
    }).catch((err) =>{
        console.log(err.message);
        req.status(500).send({status: "Error with delete user", error: err.message});
    })
});


module.exports = router;


