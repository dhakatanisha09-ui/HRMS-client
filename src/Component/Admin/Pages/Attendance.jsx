import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const initialAttendance = [
  { id: "EMP-001", name: "Aarthi R.", department: "HR", designation: "HR Manager", status: "Present" },
  { id: "EMP-002", name: "Kavya S.", department: "Sales", designation: "Sales Executive", status: "Absent" },
  { id: "EMP-003", name: "Rohit T.", department: "IT", designation: "Developer", status: "Present" },
];

export default function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    department: "",
    designation: "",
    status: "Present",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleToggleStatus = (employeeId) => {
    setAttendance((current) =>
      current.map((record) =>
        record.id === employeeId
          ? { ...record, status: record.status === "Present" ? "Absent" : "Present" }
          : record
      )
    );
  };

  const handleDeleteRecord = (employeeId) => {
    setAttendance((current) => current.filter((record) => record.id !== employeeId));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleAddEmployee = () => {
    if (!formData.id || !formData.name || !formData.department || !formData.designation) {
      return;
    }

    setAttendance((current) => [
      ...current,
      {
        id: formData.id,
        name: formData.name,
        department: formData.department,
        designation: formData.designation,
        status: formData.status,
      },
    ]);
    setFormData({ id: "", name: "", department: "", designation: "", status: "Present" });
    setDialogOpen(false);
  };

  const handleResetForm = () => {
    setFormData({ id: "", name: "", department: "", designation: "", status: "Present" });
  };

  const presentCount = attendance.filter((record) => record.status === "Present").length;
  const absentCount = attendance.filter((record) => record.status === "Absent").length;

  return (
    <Card size="default">
      <CardHeader>
        <div>
          <CardTitle>Employee Attendance</CardTitle>
          <CardDescription>Manage and track employee attendance records with real-time status updates.</CardDescription>
        </div>
        <CardAction>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                + Add Record
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={true} className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Add Attendance Record</DialogTitle>
                <DialogDescription>
                  Enter employee details and select their attendance status for today.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 pt-4">
                <div className="grid gap-2">
                  <label htmlFor="emp-id" className="text-sm font-medium">
                    Employee ID
                  </label>
                  <input
                    id="emp-id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="e.g., EMP-005"
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="emp-name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="emp-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Priya N."
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="emp-dept" className="text-sm font-medium">
                      Department
                    </label>
                    <input
                      id="emp-dept"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Finance"
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="emp-desig" className="text-sm font-medium">
                      Designation
                    </label>
                    <input
                      id="emp-desig"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Accountant"
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="emp-status" className="text-sm font-medium">
                    Attendance Status
                  </label>
                  <select
                    id="emp-status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="gap-2 pt-6">
                <DialogClose asChild>
                  <Button variant="outline" size="sm" onClick={handleResetForm}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleAddEmployee}
                  disabled={!formData.id || !formData.name}
                >
                  Save Record
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableCaption>Daily attendance log for all employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Employee ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Designation</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                  No attendance records available. Click "Add Record" to get started.
                </TableCell>
              </TableRow>
            ) : (
              attendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{record.id}</TableCell>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.designation}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        record.status === "Present"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-red-50 text-red-700 ring-1 ring-red-200"
                      }`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="xs"
                      variant={record.status === "Present" ? "secondary" : "outline"}
                      onClick={() => handleToggleStatus(record.id)}
                    >
                      {record.status === "Present" ? "Mark Absent" : "Mark Present"}
                    </Button>
                    <Button
                      size="xs"
                      variant="destructive"
                      onClick={() => handleDeleteRecord(record.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="gap-6 border-t pt-4">
        <div className="flex gap-8 flex-1">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Present</span>
            <span className="text-lg font-bold text-emerald-700">{presentCount}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Absent</span>
            <span className="text-lg font-bold text-red-700">{absentCount}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-bold">{attendance.length}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
