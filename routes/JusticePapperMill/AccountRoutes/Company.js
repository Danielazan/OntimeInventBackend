const {
    CreateCompanys,
    GetAllCompanys ,
    GetSingleCompany,
    DeleteCompany,
    UpdateCompany
 } = require("../../../controllers/JusticePapperMill/AccountControllers/Company")
const express = require("express")

const router = express.Router()

router.post('/jcompany',CreateCompanys)

router.get("/jcompany", GetAllCompanys)

router.get("/jcompany/:id",GetSingleCompany)

router.put("/jcompany/:id",UpdateCompany)


router.delete("/jcompany/:id",DeleteCompany)





module.exports = router