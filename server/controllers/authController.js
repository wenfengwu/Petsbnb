import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {email} = req.body;
    let emailExist = await User.findOne({email}).exec();
    console.log(emailExist);
    if(emailExist) return res.status(401).json("This Email has been registered");

    const user = new User(req.body)
    try{
        await user.save();
        console.log("User Created...", user);
        return res.json({status: true});
    }
    catch(err){
        console.log("Something went wrong on Creating user...", err)
        return res.status(400).json(err)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        //check if user with that email exist
        let user = await User.findOne({email}).exec();
        console.log("Found email user: ", user);
        //if not, send error
        if(!user) res.status(400).send("Wrong informations you entered");

        //if exist, compare password first
        user.passwordCompared(password, (err, match) => {
            console.log("Compare password error", err);
            if(!match || err) return res.status(400).send("Wrong informations(password) you entered");

            //Generate a token
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '3d'
            });

            res.json({token, 
                user:{
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
                },
            });

        });
    }
    catch (err) {
        console.log("Something wrong on login", err)
        res.status(400). send('Login Failed')
    }
}