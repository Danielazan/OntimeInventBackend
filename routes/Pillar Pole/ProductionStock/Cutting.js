const {
    CreateCutting,
    GetAllCuttings,
    GetSingleCutting,
    UpdateCutting,
    DeleteCutting,
 } = require("../../../controllers/Pillar Pole/ProductionControllers/Cutting")
const express = require("express")

const router = express.Router()

router.post('/cutting',CreateCutting)

router.get("/cutting", GetAllCuttings)

router.get("/cutting/:id",GetSingleCutting)

router.put("/cutting/:id",UpdateCutting)

router.delete("/cutting/:id",DeleteCutting)





module.exports = router