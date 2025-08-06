import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/employeeSlice';
import { v4 as uuidv4 } from 'uuid';

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '', department: '', designation: '', joinDate: '', contact: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee({ ...form, id: uuidv4() }));
    setForm({ name: '', department: '', designation: '', joinDate: '', contact: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4">
      <div className="row g-2 align-items-end">
        <div className="col-md">
          <label className="form-label">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Name" required />
        </div>
        <div className="col-md">
          <label className="form-label">Department</label>
          <input type="text" name="department" value={form.department} onChange={handleChange} className="form-control" placeholder="Department" required />
        </div>
        <div className="col-md">
          <label className="form-label">Designation</label>
          <input type="text" name="designation" value={form.designation} onChange={handleChange} className="form-control" placeholder="Designation" required />
        </div>
        <div className="col-md">
          <label className="form-label">Join Date</label>
          <input type="date" name="joinDate" value={form.joinDate} onChange={handleChange} className="form-control" required />
        </div>
        <div className="col-md">
          <label className="form-label">Contact</label>
          <input type="text" name="contact" value={form.contact} onChange={handleChange} className="form-control" placeholder="Contact" required />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mt-4">Add</button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
