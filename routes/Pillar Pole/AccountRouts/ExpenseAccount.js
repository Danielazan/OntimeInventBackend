const {
    CreateExpenseAccount,
    GetAllExpenseAccount,
    GetSingleNewExpenseAccount,
    UpdateNewExpenseAccount,
    DeleteNewExpenseAccount
 } = require("../../../controllers/Pillar Pole/AccountControllers/ExpenseAccount")
const express = require("express")

const router = express.Router()

router.post('/expenseacc',CreateExpenseAccount)

router.get("/expenseacc", GetAllExpenseAccount)

router.get("/expenseacc/:id",GetSingleNewExpenseAccount)

router.put("/expenseacc/:id",UpdateNewExpenseAccount)

router.delete("/expenseacc/:id",DeleteNewExpenseAccount)





module.exports = router