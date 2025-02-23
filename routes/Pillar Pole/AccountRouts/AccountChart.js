const {
    CreateAccountCharts,
  GetAllAccountCharts,
  GetSingleAccountChart,
  DeleteAccountChart,
  UpdateAccountChart,
  UpdateAccountByPayment,
  UpdateAccountByExpenses,
  UpdateAccountByTransfer
 } = require("../../../controllers/Pillar Pole/AccountControllers/AccountChart")
const express = require("express")

const router = express.Router()

router.post('/accChart',CreateAccountCharts)

router.get("/accChart", GetAllAccountCharts)

router.get("/accChart/:id",GetSingleAccountChart)

router.put("/accChart/:id",UpdateAccountChart)

router.put("/accChartPay/:AccName",UpdateAccountByPayment)

router.put("/accChartEx/:AccName",UpdateAccountByExpenses)

router.post("/accCharTrans",UpdateAccountByTransfer)

router.delete("/accChart/:id",DeleteAccountChart)





module.exports = router