const {
    CreateCompanys,
    GetAllCompanys ,
    GetSingleCompany,
    DeleteCompany,
    UpdateCompany
 } = require("../../../controllers/Pillar Pole/AccountControllers/Company")
const express = require("express")

const router = express.Router()

router.post('/company',CreateCompanys)

router.get("/company", GetAllCompanys)

router.get("/company/:id",GetSingleCompany)

router.put("/company/:id",UpdateCompany)


router.delete("/company/:id",DeleteCompany)





module.exports = router