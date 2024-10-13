const { AccountType } = require("../../../models/Pillar Pole/AccountsModels/AccountTypes");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateAccountTypes = async (req, res) => {
  

  const { AccountTypeName } = req.body;

  try {

    const pro = await AccountType.create({
        
        AccountTypeName
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllAccountTypes = async (req, res) => {
  try {
    const Cat = await AccountType.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleAccountType = async(req,res)=>{
  const AccountTypeId = req.params.id
  
  try {

    const Getone = await AccountType.findOne({where: {id:AccountTypeId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateAccountType = async (req, res) => {
    const AccountTypeid = req.params.id;
    
    const {AccountTypeName,} = req.body;

  try {
    // Update the database with the new image path
    AccountType.update(
      {
        AccountTypeName
      },
      { where: { id: AccountTypeid } }
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



const DeleteAccountType = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await AccountType.destroy({
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
    CreateAccountTypes,
    GetAllAccountTypes ,
    GetSingleAccountType,
    DeleteAccountType,
    UpdateAccountType
};
