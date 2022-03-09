import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'

// APP Config

const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:admin1@cluster0.6lmey.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middlewares

app.use(express.json())
app.use(Cors())

// DB config

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    index: true,
    // useCreateIndex: true 
    
})

//API Endpoints
app.get('/', (req, res) => res.status(200).send("Hello clevers programmers"))

app.post('/tinder/cards', (req,res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
});

app.get('/tinder/cards', (req,res) => {

    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
});


// Listener ad1

app.listen(port, ()=> console.log(`Listening on port ${port}`))