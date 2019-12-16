const router = require("express").Router()
const User = require("../models/User")
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

router.post("/", function(req, res, next) {
  const { email, password, name, nickname, phone, address, zipcode } = req.body
  let user = new User()
  let body = {
    email: email,
    password: password,
    name: name,
    phone: phone,
    address: address,
    zipcode: zipcode
  }

  const options = {
    uri: apiUrl + '/', 
    method: 'POST',
    headers: {
      'Authorization': apiKey
    },
    json: true,
    body: body
  }

  request.post(options, function(err,response,body){ 
    
    let serviceBody = {
      userId: body.userId,
      serviceId: serviceId
    }

    const serviceOptions = {
      uri: apiUrl + '/service', 
      method: 'POST',
      headers: {
        'Authorization': apiKey
      },
      json: true,
      body: serviceBody
    }

    request.post(serviceOptions, function(err,response,body){});

    user.userId = body.userId
    user.nickname = nickname
    user
    .save()
    .then(function(user) {
      console.log(user)
      res.status(200).json({ userId: user._id })
    })
    .catch(err=> next(err))
  });
})

router.post("/login", function(req, res, next) {
  if(!req.body.email) {
    return res.status(422).send("Invalid parameters : email")
  }
  if(!req.body.password) {
    return res.status(422).send("Invalid parameters : password")
  }

  let body = {
    email: req.body.email,
    password: req.body.password
  }

  const options = {
    uri: apiUrl + '/login', 
    method: 'POST',
    headers: {
      'Authorization': apiKey
    },
    json: true,
    body: body
  }

  request.post(options, function(err,response,body){ 
    console.log('body: ', body)

    User.findOne({userId: body.uuid}).then(function(user){
      if (!user) { res.status(404).send("User does not exist.") }
      if (user) {
        return res.json({token: user.generateJWT()})
      }
    })
    .catch(err => {
      if(err.code) console.log(err.code)
      next(err)
    })
  })
})

router.post("/logout", checkAuthHeader, function(req, res, next) {
  if (req.header("Authorization")) { 
    console.log(req.header("Authorization"))
    // TODO: DEV: validate api key and respond success
    // res.status(204).end()
  }
  res.send("NTS: need to finish this route")
})

//TODO: process status(409).send('ID Already Exsist)
router.put("/modify/:userId", checkAuthHeader, quickFailNoReqBody, function(req, res, next) {
  if (req.params.userId == null) { next() }

      const { name, phone, address, zipcode } = req.body
      let body = {
        name: name,
        phone: phone,
        address: address,
        zipcode: zipcode
      }
    
      const options = {
        uri: apiUrl + '/modify/' + req.params.userId, 
        method: 'PUT',
        headers: {
          'Authorization': apiKey
        },
        json: true,
        body: body
      }
    
    
      request.put(options, function(err,response,body){ 
        console.log('22222')
        console.log('##2###err: ', err)
        console.log('body: ', body)
        
        return res.status(204).end()
      });

})

module.exports = router

