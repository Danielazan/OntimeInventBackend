const {
    CreateOperator,
    GetAllOperator,
    GetSingleNewOperator,
    UpdateNewOperator,
    DeleteNewOperator,
 } = require("../../../controllers/Pillar Pole/ProductionControllers/Operators")
const express = require("express")

const router = express.Router()

router.post('/operator',CreateOperator)

router.get("/operator", GetAllOperator)

router.get("/operator/:id",GetSingleNewOperator)

router.put("/operator/:id",UpdateNewOperator)

router.delete("/operator/:id",DeleteNewOperator)





module.exports = router