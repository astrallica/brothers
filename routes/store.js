const router = require("express").Router()
const User = require("../models/User")
const Avartar = require("../models/Avartar")
const Inventory = require("../models/Inventory")
const auth = require("../middleware/auth")
const ObjectId = require("mongoose").Types.ObjectId
const { apiUrl, apiKey, serviceId } = require("../config")
const request = require("request")

// write route handlers here
const quickFailNoReqBody = function (req,res,next) {
  if (Object.keys(req.body).length <= 0) {
    throw new Error
  }
  next()
}

const quickFailNoParams = function (req,res,next) {
  if (Object.keys(req.params).length <= 0) {
    return res.status(422).send('Invalid parameters : parameter is required')
  }
  next()
}

const checkAuthHeader = function(req,res,next) {
  if (!req.header("Authorization")) { res.status(401).end() }
  else { next() }
}

router.post("/purchase/dia", function(req, res, next) {
  const { userId, amount } = req.body
  let user = new User()
  let body = {
    userId: userId,
    serviceId: serviceId,
    amount: amount
  }

  const options = {
    uri: apiUrl + '/transaction/deposit', 
    method: 'POST',
    headers: {
      'Authorization': apiKey
    },
    json: true,
    body: body
  }

  request.post(options, function(err,response,body){ 
    user.dia = user.dia + amount
    user
    .save()
    .then(function(user) {
      console.log(user)
      res.status(204).end()
    })
    .catch(err=> next(err))
  });
})

router.post("/purchase/item", function(req, res, next) {
    res.status(204).end()
})

router.post("/purchase/hero", function(req, res, next) {
    res.status(204).end()
})

router.get("/transaction", function(req, res, next) {
    res.status(204).end()
})


module.exports = router

