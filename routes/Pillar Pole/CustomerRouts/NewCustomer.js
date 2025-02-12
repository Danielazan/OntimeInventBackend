const {
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer,
    UpdateCustomerByPayment,
    GetSingleCustomerByName,
    UpdateCustomerBySales
 } = require("../../../controllers/Pillar Pole/CustomerController/NewCustomer")
const express = require("express")

const router = express.Router()

router.post('/customer',CreateCustomer)

router.get("/customer",GetAllCustomer)

router.get("/customer/:id",GetSingleCustomer)

router.get("/customerN/:CusName",GetSingleCustomerByName)

router.put("/customer/:id",UpdateCustomer)

router.put("/customerByVo/:CusName",UpdateCustomerByPayment)

router.put("/customerBySales/:CusName",UpdateCustomerBySales)

router.delete("/customer/:id",DeleteCustomer)





module.exports = router