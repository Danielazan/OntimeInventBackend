const {
    CreateFile,
  upload,
  GetAllFile,
  UpdateFile,
  DeleteFile
    
} = require("../../controllers/FileControllers/File")
const express = require("express")

const router = express.Router()

router.post('/Createfile',upload.single('update'), CreateFile)


router.get('/getfile', GetAllFile)



// router.put("/ProQtySales/:Name", UpdateFile)

// router.put("/productsimg",upload.single('image'), UpdateproductImage)



// router.delete("/products/:id",DeleteFile)



module.exports = router