import React from 'react';
import LogReg from "./views/LogReg";
// import BudgetForm from "./components/BudgetForm";
// import OneBudget from "./components/OneBudget";
// import UpdateBudget from "./components/UpdateBudget";
// import LogReg from "./views/LogReg";
// import Profile from "./components/Profile";
// import ExpenseForm from "./components/ExpenseForm";
// import UpdateExpense from "./components/UpdateExpense";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
            <Routes>
                <Route element={<LogReg />} path="/" />
                {/* <Route element={<BudgetForm/>} path="/new/budgets" />
                <Route element={<OneBudget/>} path="/budgets/:id" />
                <Route element={<UpdateBudget/>} path="/edit/budgets/:id" />
                <Route element={<LogReg />} path="/" />
                <Route element={<Profile />} path="/user/profile/:username" />
                <Route element={<ExpenseForm />} path="/new/expenses" />
                <Route element={<UpdateExpense />} path="edit/expenses/:id" /> */}

            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;

