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
const BankDepositeTransfer =require("./routes/Pillar Pole/AccountRouts/BankDepositTransfer")
const BankOpeningBal =require("./routes/Pillar Pole/AccountRouts/BankopeningBal")
const AccountType =require("./routes/Pillar Pole/AccountRouts/AccountType")
const Acheads =require("./routes/Pillar Pole/AccountRouts/AcHeads")
const AccountChart =require("./routes/Pillar Pole/AccountRouts/AccountChart")
const SupplierReport =require("./routes/Pillar Pole/SupplierRoutes/SupplierReport")

// justice Apis
const JusticeCatory =require("./routes/JusticePapperMill/StockRoutes/Category")
const JusticeProducts = require("./routes/JusticePapperMill/StockRoutes/Products")
const PurchaseStocks = require("./routes/JusticePapperMill/StockRoutes/PurchaseStocks")
const StocksProduction = require("./routes/JusticePapperMill/StockRoutes/StockProduction")
const StocksOpeningBal = require("./routes/JusticePapperMill/StockRoutes/StockOpeningBal")
const JusticeStocksTransfer = require("./routes/JusticePapperMill/StockRoutes/StockTransfer")
const JStockused = require("./routes/JusticePapperMill/StockRoutes/StockUsed")
const JNewSupplier = require("./routes/JusticePapperMill/SuppliersRoutes/NewSuppliers")
const JSupplierReport = require("./routes/JusticePapperMill/SuppliersRoutes/SupplierReport")
const JMakeSales = require("./routes/JusticePapperMill/SalesRoutes/MakeSales")
const JNewCustomers = require("./routes/JusticePapperMill/CustomerRoutes/NewCustomers")






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
app.use("/api",SupplierReport)
app.use("/api",Sales)
app.use("/api",WayBill)
app.use("/api",Refund)
app.use("/api",ExpaenseAccount)
app.use("/api",SalesRep)
app.use("/api",Company)
app.use("/api",PostBill)
app.use("/api",BankDepositeTransfer)
app.use("/api",BankOpeningBal)
app.use("/api",AccountType)
app.use("/api",Acheads)
app.use("/api",AccountChart)

// Justices Apis
app.use("/api",JusticeCatory)
 app.use("/api",JusticeProducts)
 app.use("/api",PurchaseStocks)
 app.use("/api",StocksProduction)
 app.use("/api",StocksOpeningBal)
 app.use("/api",JusticeStocksTransfer)
 app.use("/api",JStockused)
 app.use("/api",JNewSupplier)
 app.use("/api",JSupplierReport)
 app.use("/api",JMakeSales)
 app.use("/api",JNewCustomers)

 
 



sequelize.sync().then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log(`Listening at port ${process.env.PORT}`)
    })
})
