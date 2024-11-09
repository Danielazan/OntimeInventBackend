const {
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer
 } = require("../../../controllers/JusticePapperMill/CustomerControllers/NewCustomer")
const express = require("express")

const router = express.Router()

router.post('/jcustomer',CreateCustomer)

router.get("/jcustomer",GetAllCustomer)

router.get("/jcustomer/:id",GetSingleCustomer)

router.put("/jcustomer/:id",UpdateCustomer)


router.delete("/jcustomer/:id",DeleteCustomer)





module.exports = router