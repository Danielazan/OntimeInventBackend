const { Machine } = require("../../../models/Pillar Pole/ProductionModels/Machines");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateMachines = async (req, res) => {
  

  const { MachineName } = req.body;

  try {

    const pro = await Machine.create({
        
        MachineName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllMachines = async (req, res) => {
  try {
    const Cat = await Machine.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleMachine = async(req,res)=>{
  const MachineId = req.params.id
  
  try {

    const Getone = await Machine.findOne({where: {id:MachineId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateMachine = async (req, res) => {
    const Machineid = req.params.id;
    
    const {MachineName,} = req.body;

  try {
    // Update the database with the new image path
    Machine.update(
      {
        MachineName
      },
      { where: { id: Machineid } }
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



const DeleteMachine = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await Machine.destroy({
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
    CreateMachines,
    GetAllMachines ,
    GetSingleMachine,
    DeleteMachine,
    UpdateMachine
};
