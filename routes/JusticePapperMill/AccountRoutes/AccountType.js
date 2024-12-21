const {
    CreateAccountTypes,
    GetAllAccountTypes ,
    GetSingleAccountType,
    DeleteAccountType,
    UpdateAccountType
 } = require("../../../controllers/JusticePapperMill/AccountControllers/AccountType")
const express = require("express")

const router = express.Router()

router.post('/jAcctypes',CreateAccountTypes)

router.get("/jAcctypes", GetAllAccountTypes)

router.get("/jAcctypes/:id",GetSingleAccountType)

router.put("/jAcctypes/:id",UpdateAccountType)


router.delete("/jAcctypes/:id",DeleteAccountType)





module.exports = router