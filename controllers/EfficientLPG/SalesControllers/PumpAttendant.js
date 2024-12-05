const { EPumpAttendants } = require("../../../models/EfficientLPG/SalesModels/PumpAttendants");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreatePumpAttendants = async (req, res) => {
  

  const { PumpAttendantName } = req.body;

  try {

    const pro = await EPumpAttendants.create({
        
        PumpAttendantName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllPumpAttendants = async (req, res) => {
  try {
    const Cat = await EPumpAttendants.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSinglePumpAttendants = async(req,res)=>{
  const MachineId = req.params.id
  
  try {

    const Getone = await EPumpAttendants.findOne({where: {id:MachineId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdatePumpAttendants = async (req, res) => {
    const PumpAttendantid = req.params.id;
    
    const {PumpAttendantName} = req.body;

  try {
    // Update the database with the new image path
    EPumpAttendants.update(
      {
        PumpAttendantName
      },
      { where: { id: PumpAttendantid } }
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



const DeletePumpAttendants= async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await EPumpAttendants.destroy({
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
    CreatePumpAttendants,
    GetAllPumpAttendants ,
    GetSinglePumpAttendants,
    DeletePumpAttendants,
    UpdatePumpAttendants
};
