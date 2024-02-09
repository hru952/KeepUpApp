const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { noteRouter } = require("./routes/noteRoutes")
//const {readdirSync} = require('fs')
const router = require("./routes/transactions")
require("dotenv").config()
const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/note",noteRouter)
app.use(router)
//readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get("/",(req,res)=>{

    res.send({
        message:"api is working now"
    })
})


app.listen(port,async()=>{

    try {
        await connection
        console.log("database is connected")
    } catch (error) {
        console.log(error)
    }


    console.log("Server is running on port number",port)

})