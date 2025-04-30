const {
    PillarOpenCloseBal
  } = require("../../../models/Pillar Pole/StockModels/ProductOpenCloseBal");
  const {Product,CompanyLocation} = require("../../../models/Pillar Pole/StockModels/Product");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  const { Op } = require('sequelize');
  const sequelize = require("../../../database")

  async function forceDeleteTable() {
    try {
      await sequelize.query(`DROP TABLE IF EXISTS "EfficientNewSuppliers" CASCADE;`);
      console.log("Table 'EfficientNewSuppliers' deleted successfully.");
    } catch (error) {
      console.error("Error deleting table:", error);
    }
  }

  const getYesterdayDate = () => {
    const today = new Date(); // current date/time in local timezone
    const yesterday = new Date(today);
  
    // Subtract one day (24 hours)
    yesterday.setUTCDate(today.getUTCDate() - 1);
  
    // Normalize time to 00:00:00.000 UTC
    yesterday.setUTCHours(0, 0, 0, 0);
  
    return yesterday.toISOString(); // returns ISO string in UTC, e.g. "2025-04-22T00:00:00.000Z"
  };
  
  const getTodayDate = () => {
    const today = new Date();
  
    // Normalize time to 00:00:00.000 UTC
    today.setUTCHours(0, 0, 0, 0);
  
    return today.toISOString(); // e.g. "2025-04-23T00:00:00.000Z"
  };


  const getPreviousDate = (dateString) => {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Normalize time to 00:00:00.000 UTC (in case input time wasn't midnight)
    date.setUTCHours(0, 0, 0, 0);
  
    // Subtract one day (handles month/year boundaries automatically)
    date.setUTCDate(date.getUTCDate() - 1);
  
    return date.toISOString();
  };

  const SetAllOpeningQuantities = async () => {
    try {
        // 1. Fetch all locations
        const locations = await CompanyLocation.findAll();

        if (!locations || locations.length === 0) {
            console.log("No locations found in the database.");
            return;
        }

        // 2. Iterate through each location
        for (const location of locations) {
            console.log(`Processing location: ${location.LocationName} (ID: ${location.id})`);

            // 3. Fetch all products associated with the current location
            const products = await Product.findAll();

            if (!products || products.length === 0) {
                console.log(`No products found for location ID: ${location.id}`);
                continue; // Skip to the next location
            }

            // 4. Iterate through each product and update OpeningQuantity in PillarOpenCloseBal
            for (const product of products) {

                try {
                    yesterday = getYesterdayDate()

                    const existingRecord = await PillarOpenCloseBal.findOne({
                        where: {
                          LocationId: location.id,
                          ProductName: product.ProductName,
                          Date: yesterday
                        }
                      });

                    if (existingRecord) {

                     let ERecord = await PillarOpenCloseBal.findOne({
                        where: {
                          LocationId: location.id,
                          ProductName: product.ProductName,
                          Date:getTodayDate()
                        }
                      })

                      if (!ERecord){
                        await PillarOpenCloseBal.create({
                          Date:getTodayDate(), 
                          ProductName: product.ProductName,
                          Category:product.Category,
                          OpeningQuantity:existingRecord.ClosingQty,
                          QtyIn: 0,
                          TotalStock:existingRecord.OpeningQuantity,
                          QtyOut: 0,
                          ClosingQty:existingRecord.OpeningQuantity -  0,
                          LocationId:location.id
                        });
                      }  

                    } else {

                      let ERecord = await PillarOpenCloseBal.findOne({
                        where: {
                          LocationId: location.id,
                          ProductName: product.ProductName,
                          Date:getTodayDate()
                        }
                      })

                      if (!ERecord){
                        await PillarOpenCloseBal.create({
                          Date:getTodayDate(), 
                          ProductName: product.ProductName,
                          Category:product.Category,
                          OpeningQuantity:0,
                          QtyIn: 0,
                          TotalStock:0,
                          QtyOut: 0,
                          ClosingQty:0,
                          LocationId:location.id
                        });
                      }
                    }
                } catch (updateError) {
                    console.error(`Error updating OpeningQuantity for Product: ${product.ProductName} at Location: ${location.LocationName}: ${updateError.message}`);

                    
                }
            }
        }

        await sequelize.query(`
        DELETE FROM "PillarOpenCloseBals"
        WHERE id NOT IN (
          SELECT DISTINCT ON ("LocationId", "ProductName", "Date") id
          FROM "PillarOpenCloseBals"
          ORDER BY "LocationId", "ProductName", "Date", "createdAt" DESC
        );
      `);

        console.log("Successfully updated OpeningQuantity for all products at all locations.");


    } catch (error) {
        console.error("An error occurred while updating OpeningQuantity:", error.message);
        // res.status(400).json({ error: error.message });
    }
};

const GetAllOpenCloseBal = async (req, res) => {
  try {
    const Cat = await PillarOpenCloseBal.findAll({
    order: [["createdAt", "DESC"]]
    }).then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const UpdateAllOpeningQuantities = async (req, res) => {
  const { 
    Location,
    OpenQty,
    Productname,
    Date,
  } = req.body;

  try {
      // 1. Fetch all locations
      const location = await CompanyLocation.findOne(
        {
          where:{
            LocationName:Location
          }
        }
      );

      const products = await Product.findOne(
        {
          where:{
            ProductName:Productname
          }
        });

      const existingRecord = await PillarOpenCloseBal.findOne({
          where: {
            LocationId: location.id,
            ProductName: Productname,
            Date
          }
        });

        if (existingRecord){
          await PillarOpenCloseBal.update(
            {
              OpeningQuantity:Number(OpenQty),
              TotalStock:Number(OpenQty),
              ClosingQty:Number(OpenQty),
              LocationId:location.id
            },
            { where:  
              {
             id:existingRecord.id
            
          } }
          )
        }

        else{
          await PillarOpenCloseBal.create({

                  Date:Date, 
                  ProductName: products.ProductName,
                  Category:products.Category,
                  OpeningQuantity:Number(OpenQty),
                  QtyIn: 0,
                  TotalStock:Number(OpenQty),
                  QtyOut: 0,
                  ClosingQty:Number(OpenQty),
                  LocationId:location.id
        })
      
      }

      console.log("Successfully updated OpeningQuantity for all products at all locations.");
      res.status(200).json({ message: "Record updated successfully" });

  } catch (error) {
      console.error("An error occurred while updating OpeningQuantity:", error.message);
      res.status(400).json({ error: error.message });
  }
};

module.exports = {
    SetAllOpeningQuantities,
    GetAllOpenCloseBal,
    UpdateAllOpeningQuantities
};