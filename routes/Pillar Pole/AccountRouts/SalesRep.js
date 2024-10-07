const {
    CreateSalesReps,
    GetAllSalesReps ,
    GetSingleSalesRep,
    DeleteSalesRep,
    UpdateSalesRep
 } = require("../../../controllers/Pillar Pole/AccountControllers/SalesRep")
const express = require("express")

const router = express.Router()

router.post('/salesrep',CreateSalesReps)

router.get("/salesrep", GetAllSalesReps)

router.get("/salesrep/:id",GetSingleSalesRep)

router.put("/salesrep/:id",UpdateSalesRep)


router.delete("/salesrep/:id",DeleteSalesRep)





module.exports = router