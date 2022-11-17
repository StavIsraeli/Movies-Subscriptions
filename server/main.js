const express = require('express')
const userRouter = require('./routers/userRouter')
const movieRouter = require('./routers/movieRouter')
const subscriptionRouter = require('./routers/subscriptionRouter')
const memberRouter = require('./routers/memberRouter')

const cors = require('cors')


let app= express();
app.use(cors())
app.use(express.json());
require('./configs/database')
app.use('/api/user',userRouter)
app.use('/api/movie',movieRouter)
app.use('/api/subscription',subscriptionRouter)
app.use('/api/member',memberRouter)


app.listen(8000); 

