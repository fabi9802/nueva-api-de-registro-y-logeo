const express = require("express")
const {connectDB}= require ('./config/db');
const bodyParser = require ('body-parser')
const cors = require ('cors')
require('dotenv').config()
const path = require('path')

const app = express()

connectDB() 

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname,'public')))

//app.get('/'(req, res)=>{
   // res.sendFile(path.join(__dirname,'public', 'index.html'))
//})

app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, async() =>{
    console.log(`Server is running on port ${PORT}`  )
    const {sequelize} = require('./config/db')
    try{
        await sequelize.sync()
        console.log('Database synced')
    } catch(err){
        console.error('Error base de datos', err)
    }

})