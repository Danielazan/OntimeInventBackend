const {
    JWaybill
  } = require("../../../models/JusticePapperMill/SalesModels/WayBills");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await JWaybill.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateWaybill = async (req, res) => {
    const {
       DriversName,
      Address,
      PhoneNumber,
      WayBillNo,
      CustomerName,
      WayBillItems,
      RecivedBY,
      LorryNo,
      Date

    } = req.body;
  
    try {
      const pro = await JWaybill.create({
        DriversName,
        Address,
        PhoneNumber,
        WayBillNo,
        CustomerName,
        WayBillItems,
        RecivedBY,
        LorryNo,
        Date
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    
  };
  
  const GetAllWaybills = async (req, res) => {
    try {
      const Cat = await JWaybill.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleWaybill = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await JWaybill.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateWaybill = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        DriversName,
        Address,
        PhoneNumber,
        WayBillNo,
        CustomerName,
        WayBillItems,
        RecivedBY,
        LorryNo,
        Date
    } = req.body;
  
    try {
      // Update the database with the new image path
      JWaybill.update(
        {
            DriversName,
            Address,
            PhoneNumber,
            WayBillNo,
            CustomerName,
            WayBillItems,
            RecivedBY,
            LorryNo,
            Date
        },
        { where: { id: Productid } }
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
  
  const DeleteWaybill = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await JWaybill.destroy({
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
      CreateWaybill,
      GetAllWaybills,
      GetSingleWaybill,
      UpdateWaybill,
      DeleteWaybill,
  };
  