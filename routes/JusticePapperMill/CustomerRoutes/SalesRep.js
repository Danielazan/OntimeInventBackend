const {
    CreateSalesReps,
    GetAllSalesReps ,
    GetSingleSalesRep,
    DeleteSalesRep,
    UpdateSalesRep
 } = require("../../../controllers/JusticePapperMill/CustomerControllers/SalesRep")
const express = require("express")

const router = express.Router()

router.post('/jsalesrep',CreateSalesReps)

router.get("/jsalesrep", GetAllSalesReps)

router.get("/jsalesrep/:id",GetSingleSalesRep)

router.put("/jsalesrep/:id",UpdateSalesRep)


router.delete("/jsalesrep/:id",DeleteSalesRep)





module.exports = router