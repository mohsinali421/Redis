const express = require("express")
const app = express()

const Redis = require('ioredis');
const redis = new Redis(); // Connect to localhost:6379

app.use(express.json())

app.post("/", async (req,res) => {
    let { key, value } = req.body
    await redis.set(key, value)
    res.json("Set the data")
})
app.get("/:key", async (req,res) => {
    res.json(await redis.get(req.params.key))
})
app.delete("/:key", async (req,res) => {
    await redis.del(req.params.key)
    res.json("deleted")
})
app.listen(3000, () => {
    console.log("Server started at 3000....");
    console.log("GET http://localhost:3000/mykey");
    console.log("POST http://localhost:3000/mykey");
    console.log("DELETE http://localhost:3000/mykey");
})