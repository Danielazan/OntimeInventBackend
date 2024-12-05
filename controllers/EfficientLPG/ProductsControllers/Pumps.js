const { EPump } = require("../../../models/EfficientLPG/ProductModels/Pump");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreatePumps = async (req, res) => {
  

  const { PumpName } = req.body;

  try {

    const pro = await EPump.create({
        
        PumpName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllPumps = async (req, res) => {
  try {
    const Cat = await EPump.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSinglePump = async(req,res)=>{
  const PumpId = req.params.id
  
  try {

    const Getone = await EPump.findOne({where: {id:PumpId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdatePump = async (req, res) => {
    const Pumpid = req.params.id;
    
    const {PumpName} = req.body;

  try {
    // Update the database with the new image path
    EPump.update(
      {
        PumpName
      },
      { where: { id: Pumpid } }
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



const DeletePump = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await EPump.destroy({
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
    CreatePumps,
    GetAllPumps ,
    GetSinglePump,
    DeletePump,
    UpdatePump
};
