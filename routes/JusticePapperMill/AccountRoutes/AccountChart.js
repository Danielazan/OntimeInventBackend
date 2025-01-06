const {
    CreateAccountCharts,
  GetAllAccountCharts,
  GetSingleAccountChart,
  DeleteAccountChart,
  UpdateAccountChart,
  UpdateAccountByPayment,
  UpdateAccountByExpenses
 } = require("../../../controllers/JusticePapperMill/AccountControllers/AccountChart")
const express = require("express")

const router = express.Router()

router.post('/jaccChart',CreateAccountCharts)

router.get("/jaccChart", GetAllAccountCharts)

router.get("/jaccChart/:id",GetSingleAccountChart)

router.put("/jaccChart/:id",UpdateAccountChart)

router.put("/jaccChartPayment/:AccName",UpdateAccountByPayment)

router.put("/jaccChartExpenses/:AccName",UpdateAccountByExpenses)

router.delete("/jaccChart/:id",DeleteAccountChart)





module.exports = router