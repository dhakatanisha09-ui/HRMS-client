import React from 'react';
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";
function Employees() {

    let [formData, setFormData] = useState({});
    let [error, setError] = useState({})

    let handleChange = (e) => {

        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    let EmpError = {}
    let handleValidate = (formData) => {
        if (!formData.empId) {
            EmpError.empId = "Emp Id is required"
        }
        //can use elseif and if
        else if (!formData.empName) {
            EmpError.empName = "Emp Name is required"
        } else if (!formData.empEmail) {
            EmpError.empemail = "Emp email is required"
        } else if (!formData.empDateOfBirth) {
            EmpError.empDateOfBirth = "Emp D.O.B is required"
        }
        else if (!formData.empDesignation) {
            EmpError.empDesignation = "Emp Designation is required"
        }
        else if (!formData.epJoiningDate) {
            EmpError.empJoiningDate = "Emp Joining Date is required"
        }
        else if (!formData.empDepartment) {
            EmpError.empDepartment = "Emp Department is required"
        } else {
            console.log("Api data", formData);
        }
        setError(EmpError);
    }

    let handleClick = () => {
        handleValidate(formData);
    };

    console.log(error.EmpId);
    console.log(error.Name);
    console.log(error.email);
    console.log(error.DateofBirth);
    console.log(error.Designation);
    console.log(error.JoiningDate);
    console.log(error.Department);

    return (
        //HTML fragment
        <>
            <Card>
                <CardHeader>
                    <CardTitle>EMPLOYEES</CardTitle>
                    <CardDescription>Table</CardDescription>
                    <CardAction><Dialog>
                        <div className="text-end">
                            <DialogTrigger className="h-10 w-50 border-2 rounded-md border-blue-300 text-black"> Add Employee</DialogTrigger>
                        </div>
                        <DialogContent className="h-150 overflow-scroll">
                            <DialogHeader>
                                <DialogTitle className="mb-3">Employee Form</DialogTitle>
                                <DialogDescription>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp Id</label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="number" placeholder="Enter the employee id" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empId" onClick={handleClick}></input>
                                        <p>{error.empId}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp Name</label>
                                    </div>
                                    <div>
                                        <input
                                            type="text" placeholder="Enter the employee Name" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empName" onClick={handleClick}></input>
                                        <p>{error.empName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp Email</label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email" placeholder="Enter the employee Email" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empEmail" onClick={handleClick}></input>
                                        <p>{error.empEmail}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp D.O.B</label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="date" placeholder="Date of Birth" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empDateOfBirth" onClick={handleClick}></input>
                                        <p>{error.empDateofBirth}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp Joining Date</label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="date" placeholder="Joining Date" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empJoiningDate" onClick={handleClick}></input>
                                        <p>{error.empJoiningDate}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp Department</label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text" placeholder="Enter the employee Department" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empDepartment" onClick={handleClick}></input>
                                        <p>{error.empDepartment}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="font-bold text-black">Emp Designation</label>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text" placeholder="Enter the employee Designation" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empDesignation" onClick={handleClick}></input>
                                        <p>{error.empDesignation}</p>
                                    </div>
                                    <div>
                                        <button className="h-10 w-50 border-2 bg-amber-300 rounded-3xl border-blue-300 text-black" onClick={handleClick}>submit</button>
                                    </div>
                                    <div>
                                        <button className="h-10 w-50 border-2 bg-red-500 rounded-3xl border-blue-300 text-black" >close</button>
                                    </div>

                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p><table className="mb-3" class="border-collapse border border-gray-400 ...">
                        <thead>
                            <tr>
                                <th class="border border-gray-300 ...">Id</th>
                                <th class="border border-gray-300 ...">Name</th>
                                <th class="border border-gray-300 ...">Email </th>
                                <th class="border border-gray-300 ...">D.O.B</th>
                                <th class="border border-gray-300 ...">JoiningDate</th>
                                <th class="border border-gray-300 ...">Department </th>
                                <th class="border border-gray-300 ...">Designation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border border-gray-300 ...">Indiana</td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                            </tr>
                            <tr>
                                <td class="border border-gray-300 ...">Ohio</td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                            </tr>
                            <tr>
                                <td class="border border-gray-300 ...">Michigan</td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                                <td class="border border-gray-300 ..."></td>
                            </tr>
                        </tbody>
                    </table></p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
            <Dialog>
                <div className="text-end">
                    <DialogTrigger className="h-10 w-50 border-2 rounded-md border-blue-300 text-black"> Add Employee</DialogTrigger>
                </div>
                <DialogContent className="h-150 overflow-scroll">
                    <DialogHeader>
                        <DialogTitle className="mb-3">Employee Form</DialogTitle>
                        <DialogDescription>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp Id</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number" placeholder="Enter the employee id" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empId" onClick={handleClick}></input>
                                <p>{error.empId}</p>
                            </div>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp Name</label>
                            </div>
                            <div>
                                <input
                                    type="text" placeholder="Enter the employee Name" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empName" onClick={handleClick}></input>
                                <p>{error.empName}</p>
                            </div>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp Email</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email" placeholder="Enter the employee Email" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empEmail" onClick={handleClick}></input>
                                <p>{error.empEmail}</p>
                            </div>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp D.O.B</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="date" placeholder="Date of Birth" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empDateOfBirth" onClick={handleClick}></input>
                                <p>{error.empDateofBirth}</p>
                            </div>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp Joining Date</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="date" placeholder="Joining Date" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empJoiningDate" onClick={handleClick}></input>
                                <p>{error.empJoiningDate}</p>
                            </div>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp Department</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" placeholder="Enter the employee Department" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empDepartment" onClick={handleClick}></input>
                                <p>{error.empDepartment}</p>
                            </div>
                            <div className="mb-3">
                                <label className="font-bold text-black">Emp Designation</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" placeholder="Enter the employee Designation" className="h-10 w-50 border-2 border-black-rounded text-black" onChange={handleChange} name="empDesignation" onClick={handleClick}></input>
                                <p>{error.empDesignation}</p>
                            </div>
                            <div>
                                <button className="h-10 w-50 border-2 bg-amber-300 rounded-3xl border-blue-300 text-black" onClick={handleClick}>submit</button>
                            </div>
                            <div>
                                <button className="h-10 w-50 border-2 bg-red-500 rounded-3xl border-blue-300 text-black" >close</button>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default Employees;