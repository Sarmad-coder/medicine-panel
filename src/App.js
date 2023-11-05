import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dashin from "./components/Dashin";
import Dashboard from "./screen/Pages/Dashboard/Dashboard";
import User from "./screen/Pages/UserManagment/User/User";
import ProftAndLoss from "./screen/Pages/Report/ProfiAndLoss";
import Customer from "./screen/Pages/People/Customer/Customer";
import Suplier from "./screen/Pages/People/Suplier/Suplier";
import Purchase from "./screen/Pages/Purchase/AllPurchase";
import SalesReturn from "./screen/Pages/SalesReturn/SalesReturn";
import PurchaseReturn from "./screen/Pages/PurchaseReturn/PurchaseReturn";
import Expense from "./screen/Pages/Expense/Expense";
import CreatePurchase from "./screen/Pages/Purchase/CreatePurchase";
import SaleReport from "./screen/Pages/Report/SaleReport";
import PurchaseReport from "./screen/Pages/Report/PurchaseReport";
import InventoryReport from "./screen/Pages/Report/InventoryReport";
import ProductReport from "./screen/Pages/Report/ProductReport";
import CustomerReport from "./screen/Pages/Report/CustomerReport";
import SuplierReport from "./screen/Pages/Report/SupplierReport";
import PaymentSale from "./screen/Pages/Report/PaymentSale";
import PaymentPurchase from "./screen/Pages/Report/PaymentPurchase";
import PaymentSaleReturn from "./screen/Pages/Report/PaymentSaleReturn";
import PaymentPurchaseReturn from "./screen/Pages/Report/PaymentPurchaseReturn";
import ProductQuantityAlert from "./screen/Pages/Report/ProductQuantityAlert";
import Pos from "./screen/Pages/Pos/Pos";
import CreateCutomer from "./screen/Pages/People/Customer/CreateCustomer";
import Permissions from "./screen/Pages/UserManagment/Roles/Permissions";
import Medicine from "./screen/Pages/Medicine/Medicine";
import MedicineCategory from "./screen/Pages/Category/MedicineCategory";
import MedicinePOS from "./screen/Pages/MedicinePos/MedicinePOS";
import ReceivePayment from "./screen/Pages/ReceivePayment/ReceivePayment";
import EditCategory from "./screen/Pages/Category/EditCategory";
import AccountType from "./screen/Pages/AccountType/AccountType";
import Area from "./screen/Pages/Area/Area";
import DailyReports from "./screen/Pages/Report/DailyReports";
import TotalSupplier from "./screen/Pages/Report/TotalSupplier";
import OverAll from "./screen/Pages/Report/OverAll";
import CreatePayment from "./screen/Pages/Purchase/CreatePayment";
import ToPayment from "./screen/Pages/ToPayment/ToPayment";
import Login from "./screen/Login/Login";
import TotalCustomers from "./screen/Pages/Report/TotalCustomers";
import Company from "./screen/Pages/Company/Company";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashin />}>
            <Route index element={<Dashboard />} />
            <Route path="/pos" element={<Pos />} />
            {/* User Managment Pages */}
            <Route path="/user" element={<User />} />
            {/* <Route path="/roles" element={<Roles />} /> */}
            <Route path="/roles/permission" element={<Permissions />} />
            {/* People Pages */}
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/create" element={<CreateCutomer />} />
            <Route path="/supplier" element={<Suplier />} />

            {/* Purchase Pages */}
            <Route path="/allpurchase" element={<Purchase />} />
            <Route path="/createpurchase" element={<CreatePurchase />} />
            {/* Sales Pages */}
            {/* <Route path="/allsales" element={<AllSale />} /> */}
            {/* <Route path="/createsale" element={<CreateSale />} /> */}
            <Route path="/salesreturn" element={<SalesReturn />} />
            <Route path="/purchasereturn" element={<PurchaseReturn />} />

            {/* Medicine Pages */}
            <Route path="/medicine" element={<Medicine />} />

            {/* Company Pages */}
            <Route path="/company" element={<Company />} />

            {/* category */}
            <Route path="/medicine_category" element={<MedicineCategory />} />

            {/* unit */}
            {/* <Route path="/unit_tab" element={<UnitTab />} /> */}

            {/* Expnse */}
            <Route path="/expense" element={<Expense />} />

            {/* medicine pos */}
            <Route path="/medicine_pos" element={<MedicinePOS />} />

            {/* ReceivePayment */}
            <Route path="/receive_payment" element={<ReceivePayment />} />

            {/* Account type */}
            <Route path="/account_type" element={<AccountType />} />
            <Route path="/area" element={<Area />} />
            Area
            {/* Daily Reports */}
            <Route path="/daily_reports" element={<DailyReports />} />

            {/* total customrs */}
            <Route path="/total_customers" element={<TotalCustomers />} />

            {/* total supplier */}
            <Route path="/total_supplier" element={<TotalSupplier />} />

            {/* overall */}
            <Route path="/overall" element={<OverAll />} />

            {/* Report Pages */}
            <Route path="/profitandloss" element={<ProftAndLoss />} />
            <Route path="/edit_category/:id" element={<EditCategory />} />
            <Route path="/salereport" element={<SaleReport />} />
            <Route path="/purchasereport" element={<PurchaseReport />} />
            <Route path="/inventoryreport" element={<InventoryReport />} />
            <Route path="/productreport" element={<ProductReport />} />
            <Route path="/customerreport" element={<CustomerReport />} />
            <Route path="/supplierreport" element={<SuplierReport />} />
            <Route path="/paymentsale" element={<PaymentSale />} />
            <Route path="/paymentpurchase" element={<PaymentPurchase />} />
            <Route path="/paymentsalereturn" element={<PaymentSaleReturn />} />
            <Route path="/create_payment" element={<CreatePayment />} />
            <Route path="/to_payment" element={<ToPayment />} />
            <Route
              path="/paymentpurchasereturn"
              element={<PaymentPurchaseReturn />}
            />
            <Route
              path="/productquantityalert"
              element={<ProductQuantityAlert />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
