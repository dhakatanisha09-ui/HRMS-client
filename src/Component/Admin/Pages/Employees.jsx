import React, { useEffect } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_URL;
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function Employees() {
    let [empData, setEmpData] = useState({});
    let [error, setError] = useState({});
    let [openModal, setOpenModal] = useState(false);
    let [openEditModal, setOpenEditModal] = useState(false);
    let [openCreateModal, setOpenCreateModal] = useState(false);
    let [empFormData, setEmpFormData] = useState([{}]);
    let [filterData, setFilterData] = useState([{}]);
    let [editData, setEditData] = useState({});
    let [selectedEmployee, setSelectedEmployee] = useState(null);
    let [accountData, setAccountData] = useState({ role: "" });
    let [accountErrors, setAccountErrors] = useState({});
    let [isDelete, setIsDelete] = useState({});


    let navigate = useNavigate();

    let handleChange = (e) => {
        let { name, value } = e.target;
        setEmpData({ ...empData, [name]: value });
    };

    let handleValidate = (data) => {
        let errors = {};

        if (!data.empEmail) {
            errors.empEmail = "Email is required.";
        }
        if (!data.empID) {
            errors.empID = "Employee ID is required.";
        }
        if (!data.empName) {
            errors.empName = "Employee Name is required.";
        }
        if (!data.empPhone) {
            errors.empPhone = "Employee Phone Number is required.";
        } else if (data.empPhone.length !== 10) {
            errors.empPhone = "Employee Phone Number must be of 10 numbers.";
        }
        if (!data.empDob) {
            errors.empDob = "Employee Date of Birth is mandatory.";
        }
        if (!data.empDesig) {
            errors.empDesig = "Employee Designation is required.";
        }
        if (!data.empSalary) {
            errors.empSalary = "Please fill your current salary.";
        }
        if (!data.empJoiningDate) {
            errors.empJoiningDate = "Employee Joining date is required.";
        }
        if (!data.empDept) {
            errors.empDept = "Employee Department is required.";
        }

        setError(errors);
        return errors;
    };

    let handleAddEmployee = () => {
        const errors = handleValidate(empData);
        if (Object.keys(errors).length === 0) {
            axios
                .post(`${baseURL}/post/employee`, empData)
                .then((res) => {
                    let { success, message } = res.data;
                    if (success) {
                        alert(message);
                        setOpenModal(false);
                    }
                })
                .catch((err) => {
                    let { success, message } = err.response.data || {};
                    if (success === false) {
                        alert(message);
                    } else {
                        alert("Unable to add employee account.");
                    }
                });
        }
    };

    let handleOpenCreateAccount = (employee) => {
        setSelectedEmployee(employee);
        setAccountData({
            name: employee.empName || "",
            email: employee.empEmail || "",
            password: "",
            confirmPassword: "",
            role: "employee",
        });
        setAccountErrors({});
        setOpenCreateModal(true);
    };

    let handleAccountChange = (e) => {
        let { name, value } = e.target;
        setAccountData({ ...accountData, [name]: value });
    };
    console.log("accountData", accountData);

    let validateAccountData = (data) => {
        let errors = {};
        if (!data.name) {
            errors.name = "Name is required.";
        }
        if (!data.email) {
            errors.email = "Email is required.";
        }
        if (!data.password) {
            errors.password = "Password is required.";
        }
        if (!data.confirmPassword) {
            errors.confirmPassword = "Confirm password is required.";
        } else if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        if (!data.role) {
            errors.role = "Role is required.";
        }
        setAccountErrors(errors);
        return errors;
    };


    let handleCreateAccountSubmit = () => {
        const errors = validateAccountData(accountData);
        if (Object.keys(errors).length === 0) {
            axios
                .post(`${baseURL}/signup`, accountData)
                .then((res) => {
                    let { success, message, token } = res.data;
                    if (success) {
                        alert(message || "Employee account created successfully.");
                        setOpenCreateModal(false);
                        setAccountData({});
                        setSelectedEmployee(null);
                    }
                })
                .catch((err) => {
                    let { success, message } = err.response?.data || {};
                    if (success === false) {
                        alert(message);
                    } else {
                        alert("Unable to create employee account.");
                    }
                });
        }
    };

    let handleClick = () => {
        handleAddEmployee();
    };



    useEffect(() => {

        axios.get(`${baseURL}/get/employee`).then((res) => {

            let { success, message, data } = res.data;
            setEmpFormData(data)

        }).catch((err) => {
            console.log(err.response.data);
        });
    }, [empData, openModal, editData, openEditModal, isDelete]);

    let handleEditChange = (e) => {
        let { name, value } = e.target;
        setEditData({ ...filterData[0], [name]: value });
    };



    let handleEditClick = () => {

        let id = editData._id;

        console.log("id", id);

        axios
            .put(`${baseURL}/update/byID/${id}`, editData)
            .then((res) => {
                let { success, message } = res.data;
                if (success) {
                    alert(message);
                    setOpenEditModal(false);
                }
            }).catch((err) => {
                let { success, message } = err.response.data;
                if (success === false) {
                    alert(message);
                }
            })
    };
    console.log("editData", editData);

    console.log(">>>>>>>", filterData)

    console.log("ahdas", empFormData);


    let handleDelete = (_id) => {
        let id = editData._id;

        axios.delete(`${baseURL}/delete/byID/${_id}`).then((res) => {
            let { success, message } = res.data;
            if (success) {
                alert(message);
                setIsDelete({ _id });
                // Refresh the employee list or update the state accordingly
            }
        }).catch((err) => {
            let { success, message } = err.response.data;
            if (success === false) {
                alert(message);
            }
        });
    };

    return (
        //Html fragment
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Employees</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>
                        <Dialog open={openModal} onOpenChange={() => setOpenModal(true)}>
                            <DialogTrigger className="flex items-center justify-between bg-white p-5 rounded-lg shadow-md mb-6">                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800">
                                            Add Employee
                                        </h1>
                                        <p className="text-sm text-gray-500">
                                            Fill in the employee details below.
                                        </p>
                                    </div>
                                
                            </DialogTrigger>
                        </Dialog>
                        <Dialog open={openModal}>
                            <DialogContent className="p-6 h-150 scroll-smooth overflow-auto scrollbar-gutter-auto scrollbar-thumb-sky-200 scrollbar-track-sky-100">
                                <DialogHeader>
                                    <DialogTitle className="mb-4">
                                        New to the organisation? Add yourself⭐
                                    </DialogTitle>
                                    <DialogDescription>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee ID
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder=" Enter your Employee ID"
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empID"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empID}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Name
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder=" Enter your Name"
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empName"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empName}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Email
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder=" Enter your email."
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empEmail"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empEmail}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Phone number
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder=" Enter your phone number."
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empPhone"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empPhone}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Date of Birth
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="date"
                                                placeholder=" Enter your DOB"
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empDob"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empDob}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Designation
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder=" Enter Employee designation"
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empDesig"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empDesig}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Salary
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="number"
                                                placeholder=" Enter your Salary."
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empSalary"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empSalary}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Joining Date.
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="date"
                                                placeholder=" Enter Employee Joining Date"
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empJoiningDate"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empJoiningDate}</p>
                                        </div>
                                        <div>
                                            <label className="font-semibold text-black ">
                                                Employee Department
                                            </label>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                placeholder=" Enter department"
                                                className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                                name="empDept"
                                                onChange={handleChange}
                                            />
                                            <p>{error.empDept}</p>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-5">
                                            <button
                                                className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                                                onClick={() => {
                                                    setOpenModal(false);
                                                }}
                                            >
                                                Close
                                            </button>
                                            <button className="px-5 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors" onClick={handleClick}>
                                                Submit
                                            </button>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    {/* Table JSX */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-1">Emp ID</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Name</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Email</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Phone-number</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp DOB</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Designation</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Salary</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Joining Date</th>
                                    <th className="border border-gray-300 px-2 py-1">Emp Department</th>
                                    <th className="border border-gray-300 px-2 py-1">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empFormData.map((item, index) => {
                                    return (
                                        <tr key={item._id ?? index}>
                                            <td className="border border-gray-300 px-2 py-1">{item.empID}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empName}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empEmail}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empPhone}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empDob}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empDesig}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empSalary}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empJoiningDate}</td>
                                            <td className="border border-gray-300 px-2 py-1">{item.empDept}</td>
                                            <td className="border border-gray-300 px-2 py-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Dialog
                                                        open={openEditModal}
                                                        onOpenChange={() => {
                                                            setOpenEditModal(true);
                                                            setFilterData(empFormData.filter((data) => data._id === item._id));
                                                        }}
                                                    >
                                                        <DialogTrigger className="inline-flex items-center justify-center rounded-full border border-blue-500 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-100">
                                                            Edit
                                                        </DialogTrigger>
                                                    </Dialog>
                                                    <button
                                                        className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                                                        onClick={() => handleOpenCreateAccount(item)}
                                                    >
                                                        Create Account
                                                    </button>
                                                    <button
                                                        className="inline-flex items-center justify-center rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
                                                        onClick={() => handleDelete(item._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card >

            {/* Edit Employee Record Modal */}
            <Dialog open={openEditModal}>
                <DialogContent className="p-6 h-150 scroll-smooth overflow-auto scrollbar-gutter-auto scrollbar-thumb-sky-200 scrollbar-track-sky-100">
                    <DialogHeader>
                        <DialogTitle className="mb-4">
                            Want to change details ? Do it here☕
                        </DialogTitle>
                        <DialogDescription>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee ID
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder=" Enter your Employee ID"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empID"
                                    defaultValue={filterData[0].empID}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Name
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder=" Enter your Name"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empName"
                                    defaultValue={filterData[0].empName}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Email
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder=" Enter your email."
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empEmail"
                                    defaultValue={filterData[0].empEmail}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Phone number
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder=" Enter your phone number."
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empPhone"
                                    defaultValue={filterData[0].empPhone}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Date of Birth
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="date"
                                    placeholder=" Enter your DOB"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empDob"
                                    defaultValue={filterData[0].empDob}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Designation
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder=" Enter Employee designation"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empDesig"
                                    defaultValue={filterData[0].empDesig}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Salary
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="number"
                                    placeholder=" Enter your Salary."
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empSalary"
                                    defaultValue={filterData[0].empSalary}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Joining Date.
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="date"
                                    placeholder=" Enter Employee Joining Date"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empJoiningDate"
                                    defaultValue={filterData[0].empJoiningDate}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-black ">
                                    Employee Department
                                </label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder=" Enter department"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2 "
                                    name="empDept"
                                    defaultValue={filterData[0].empDept}
                                    onChange={handleEditChange}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                                    onClick={() => {
                                        setOpenEditModal(false);
                                    }}
                                >
                                    Close
                                </button>
                                <button className="px-5 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors" onClick={handleEditClick}>
                                    Update
                                </button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Create Employee Account Modal */}
            <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
                <DialogContent className="p-6 h-150 scroll-smooth overflow-auto scrollbar-gutter-auto scrollbar-thumb-sky-200 scrollbar-track-sky-100">
                    <DialogHeader>
                        <DialogTitle className="mb-4">
                            Create Employee Account
                        </DialogTitle>
                        <DialogDescription>
                            <div>
                                <label className="font-semibold text-black">Full Name</label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Enter employee name"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2"
                                    name="name"
                                    value={accountData.name || ""}
                                    onChange={handleAccountChange}
                                />
                                <p className="text-red-600">{accountErrors.name}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Email</label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="email"
                                    placeholder="Enter employee email"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2"
                                    name="email"
                                    value={accountData.email || ""}
                                    onChange={handleAccountChange}
                                />
                                <p className="text-red-600">{accountErrors.email}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Password</label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2"
                                    name="password"
                                    value={accountData.password || ""}
                                    onChange={handleAccountChange}
                                />
                                <p className="text-red-600">{accountErrors.password}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Role</label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Enter role"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2"
                                    name="role"
                                    value={accountData.role || ""}
                                    onChange={handleAccountChange}
                                />
                                <p className="text-red-600">{accountErrors.role}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Confirm Password</label>
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className="w-full h-8 border-2 border-black rounded-md mt-2"
                                    name="confirmPassword"
                                    value={accountData.confirmPassword || ""}
                                    onChange={handleAccountChange}
                                />
                                <p className="text-red-600">{accountErrors.confirmPassword}</p>
                            </div>
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                                    onClick={() => setOpenCreateModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-5 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                                    onClick={handleCreateAccountSubmit}
                                >
                                    Create Account
                                </button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default Employees;