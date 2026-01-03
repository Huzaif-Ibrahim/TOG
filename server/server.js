import express from 'express'
import userRoutes from './routes/userRoutes.js'
const app = express()

app.use('/api/user', userRoutes)

app.use('/', (req,res) => {
    res.send('API is working')
})


app.listen(3000, () => {
    console.log('App is listening to requests on port 3000')
})