const {
    CreatePostBill,
      GetAllPostBills,
      GetSinglePostBill,
      UpdatePostBill,
      DeletePostBill,
 } = require("../../../controllers/Pillar Pole/AccountControllers/PostBills")
const express = require("express")

const router = express.Router()

router.post('/postbill',CreatePostBill)

router.get("/postbill", GetAllPostBills)

router.get("/postbill/:id",GetSinglePostBill)

router.put("/postbill/:id",UpdatePostBill)


router.delete("/postbill/:id",DeletePostBill)





module.exports = router