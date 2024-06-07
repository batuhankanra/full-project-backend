const bcrypt=require('bcrypt')
const prisma = require('../lib/prisma.js')
const jwt=require('jsonwebtoken')

const register=async (req,res)=>{
    const {username,email,password}=req.body
    try{
        //hash the password
        const hashPassword= await bcrypt.hash(password,10)
        
        // create a new user and save to db
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password:hashPassword,
            }
        })
        console.log(newUser)
        res.status(201).json({message:"User created successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Failed to Created User"})
    }
}
const login= async(req,res)=>{
    const {username,password}=req.body;

    try{
        //Check if the user exits
        const user = await prisma.user.findUnique({
            where:{username}
        })
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(404).json({message:"password not found"})
        }


        //Generate cookie token and send to the user
        //res.setHeader("Set-Cookie","test="+"myValue").json({message:"success"})
        const age=1000*60*60*24*7
        const token =jwt.sign({
            id:user.id
        },process.env.JWT_SECRET_KEY,
        {expiresIn:age}
        )
        res.cookie('test2',token,{
            httpOnly:true,
            //secure:true,
            maxAge:age
        }).status(200).json({message:"login successful"})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to login!"})
    }

}
const logout= (req,res)=>{
    res.clearCookie("token").status(200).json({message:"logout successful"})
}

module.exports={register,login,logout}