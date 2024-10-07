const { Supplier } = require("../../../models/Pillar Pole/SupplierModels/NewSupplier");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


async function deleteTable() {
    try {
        await Supplier.drop();
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
    Credit,
    Debit

  } = req.body;

  try {

    const pro = await Supplier.create({
        Name,
        Address,
        PhoneNumber,
        Credit,
        Debit
        
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
    const Cat = await Supplier.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleSupplier = async(req,res)=>{
  const SupplierId = req.params.id
  
  try {

    const Getone = await Supplier.findOne({where: {id:SupplierId}}).then(result =>{
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
        Credit,
        Debit } = req.body;

  try {
    // Update the database with the new image path
    Supplier.update(
      {
        Name,
        Address,
        PhoneNumber,
        Credit,
        Debit
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
    
    const Cat = await Supplier.destroy({
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
