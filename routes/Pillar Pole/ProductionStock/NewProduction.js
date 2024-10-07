const {
    CreateNewProduction,
    GetAllNewProductions,
    GetSingleNewProduction,
    UpdateNewProduction,
    DeleteNewProduction,
 } = require("../../../controllers/Pillar Pole/ProductionControllers/NewProduction")
const express = require("express")

const router = express.Router()

router.post('/newpro',CreateNewProduction)

router.get("/newpro", GetAllNewProductions)

router.get("/newpro/:id",GetSingleNewProduction)

router.put("/newpro/:id",UpdateNewProduction)

router.delete("/newpro/:id",DeleteNewProduction)





module.exports = router