const {
    CreatePrinting,
      GetAllPrintings,
      GetSinglePrinting,
      UpdatePrinting,
      DeletePrinting,
 } = require("../../../controllers/Pillar Pole/ProductionControllers/Printing")
const express = require("express")

const router = express.Router()

router.post('/printing',CreatePrinting)

router.get("/printing", GetAllPrintings)

router.get("/printing/:id",GetSinglePrinting)

router.put("/printing/:id",UpdatePrinting)


router.delete("/printing/:id",DeletePrinting)





module.exports = router