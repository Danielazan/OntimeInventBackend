const { ECustomer } = require("../../../models/EfficientLPG/CustomerModels/NewCustomer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateCustomer = async (req, res) => {
  

  const {
    Name,
      Address,
      PhoneNumber,
      CreditLimit,
      OpeningBalCredit,
      OpeningBalDebit,
      
  } = req.body;

  try {

    const pro = await ECustomer.create({
        Name,
      Address,
      PhoneNumber,
      CreditLimit,
      OpeningBalCredit,
      OpeningBalDebit,
      
        
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllCustomer = async (req, res) => {
  try {
    const Cat = await ECustomer.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleCustomer = async(req,res)=>{
  const CustomerId = req.params.id
  
  try {

    const Getone = await ECustomer.findOne({where: {id:CustomerId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateCustomer = async (req, res) => {
    const Customerid = req.params.id;
    
    const {Name,
        Address,
        PhoneNumber,
        CreditLimit,
        OpeningBalCredit,
        OpeningBalDebit} = req.body;

  try {
    // Update the database with the new image path
    ECustomer.update(
      {
        Name,
      Address,
      PhoneNumber,
      CreditLimit,
      OpeningBalCredit,
      OpeningBalDebit,
      
      },
      { where: { id: Customerid } }
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



const DeleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await ECustomer.destroy({
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
    CreateCustomer,
    GetAllCustomer ,
    GetSingleCustomer,
    DeleteCustomer,
    UpdateCustomer
};
