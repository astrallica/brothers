const router = require("express").Router()

router.use("/user", require("./users"))
router.use("/store", require("./store"))

module.exports = router
