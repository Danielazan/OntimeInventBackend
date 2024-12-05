const {
    CreateReciptVocher,
      GetAllReciptVochers,
      GetSingleReciptVocher,
      UpdateReciptVocher,
      DeleteReciptVocher,
 } = require("../../../controllers/JusticePapperMill/SalesControllers/ReciptVocher")
const express = require("express")

const router = express.Router()

router.post('/jRecipitV',CreateReciptVocher)

router.get("/jRecipitV", GetAllReciptVochers)

router.get("/jRecipitV/:id",GetSingleReciptVocher)

router.put("/jRecipitV/:id",UpdateReciptVocher)


router.delete("/jRecipitV/:id",DeleteReciptVocher)





module.exports = router