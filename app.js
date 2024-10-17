const express = require("express")
const app = express()

const Redis = require('ioredis');
const redis = new Redis(); // Connect to localhost:6379

app.use(express.json())

app.get("/", (req,res) => {
    res.json("Hello")
})
app.post("/:key", async (req,res) => {
    let { data } = req.body
    await redis.set('mykey', 'Hello, Redis!')
    res.json("Set the data")
})
app.get("/:key", async (req,res) => {
    res.json(await redis.get('mykey'))
})
app.delete("/:key", async (req,res) => {
    await redis.del("mykey")
    res.json("deleted")
})
app.listen(3000, () => {
    console.log("Server started at 3000....");
    console.log("GET http://localhost:3000/mykey");
    console.log("POST http://localhost:3000/mykey");
    console.log("DELETE http://localhost:3000/mykey");
})