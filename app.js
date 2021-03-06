const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan') 
const bodyParser = require('body-parser')
const passport = require('passport')
 // routers all
 const test = require('./routers/test')
const authRoutes = require('./routers/auth')
const analyticsRoutes = require('./routers/analytics')
const categoryRoutes = require('./routers/category')
const orderRoutes = require('./routers/order')
const positionRoutes = require('./routers/position')
const keys = require('./config/keys')
const app = express()
//
// база даних  mongoDB
mongoose.connect(keys.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
.then(()=> console.log('MongoDb connect'))
.catch(error=> console.log(error))

// passport.js 
app.use(passport.initialize())
require('./middleware/passport')(passport)

// cors что бы можно била от всюда взвать сервер
app.use(cors())

//morgan что бы увидеть просес запроса в коннсол
app.use(morgan('dev'))

// что бы файл статичиска нашли получать  доступ на примую с клента
app.use('/uploads',express.static('uploads'))

//body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api', test)
// router authRoutes
app.use('/api/auth', authRoutes)

// router analytics
app.use('/api/analytics', analyticsRoutes)

// router categoy
app.use('/api/category', categoryRoutes)

// router  order
app.use('/api/order', orderRoutes)

// router position
app.use('/api/position', positionRoutes)

module.exports = app