const {
    CreatePumpAttendants,
    GetAllPumpAttendants ,
    GetSinglePumpAttendants,
    DeletePumpAttendants,
    UpdatePumpAttendants
 } = require("../../../controllers/EfficientLPG/SalesControllers/PumpAttendant")
const express = require("express")

const router = express.Router()

router.post('/EpmpAttendants',CreatePumpAttendants)

router.get("/EpmpAttendants", GetAllPumpAttendants)

router.get("/EpmpAttendants/:id",GetSinglePumpAttendants)

router.put("/EpmpAttendants/:id",UpdatePumpAttendants)


router.delete("/EpmpAttendants/:id",DeletePumpAttendants)





module.exports = router