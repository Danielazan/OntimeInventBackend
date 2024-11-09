const { JCategory } = require("../../../models/JusticePapperMill/StockModels/Category")
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const CreateCategory = async (req, res) => {
  

  const { Name, Location } = req.body;

  try {

    const Cat = await JCategory.create({
        Name, Location
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllcategory = async (req, res) => {
  try {
    const Cat = await JCategory.findAll().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleCategory = async(req,res)=>{
  const CategoryId = req.params.id
  
  try {

    const Getone = await JCategory.findOne({where: {id:CategoryId}}).then(result =>{
      res.status(200).json({result})
    })
  } catch (error) {
    res.status(400).json({error:error.message})
  }

}

const UpdateCategory = async (req, res) => {
  const CategoryId = req.params.id;
  const { Name, Location } = req.body;
  

  try {
    // Update the database with the new image path
    JCategory.update(
      {
        Name, Location
      },
      { where: { id: CategoryId } }
    )
      .then(() => {
        res.status(200).json({ message: `Record updated successfully to ${Name} and ${Location}` });
      })
      .catch((dbError) => {
        res.status(500).json({ error: dbError.message });
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Cat = await JCategory.destroy({
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
    CreateCategory,
    GetAllcategory ,
    GetSingleCategory,
    UpdateCategory,
    DeleteCategory
};
