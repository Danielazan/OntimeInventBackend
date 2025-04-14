const { EPump,ECompanyLocation,PumpLocation } = require("../../../models/EfficientLPG/ProductModels/Pump");
const sequelize = require("../../../database");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

async function deleteTable() {
  try {
      await ECompanyLocation.drop();
      console.log("Table deleted successfully.");
  } catch (error) {
      console.error("Error deleting table:", error);
  }
}

async function forceDeleteTable() {
  try {
    ans=await sequelize.query(`DROP TABLE IF EXISTS "PumpLocation" CASCADE;`);
    console.log("Table 'PumpLocation' deleted successfully.",ans);
  } catch (error) {
    console.error("Error deleting table:", error);
  }
}

const CreatePumps = async (req, res) => {
  

  const { PumpName } = req.body;

  try {

   const [Pump, created] = await EPump.findOrCreate({
      where: { PumpName },
      defaults: {
        TotalSales:0
      },
    })
    res.status(200).json({ Pump, created });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const CreateLocation = async (req, res) => {
  

  const { LocationName} = req.body;
  
  try {
    const [Location, created] = await ECompanyLocation.findOrCreate({
      where: { LocationName }
    })
    
    res.status(200).json({ Location, created });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllPumps = async (req, res) => {
  try {
    const Cat = await EPump.findAll({
      include: [{
        model: ECompanyLocation,
        // as: 'JStockLedger' // Use the alias if you defined one in your model
    }]
    }).then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // forceDeleteTable()
};

const GetAllLocatoins = async (req, res) => {
  try {
    const Cat = await ECompanyLocation.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdatePumpSales = async (req, res) => {
  const Name = req.params.Name;

  const { Quantity, AmountPaid,Location,Attendant,ClosingReading,Openingreading } = req.body;

  try {
    const Getone = await EPump.findOne({ where: { PumpName: Name } });

    const [location, locationCreated] = await ECompanyLocation.findOrCreate({
      where: { LocationName: Location },
    });

    const [pumpLocation, pumpLocationCreated] = await PumpLocation.findOrCreate({ 
      where: { EfficientPumpId: Getone.id, ECompanyLocationId: location.id },
      defaults: {
        CurrentclosingReading: 0,
        CurrentOpeningReading: 0,
        LastPumpAttendant: 0,
        TotalSales: 0,
        TotalRevenue: 0,
        LastSales: 0,
      },
    });


    await pumpLocation.update(
      {
        CurrentclosingReading: Number(ClosingReading),
        CurrentOpeningReading:Number(Openingreading),
        LastPumpAttendant:Attendant,
        TotalSales:pumpLocation.TotalSales + Number(Quantity),
        TotalRevenue:pumpLocation.TotalRevenue + Number(AmountPaid),
        LastSales:pumpLocation.LastSales + Number(Quantity)
      },
      {
        where: { id: pumpLocation.id},
      }
    );
    
    EPump.update(
      {
        TotalSales: Number(Getone.TotalSales) + Number(Quantity),
      },
      { where: { PumpName: Name } }
    )
      
      .then(() => {
        res.status(200).json({ message: "Record updated successfully" });
      })
      .catch((dbError) => {
        res.status(500).json({ error: dbError.message });
      });

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",reload)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSinglePump = async(req,res)=>{
  const PumpId = req.params.id
  
  try {

    const Getone = await EPump.findOne({where: {id:PumpId}}).then(result =>{
      res.status(200).json(result)
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
    CreateLocation,
    GetAllPumps ,
    GetSinglePump,
    DeletePump,
    UpdatePump,
    GetAllLocatoins,
    UpdatePumpSales
};
