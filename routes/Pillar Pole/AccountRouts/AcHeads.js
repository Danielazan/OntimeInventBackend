const {
    CreateAcHeadss,
    GetAllAcHeadss ,
    GetSingleAcHeads,
    DeleteAcHeads,
    UpdateAcHeads
 } = require("../../../controllers/Pillar Pole/AccountControllers/AcHeads")
const express = require("express")

const router = express.Router()

router.post('A',CreateAcHeadss)

router.get("/acheads", GetAllAcHeadss)

router.get("/acheads/:id",GetSingleAcHeads)

router.put("/acheads/:id",UpdateAcHeads)


router.delete("/acheads/:id",DeleteAcHeads)





module.exports = router