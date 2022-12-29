const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT||3000;

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'public/index.html'))
})

app.get('/bubble', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/bubble/bubble.html'))
})

app.get('/insert', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/insert/insert.html'))
})

app.get('/merge', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/merge/merge.html'))
})

app.get('/selection', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/selection/selection.html'))
})

app.get('/radix', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/radix/radix.html'))
})

app.get('/quick', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/quick/quick.html'))
})

app.listen(port, function(err) {
    if(err){
        console.log("Listening Error")
    }
    console.log("Listening on", port)
})