const {
    CreateRecycle,
      GetAllRecycles,
      GetSingleRecycle,
      UpdateRecycle,
      DeleteRecycle,
 } = require("../../../controllers/Pillar Pole/ProductionControllers/Recycle")
const express = require("express")

const router = express.Router()

router.post('/recycle',CreateRecycle)

router.get("/recycle", GetAllRecycles)

router.get("/recycle/:id",GetSingleRecycle)

router.put("/recycle/:id",UpdateRecycle)


router.delete("/recycle/:id",DeleteRecycle)





module.exports = router