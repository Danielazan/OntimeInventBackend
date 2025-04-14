const {
    CreatePumps,
    CreateLocation,
    GetAllPumps ,
    GetSinglePump,
    DeletePump,
    UpdatePump,
    GetAllLocatoins,
    UpdatePumpSales
 } = require("../../../controllers/EfficientLPG/ProductsControllers/Pumps")
const express = require("express")

const router = express.Router()

router.post('/Epumps',CreatePumps)

router.post('/ELocation',CreateLocation)

router.get("/Epumps", GetAllPumps)

router.get('/ELocation',GetAllLocatoins)

router.get("/Epumps/:id",GetSinglePump)

router.put("/Epumps/:id",UpdatePump)

router.put("/Epumpsales/:Name",UpdatePumpSales)

router.delete("/Epumps/:id",DeletePump)





module.exports = router