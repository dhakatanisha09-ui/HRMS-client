import Login from "./Component/LoginPage/login";
import Signup from "./Component/SignupPage/Signup";
import Panel from "./Component/Admin/Panel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Admin/Dashboard";
import Employees from "./Component/Admin/Pages/Employees";
import Attendance from "./Component/Admin/Pages/Attendance";
import Payroll from "./Component/Admin/Pages/Payroll";
import LeaveRequest from "./Component/Admin/Pages/LeaveRequest";
import Performance from "./Component/Admin/Pages/Performance";
import Reports from "./Component/Admin/Pages/Report";
import Settings from "./Component/Admin/Pages/Settings";
import RequireAuth from "./Component/RequireAuth";
import EmployeeDash from "./Component/Admin/Employee_Panel/Pages/EmployeeDash";
import { Suspense } from "react";
import EmployeePanel from "./Component/Admin/Employee_Panel/Pages/Employee_Panel";
import MyProfile from "./Component/Admin/Employee_Panel/Pages/MyProfile";
import { useLayoutEffect } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useContext } from "react";


function App() {
  return (

      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center text-2xl font-semibold text-slate-900">Loading...</div>}>

          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Panel" element={<RequireAuth>
              <Panel />
            </RequireAuth>}>

              <Route index element={<Dashboard />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Employees" element={<Employees />} />
              <Route path="Attendance" element={<Attendance />} />
              <Route path="Payroll" element={<Payroll />} />
              <Route path="leave/request" element={<LeaveRequest />} />
              <Route path="Performance" element={<Performance />} />
              <Route path="Reports" element={<Reports />} />
              <Route path="Settings" element={<Settings />} />
            </Route>
            /*Nested route*/
            <Route path="/employee" element={<EmployeePanel />}>
              <Route index element={<EmployeeDash />} />
              <Route path="profile" element={<MyProfile />}/>
            </Route>
          </Routes>
        </Suspense >
      </BrowserRouter>

  );
}

export default App;


// useLayoutEffect()
// useMemo()
// useCallback()
// useContext() /  useOutletContext(Nested Routing)                                                                                                                                            
