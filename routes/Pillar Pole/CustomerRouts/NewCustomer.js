const {
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer
 } = require("../../../controllers/Pillar Pole/CustomerController/NewCustomer")
const express = require("express")

const router = express.Router()

router.post('/customer',CreateCustomer)

router.get("/customer",GetAllCustomer)

router.get("/customer/:id",GetSingleCustomer)

router.put("/customer/:id",UpdateCustomer)


router.delete("/customer/:id",DeleteCustomer)





module.exports = router