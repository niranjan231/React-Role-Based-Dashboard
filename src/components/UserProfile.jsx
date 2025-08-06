// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../features/usersSlice';
import { FaUser, FaEnvelope, FaShieldAlt, FaTag, FaPhone, FaMapMarkerAlt, FaSave, FaEdit, FaLock, FaGlobe } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    role: '',
    category: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [avatarColor, setAvatarColor] = useState('#4e73df');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        website: user.website || '',
        role: user.role || '',
        category: user.category || ''
      });
      
      // Generate consistent avatar color based on name
      if (user.name) {
        const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'];
        const colorIndex = user.name.charCodeAt(0) % colors.length;
        setAvatarColor(colors[colorIndex]);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateUser(formData));
    setIsEditing(false);
    toast.success('Profile updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    
    // Here you would typically send an API request to update password
    toast.success('Password updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-lg mb-4">
            <div className="card-header bg-primary text-white py-4">
              <div className="d-flex justify-content-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    backgroundColor: avatarColor, 
                    fontSize: '2.5rem' 
                  }}
                >
                  {getUserInitials()}
                </div>
              </div>
              <h3 className="text-center mb-0">{user?.name}</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                <div>
                  <h6 className="text-muted small">ROLE</h6>
                  <p className="mb-0">
                    <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-secondary'} rounded-pill px-3 py-1`}>
                      <FaShieldAlt className="me-1" /> 
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                    </span>
                  </p>
                </div>
                <div className="text-end">
                  <h6 className="text-muted small">CATEGORY</h6>
                  <p className="mb-0">
                    <span className={`badge ${user?.category === 'engineer' ? 'bg-primary' : user?.category === 'customer' ? 'bg-info' : 'bg-warning'} rounded-pill px-3 py-1`}>
                      <FaTag className="me-1" /> 
                      {user?.category?.charAt(0).toUpperCase() + user?.category?.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted small d-flex align-items-center">
                  <FaEnvelope className="me-2" /> EMAIL
                </h6>
                <p className="mb-0">{user?.email}</p>
              </div>
              
              {user?.phone && (
                <div className="mb-3">
                  <h6 className="text-muted small d-flex align-items-center">
                    <FaPhone className="me-2" /> PHONE
                  </h6>
                  <p className="mb-0">{user.phone}</p>
                </div>
              )}
              
              {user?.address && (
                <div className="mb-3">
                  <h6 className="text-muted small d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" /> ADDRESS
                  </h6>
                  <p className="mb-0">{user.address}</p>
                </div>
              )}
              
              {user?.website && (
                <div>
                  <h6 className="text-muted small d-flex align-items-center">
                    <FaGlobe className="me-2" /> WEBSITE
                  </h6>
                  <a href={user.website} target="_blank" rel="noreferrer" className="text-decoration-none">
                    {user.website}
                  </a>
                </div>
              )}
              
              <button 
                className={`btn ${showPasswordForm ? 'btn-outline-secondary' : 'btn-outline-primary'} w-100 mt-4`}
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                <FaLock className="me-2" />
                {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Profile Information</h4>
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <FaEdit className="me-2" /> Edit Profile
                </button>
              ) : (
                <div>
                  <button className="btn btn-outline-secondary me-2" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleSave}>
                    <FaSave className="me-2" /> Save Changes
                  </button>
                </div>
              )}
            </div>
            
            <div className="card-body">
              {showPasswordForm && (
                <div className="card mb-4 border-warning">
                  <div className="card-header bg-warning bg-opacity-10 text-warning">
                    <h5 className="mb-0"><FaLock className="me-2" /> Change Password</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <button 
                      className="btn btn-warning"
                      onClick={handlePasswordUpdate}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              )}
              
              <form>
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaUser className="me-2 text-muted" /> Full Name
                    </label>
                    <input
                      className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaEnvelope className="me-2 text-muted" /> Email Address
                    </label>
                    <input
                      className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaPhone className="me-2 text-muted" /> Phone Number
                    </label>
                    <input
                      className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Add phone number"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaGlobe className="me-2 text-muted" /> Website
                    </label>
                    <input
                      className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Add website URL"
                    />
                  </div>
                  
                  <div className="col-12 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaMapMarkerAlt className="me-2 text-muted" /> Address
                    </label>
                    <input
                      className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Add your address"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaTag className="me-2 text-muted" /> Category
                    </label>
                    <select
                      className={`form-select ${isEditing ? 'border-primary' : ''}`}
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option value="engineer">Engineer</option>
                      <option value="customer">Customer</option>
                      <option value="reporting">Reporting</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label d-flex align-items-center">
                      <FaShieldAlt className="me-2 text-muted" /> Role
                    </label>
                    <input
                      className="form-control"
                      name="role"
                      value={formData.role}
                      disabled
                    />
                  </div>
                </div>
              </form>
              
              {isEditing && (
                <div className="d-flex justify-content-end mt-4 border-top pt-3">
                  <button className="btn btn-outline-secondary me-2" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleSave}>
                    <FaSave className="me-2" /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;