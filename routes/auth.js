const express = require("express");
const router = express.Router();
const bcrypt  = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async(req, res)=>{
    const {nombre, apellidos, ciudad, telefono, email, password}= req.body;

    try{
        let user = await User.findOne({where: {email}});
        if (user){
            return res.status(400).json({msg: "Usuario ya existe"})
        }
    

        const salt = await bcrypt.genSalt(10);
        const hashesPassword = await bcrypt.hash(password,salt)

        user = await User.create({
            nombre,
            apellidos,
            ciudad,
            telefono,
            email,
            password: hashesPassword
        })

        const payload = {
            user:{
            id: user.id
            }
        }

    

        jwt.sign(payload, 'secret', {expiresIn: 36000}, (err,token) =>{
            if(err) throw err;
            res.json({token})
        })       

    }catch (err){
        console.error(err.message);
        res.status(500).send("Error al registrar el usuario")
    }

})

router.post('/login', async(req, res)=>{
    const {email, password} =req.body;

    try{
        let user = await User.findOne({where:{email}})
        if(!user){
            return res.status(400).json({msg: "Usuario ya existe"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg: "Contraseña incorrecta"})
        }

        const payload = {
            user:{
            id: user.id
            }
        }
    
    
    
        jwt.sign(payload, 'secret', {expiresIn: 36000}, (err,token) =>{
            if(err) throw err;
            res.json({token})
        })       
    
    }catch (err){
        console.error(err.message);
        res.status(500).send("Error de servidor")
    }
    
})

module.exports = router
