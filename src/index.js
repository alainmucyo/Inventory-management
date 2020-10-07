import express from 'express'
import {database} from "./config/db"

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(express.static('storage'))

database.sync({force:true}).then(resp=>{
    app.listen(port, () => {
        console.log(`Server started at ${process.env.APP_URL}:${port}`)
    })
})
.catch(err=>{
    console.log("Can't sync",err)
})