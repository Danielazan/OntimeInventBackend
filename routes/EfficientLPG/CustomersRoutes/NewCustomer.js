const {
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer
 } = require("../../../controllers/EfficientLPG/CustomerControllers/NewCustomers")
const express = require("express")

const router = express.Router()

router.post('/ecustomer',CreateCustomer)

router.get("/ecustomer",GetAllCustomer)

router.get("/ecustomer/:id",GetSingleCustomer)

router.put("/ecustomer/:id",UpdateCustomer)


router.delete("/ecustomer/:id",DeleteCustomer)





module.exports = router