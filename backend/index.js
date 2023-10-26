const express  = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', function(req, res) {
    return res.json([
        { name: 'Alexandre'},
        { name: 'Carlos'}
    ])
})
app.listen(4567)