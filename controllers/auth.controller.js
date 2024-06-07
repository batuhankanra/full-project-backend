const bcrypt=require('bcrypt')
const prisma = require('../lib/prisma.js')

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
const login= (req,res)=>{
    //db operations
}
const logout= (req,res)=>{
    //db operations
}

module.exports={register,login,logout}