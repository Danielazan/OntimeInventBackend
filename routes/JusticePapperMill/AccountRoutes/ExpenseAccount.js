const {
    CreateExpenseAccount,
    GetAllExpenseAccount,
    GetSingleNewExpenseAccount,
    UpdateNewExpenseAccount,
    DeleteNewExpenseAccount
 } = require("../../../controllers/JusticePapperMill/AccountControllers/ExpenseAccount")
const express = require("express")

const router = express.Router()

router.post('/jexpenseacc',CreateExpenseAccount)

router.get("/jexpenseacc", GetAllExpenseAccount)

router.get("/jexpenseacc/:id",GetSingleNewExpenseAccount)

router.put("/jexpenseacc/:id",UpdateNewExpenseAccount)

router.delete("/jexpenseacc/:id",DeleteNewExpenseAccount)





module.exports = router