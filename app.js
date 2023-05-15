const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const Record = require("./models/mail_records")
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

const connect = () => {
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log("connected to database"))
        .catch((err) => {
            throw new Error(err)
        })
}

app.use(async (req, res) => {
    try {
        const record = Record({
            url: req.url,
            headers: req.headers,
            cookies: JSON.stringify(req.cookies),
            IP: req.ip,
            Ips: JSON.stringify(req.ips),
        })
        await record.save()
        res.sendFile(__dirname + "/invisible.png")
    } catch (error) {
        res.status(404).send("not found")
    }
})

app.listen(PORT, () => {
    connect()
    console.log("server started!")
})