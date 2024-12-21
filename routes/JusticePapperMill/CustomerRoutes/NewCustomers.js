const {
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer,
    UpdateCustomerByPayment,
    GetSingleCustomerByName,
    UpdateCustomerBySales
 } = require("../../../controllers/JusticePapperMill/CustomerControllers/NewCustomer")
const express = require("express")

const router = express.Router()

router.post('/jcustomer',CreateCustomer)

router.get("/jcustomer",GetAllCustomer)

router.get("/jcustomer/:id",GetSingleCustomer)

router.get("/jcustomerN/:CusName",GetSingleCustomerByName)

router.put("/jcustomer/:id",UpdateCustomer)

router.put("/jcustomerByVo/:CusName",UpdateCustomerByPayment)

router.put("/jcustomerBySales/:CusName",UpdateCustomerBySales)

router.delete("/jcustomer/:id",DeleteCustomer)





module.exports = router