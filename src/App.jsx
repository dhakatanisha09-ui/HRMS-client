import Login from "./Component/LoginPage/login";
import Signup from"./Component/SignupPage/Signup";
import Panel from"./Component/Admin/Panel";
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from "./Component/Admin/Dashboard";
import Employees from "./Component/Admin/Pages/Employees";
import Attendance from "./Component/Admin/Pages/Attendance";
import Payroll from "./Component/Admin/Pages/Payroll";
import LeaveRequest from "./Component/Admin/Pages/LeaveRequest";
import Performance from "./Component/Admin/Pages/Performance";
import Reports from "./Component/Admin/Pages/Report";
import Settings from "./Component/Admin/Pages/Settings";






function App(){
  return(
      <>
      
<BrowserRouter>
  <Routes>

      <Route path="/login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Panel" element={<Panel/>}>
          <Route index  element={<Dashboard />}/>
          <Route path="Dashboard" element={<Dashboard />}/>
          <Route path="Employees" element={<Employees/>}/>
          <Route path="Attendance" element={<Attendance/>}/>
          <Route path="Payroll" element={<Payroll/>}/>
          <Route path="leave/request" element={<LeaveRequest/>}/>
          <Route path="Performance" element={<Performance/>}/>
          <Route path="Reports" element={<Reports/>}/>
          <Route path="Settings" element={<Settings/>}/>
          </Route>/*Nested route*/
  </Routes>
</BrowserRouter>
      </>
  );
}

export default App;