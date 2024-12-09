const {
    CreatePostBill,
      GetAllPostBills,
      GetSinglePostBill,
      UpdatePostBill,
      DeletePostBill,
 } = require("../../../controllers/JusticePapperMill/AccountControllers/PostBill")
const express = require("express")

const router = express.Router()

router.post('/jpostbill',CreatePostBill)

router.get("/jpostbill", GetAllPostBills)

router.get("/jpostbill/:id",GetSinglePostBill)

router.put("/jpostbill/:id",UpdatePostBill)


router.delete("/jpostbill/:id",DeletePostBill)





module.exports = router