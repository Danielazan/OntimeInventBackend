const {
    WayBill
  } = require("../../../models/Pillar Pole/CustomerModels/WayBill");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  async function deleteTable() {
    try {
        await WayBill.drop();
        console.log("Table deleted successfully.");
    } catch (error) {
        console.error("Error deleting table:", error);
    }
  }
  
  const CreateWayBill = async (req, res) => {
    const {
        InvoiceNo,
          Customer,
          Date,
          Lpo,
          Address,
          Quantity,
          Description,
          PreparedBy,
          DriverName,
          RecievedBy,
          LorryNo,
    } = req.body;
  
    try {
      const pro = await WayBill.create({
        InvoiceNo,
        Customer,
        Date,
        Lpo,
        Address,
        Quantity,
        Description,
        PreparedBy,
        DriverName,
        RecievedBy,
        LorryNo,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllWayBills = async (req, res) => {
    try {
      const Cat = await WayBill.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleWayBill = async (req, res) => {
    const ProductId = req.params.id;
  
    try {
      const Getone = await WayBill.findOne({ where: { id: ProductId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateWayBill = async (req, res) => {
    const Productid = req.params.id;
  
    const {
        InvoiceNo,
        Customer,
        Date,
        Lpo,
        Address,
        Quantity,
        Description,
        PreparedBy,
        DriverName,
        RecievedBy,
        LorryNo,
    } = req.body;
  
    try {
      // Update the database with the new image path
      WayBill.update(
        {
            InvoiceNo,
            Customer,
            Date,
            Lpo,
            Address,
            Quantity,
            Description,
            PreparedBy,
            DriverName,
            RecievedBy,
            LorryNo,
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
  
  const DeleteWayBill = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await WayBill.destroy({
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
      CreateWayBill,
      GetAllWayBills,
      GetSingleWayBill,
      UpdateWayBill,
      DeleteWayBill,
  };
  