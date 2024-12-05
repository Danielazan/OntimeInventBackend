const {
    CreateDriverReg,
      GetAllDriverRegs,
      GetSingleDriverReg,
      UpdateDriverReg,
      DeleteDriverReg,
 } = require("../../../controllers/JusticePapperMill/SalesControllers/DriverReg")
const express = require("express")

const router = express.Router()

router.post('/jdriver',CreateDriverReg)

router.get("/jdriver", GetAllDriverRegs)

router.get("/jdriver/:id",GetSingleDriverReg)

router.put("/jdriver/:id",UpdateDriverReg)


router.delete("/jdriver/:id",DeleteDriverReg)





module.exports = router