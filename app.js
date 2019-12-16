const mongoose = require("mongoose")
const express = require("express")
const path = require("path")
const logger = require("morgan")
const indexRouter = require("./routes/index")
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger.json")

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// can pass options object

mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useCreateIndex", true)
mongoose.set("debug", true)
mongoose.connect("mongodb+srv://phil:test123@cluster0-jze14.gcp.mongodb.net/test?retryWrites=true&w=majority")

// TODO: require moongoose models here before mounting router middleware
require("./models/User")

app.use(indexRouter)
//app.use(swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(function(err,req,res,next){
  if (err) console.log('ERROR logged below from middleware \n', err)
})

app.use(function(req, res, next) {
  let notFound = new Error("알려지지 않은 서버 오류")
  notFound.code = 500
  next(notFound)
})

app.listen("8080", () => console.log("listening"))
