const {
    CreateDeleteItem,
      GetAllDeleteItems,
      GetSingleDeleteItem,
      UpdateDeleteItem,
      DeleteDeleteItem,
 } = require("../../../controllers/JusticePapperMill/DeleteControllers/Deleted")
const express = require("express")

const router = express.Router()

router.post('/jdels',CreateDeleteItem)

router.get("/jdels", GetAllDeleteItems)

router.get("/jdels/:id",GetSingleDeleteItem)

router.put("/jdels/:id",UpdateDeleteItem)


router.delete("/jdels/:id",DeleteDeleteItem)





module.exports = router