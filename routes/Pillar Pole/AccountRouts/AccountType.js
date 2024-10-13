const {
    CreateAccountTypes,
    GetAllAccountTypes ,
    GetSingleAccountType,
    DeleteAccountType,
    UpdateAccountType
 } = require("../../../controllers/Pillar Pole/AccountControllers/AccountType")
const express = require("express")

const router = express.Router()

router.post('/Acctypes',CreateAccountTypes)

router.get("/Acctypes", GetAllAccountTypes)

router.get("/Acctypes/:id",GetSingleAccountType)

router.put("/Acctypes/:id",UpdateAccountType)


router.delete("/Acctypes/:id",DeleteAccountType)





module.exports = router