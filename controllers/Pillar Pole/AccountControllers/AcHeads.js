const { AcHeads } = require("../../../models/Pillar Pole/AccountsModels/Acheads");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateAcHeadss = async (req, res) => {
  

  const { AcHeadsName } = req.body;

  try {

    const pro = await AcHeads.create({
        
        AcHeadsName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllAcHeadss = async (req, res) => {
  try {
    const Cat = await AcHeads.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleAcHeads = async(req,res)=>{
  const AcHeadsId = req.params.id
  
  try {

    const Getone = await AcHeads.findOne({where: {id:AcHeadsId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateAcHeads = async (req, res) => {
    const AcHeadsid = req.params.id;
    
    const {AcHeadsName,} = req.body;

  try {
    // Update the database with the new image path
    AcHeads.update(
      {
        AcHeadsName
      },
      { where: { id: AcHeadsid } }
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



const DeleteAcHeads = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await AcHeads.destroy({
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
    CreateAcHeadss,
    GetAllAcHeadss ,
    GetSingleAcHeads,
    DeleteAcHeads,
    UpdateAcHeads
};
