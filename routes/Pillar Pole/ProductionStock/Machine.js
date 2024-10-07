const {
    CreateMachines,
    GetAllMachines ,
    GetSingleMachine,
    DeleteMachine,
    UpdateMachine
 } = require("../../../controllers/Pillar Pole/ProductionControllers/Machines")
const express = require("express")

const router = express.Router()

router.post('/machines',CreateMachines)

router.get("/machines", GetAllMachines)

router.get("/machines/:id",GetSingleMachine)

router.put("/machines/:id",UpdateMachine)


router.delete("/machines/:id",DeleteMachine)





module.exports = router