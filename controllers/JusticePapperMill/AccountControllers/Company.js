const { JCompany } = require("../../../models/JusticePapperMill/AccountsModels/Compnay");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateCompanys = async (req, res) => {
  

  const { CompanyName } = req.body;

  try {

    const pro = await JCompany.create({
        
        CompanyName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllCompanys = async (req, res) => {
  try {
    const Cat = await JCompany.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleCompany = async(req,res)=>{
  const CompanyId = req.params.id
  
  try {

    const Getone = await JCompany.findOne({where: {id:CompanyId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateCompany = async (req, res) => {
    const Companyid = req.params.id;
    
    const {CompanyName,} = req.body;

  try {
    // Update the database with the new image path
    JCompany.update(
      {
        CompanyName
      },
      { where: { id: Companyid } }
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



const DeleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await JCompany.destroy({
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
    CreateCompanys,
    GetAllCompanys ,
    GetSingleCompany,
    DeleteCompany,
    UpdateCompany
};
