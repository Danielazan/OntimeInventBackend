const { ECusDeposit } = require("../../../models/EfficientLPG/CustomerModels/Deposit");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreatECusDeposit = async (req, res) => {
  

  const { ProductName,
        UnitPrice,
        CustomerName,
        Date,
        AmountDeposited,
        Location,
        ReceiptNumber, } = req.body;

  try {

    const pro = await ECusDeposit.create({
        
        ProductName,
        UnitPrice,
        CustomerName,
        Date,
        AmountDeposited,
        Location,
        ReceiptNumber,
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllDeposit = async (req, res) => {
  try {
    const Cat = await ECusDeposit.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSinglECusDeposit = async(req,res)=>{
  const SalesRepId = req.params.id
  
  try {

    const Getone = await ECusDeposit.findOne({where: {id:SalesRepId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdatECusDeposit = async (req, res) => {
    const SalesRepid = req.params.id;
    
    const {
        ProductName,
        UnitPrice,
        CustomerName,
        Date,
        AmountDeposited,
        Location,
        ReceiptNumber,
    } = req.body;

  try {
    // Update the database with the new image path
    ECusDeposit.update(
      {
        ProductName,
        UnitPrice,
        CustomerName,
        Date,
        AmountDeposited,
        Location,
        ReceiptNumber,
      },
      { where: { id: SalesRepid } }
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



const DeletECusDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await ECusDeposit.destroy({
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
    CreatECusDeposit,
    GetAllDeposit ,
    GetSinglECusDeposit,
    DeletECusDeposit,
    UpdatECusDeposit
};
