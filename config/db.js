
const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('tiendamarroquineria', 'root' ,'',{
    host: 'localhost',
    dialect: 'mysql'
})

const connectDB = async() =>{
    try{
        await sequelize.authenticate()
        console.log ('Connected to database')
    } catch(err){
        console.error('error connecting to database', err)
    }
}

module.exports = {sequelize,connectDB}

//mysql://root:ZgRLiOLHVdlxTSKRKmpBbQbLLaBFDucA@roundhouse.proxy.rlwy.net:16284/railway

