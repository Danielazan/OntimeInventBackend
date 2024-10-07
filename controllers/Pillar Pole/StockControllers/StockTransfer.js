const {
  StockTransfer,
} = require("../../../models/Pillar Pole/StockModels/StockTransfer");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const CreateTransfer = async (req, res) => {
  const {
    ProductName,
    Category,
    Quantity,
    PurchasePrice,
    From,
    To,
    InvoiceNumber,
    Date,
  } = req.body;

  try {
    const pro = await StockTransfer.create({
        ProductName,
        Category,
        Quantity,
        PurchasePrice,
        From,
        To,
        InvoiceNumber,
        Date,
    }).then((result) => {
      res.status(200).json(result);
      return result;
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllTransfers = async (req, res) => {
  try {
    const Cat = await StockTransfer.findAll().then((result) => {
      res.status(200).json(result.reverse());
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetSingleTransfer = async (req, res) => {
  const TramsferId = req.params.id;

  try {
    const Getone = await StockTransfer.findOne({ where: { id: TramsferId } }).then(
      (result) => {
        res.status(200).json({ result });
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateTransfer = async (req, res) => {
  const Transferid = req.params.id;

  const {
    ProductName,
    Category,
    Quantity,
    PurchaePrice,
    From,
    To,
    InvoiceNumber,
    Date,
  } = req.body;

  try {
    // Update the database with the new image path
    StockTransfer.update(
      {
        ProductName,
        Category,
        Quantity,
        PurchaePrice,
        From,
        To,
        InvoiceNumber,
        Date,
      },
      { where: { id: Transferid } }
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

const DeleteTransfer = async (req, res) => {
  try {
    const { id } = req.params;

    const Cat = await Product.destroy({
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
    CreateTransfer,
    GetAllTransfers,
    GetSingleTransfer,
    UpdateTransfer,
    DeleteTransfer,
};
