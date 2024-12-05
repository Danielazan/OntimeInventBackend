const {
    CreatePumps,
    GetAllPumps ,
    GetSinglePump,
    DeletePump,
    UpdatePump
 } = require("../../../controllers/EfficientLPG/ProductsControllers/Pumps")
const express = require("express")

const router = express.Router()

router.post('/Epumps',CreatePumps)

router.get("/Epumps", GetAllPumps)

router.get("/Epumps/:id",GetSinglePump)

router.put("/Epumps/:id",UpdatePump)


router.delete("/Epumps/:id",DeletePump)





module.exports = router