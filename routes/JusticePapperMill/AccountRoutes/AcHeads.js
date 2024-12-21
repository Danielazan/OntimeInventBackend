const {
    CreateAcHeadss,
    GetAllAcHeadss ,
    GetSingleAcHeads,
    DeleteAcHeads,
    UpdateAcHeads
 } = require("../../../controllers/JusticePapperMill/AccountControllers/Acheads")
const express = require("express")

const router = express.Router()

router.post('/jacheads',CreateAcHeadss)

router.get("/jacheads", GetAllAcHeadss)

router.get("/jacheads/:id",GetSingleAcHeads)

router.put("/jacheads/:id",UpdateAcHeads)


router.delete("/jacheads/:id",DeleteAcHeads)





module.exports = router