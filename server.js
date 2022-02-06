const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({}))

/* app.set('view engine', 'ejs') */

app.get('/', (req, res) => {
    /* res.render('index', { text: 'NAZDAR' }) ← This with ejs is similar to PHP  */
    res.sendStatus(200)
})

const occupiedRouter = require('./routes/occupied')

app.use('/occupied', occupiedRouter)

app.listen(4000)