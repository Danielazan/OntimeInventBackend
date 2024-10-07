const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const sequelize = require('./database')
const path = require("path")
const category = require("./routes/Pillar Pole/StockRouts/Category")
const Products = require("./routes/Pillar Pole/StockRouts/Product")
const Purchase = require("./routes/Pillar Pole/StockRouts/Purchase")
const StockTransfer = require("./routes/Pillar Pole/StockRouts/StockTransfer")
const NewProduction = require("./routes/Pillar Pole/ProductionStock/NewProduction")
const Operators = require("./routes/Pillar Pole/ProductionStock/Operators")
const Machines = require("./routes/Pillar Pole/ProductionStock/Machine")
const Customer = require("./routes/Pillar Pole/CustomerRouts/NewCustomer")
const Cutting = require("./routes/Pillar Pole/ProductionStock/Cutting")
const Printing = require("./routes/Pillar Pole/ProductionStock/Printing")
const Recycle=require("./routes/Pillar Pole/ProductionStock/Recycle")
const Supplier = require("./routes/Pillar Pole/SupplierRoutes/NewSupplier")
const Sales = require("./routes/Pillar Pole/SalesRouts/Sales")
const WayBill = require("./routes/Pillar Pole/CustomerRouts/WayBill")
const Refund = require("./routes/Pillar Pole/CustomerRouts/Refund")
const ExpaenseAccount =require("./routes/Pillar Pole/AccountRouts/ExpenseAccount")
const SalesRep =require("./routes/Pillar Pole/AccountRouts/SalesRep")
const Company =require("./routes/Pillar Pole/AccountRouts/Company")
const PostBill =require("./routes/Pillar Pole/AccountRouts/PostBills")




require("dotenv").config()
app = express()

app.use(express.urlencoded({ extended: false }));
app.use(cors())
// app.use(helmet())
app.use(express.json())
app.use(express.static("public"))


app.use("/api",category)
app.use("/api",Products)
app.use("/api",Purchase)
app.use("/api",StockTransfer)
app.use("/api",NewProduction)
app.use("/api",Operators)
app.use("/api",Machines)
app.use("/api",Customer)
app.use("/api",Cutting)
app.use("/api",Printing)
app.use("/api",Recycle)
app.use("/api",Supplier)
app.use("/api",Sales)
app.use("/api",WayBill)
app.use("/api",Refund)
app.use("/api",ExpaenseAccount)
app.use("/api",SalesRep)
app.use("/api",Company)
app.use("/api",PostBill)




sequelize.sync().then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`Listening at port ${process.env.PORT}`)
    })
})
