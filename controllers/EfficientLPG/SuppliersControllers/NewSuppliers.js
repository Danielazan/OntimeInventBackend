const { EfficientNewSupplier } = require("../../../models/EfficientLPG/SuppliersModels/NewSuppliers");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


async function deleteTable() {
    try {
        await EfficientNewSupplier.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }

const CreateSupplier = async (req, res) => {
  

  const {
    Name,
    Address,
    PhoneNumber,
   

  } = req.body;

  try {

    const pro = await EfficientNewSupplier.create({
        Name,
        Address,
        PhoneNumber,
        
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllSupplier = async (req, res) => {
  try {
    const Cat = await EfficientNewSupplier.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleSupplier = async(req,res)=>{
  const SupplierId = req.params.id
  
  try {

    const Getone = await EfficientNewSupplier.findOne({where: {id:SupplierId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateSupplier = async (req, res) => {
    const Supplierid = req.params.id;
    
    const { Name,
        Address,
        PhoneNumber,
         } = req.body;

  try {
    // Update the database with the new image path
    EfficientNewSupplier.update(
      {
        Name,
        Address,
        PhoneNumber,
        
      },
      { where: { id: Supplierid } }
    )
      .then(() => {
        res.status(200).json({ message: "Record updated successfully" });
      })
      .catch((dbError) => {
        res.status(500).json({ error: dbError.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const DeleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await EfficientNewSupplier.destroy({
      where: { id },
      cascade: true,
    }).then((result) => {
      res.status(200).json({ message: "Record deleted successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    CreateSupplier,
    GetAllSupplier ,
    GetSingleSupplier,
    DeleteSupplier,
    UpdateSupplier
};
