import express from 'express'
const app = express()

app.use('/', (req,res) => {
    res.send('API is working')
})

app.listen(3000, () => {
    console.log('App is listening to requests on port 3000')
})