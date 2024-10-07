const {
    Operator,
  } = require("../../../models/Pillar Pole/ProductionModels/Operators");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");
  
  const CreateOperator = async (req, res) => {
    const {
        FirstName,
        LastName,
      
    } = req.body;
  
    try {
      const pro = await Operator.create({
        FirstName,
        LastName,
      }).then((result) => {
        res.status(200).json(result);
        return result;
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetAllOperator = async (req, res) => {
    try {
      const Cat = await Operator.findAll().then((result) => {
        res.status(200).json(result.reverse());
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const GetSingleNewOperator = async (req, res) => {
    const OperatorId = req.params.id;
  
    try {
      const Getone = await Operator.findOne({ where: { id: OperatorId } }).then(
        (result) => {
          res.status(200).json({ result });
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const UpdateNewOperator = async (req, res) => {
    const operatorid = req.params.id;
  
    const {
        FirstName,
        LastName,
    } = req.body;
  
    try {
      // Update the database with the new image path
      Operator.update(
        {
            FirstName,
            LastName,
        },
        { where: { id: operatorid } }
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
  
  const DeleteNewOperator = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Cat = await Operator.destroy({
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
    CreateOperator,
    GetAllOperator,
    GetSingleNewOperator,
    UpdateNewOperator,
    DeleteNewOperator,
  };
  