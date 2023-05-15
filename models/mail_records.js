const mongoose = require("mongoose")

const record_schema = mongoose.Schema({
    url: String,
    headers: Object,
    cookies: Object,
    IP: String,
    Ips: String,
}, { timestamp: true })

module.exports = mongoose.model("record", record_schema)