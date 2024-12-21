const { JCategory,JProductCat } = require("../../../models/JusticePapperMill/StockModels/Category")
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await JProductCat.drop();
      console.log("Table deleted successfully.");
  } catch (error) {
      console.error("Error deleting table:", error);
  }
}


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
    const Cat = await JCategory.findAll(
      {
        include: [{
          model: JProductCat,
          // as: 'JStockLedger' // Use the alias if you defined one in your model
      }]
      }
    ).then((result) => {
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

const UpdateCategoryBasedOnproduct = async (req, res) => {
  const CatName = req.params.CatName;
  const {Name} = req.body;
  
  const Getone = await JCategory.findOne({where: {Name: CatName}})

  try {
    // Update the database with the new image path
    JProductCat.create(
      {
        Name,
        ProCategory:Getone.id
      }
    )
      .then(() => {
        res.status(200).json({ message: `Record updated successfully ` });
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
    DeleteCategory,
    UpdateCategoryBasedOnproduct
};
