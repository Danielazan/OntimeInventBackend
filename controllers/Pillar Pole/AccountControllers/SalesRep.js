const { SalesRep } = require("../../../models/Pillar Pole/AccountsModels/SalesRep");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateSalesReps = async (req, res) => {
  

  const { SalesRepName } = req.body;

  try {

    const pro = await SalesRep.create({
        
        SalesRepName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllSalesReps = async (req, res) => {
  try {
    const Cat = await SalesRep.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleSalesRep = async(req,res)=>{
  const SalesRepId = req.params.id
  
  try {

    const Getone = await SalesRep.findOne({where: {id:SalesRepId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateSalesRep = async (req, res) => {
    const SalesRepid = req.params.id;
    
    const {SalesRepName,} = req.body;

  try {
    // Update the database with the new image path
    SalesRep.update(
      {
        SalesRepName
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



const DeleteSalesRep = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await SalesRep.destroy({
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
    CreateSalesReps,
    GetAllSalesReps ,
    GetSingleSalesRep,
    DeleteSalesRep,
    UpdateSalesRep
};
