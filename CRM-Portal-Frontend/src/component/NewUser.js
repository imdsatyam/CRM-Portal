import React, { useState, useEffect } from 'react';
import { $CommonServiceFn } from '../network/Services';
import { $Service_Url } from '../network/UrlPath';
import AleartToaster from '../controls/AleartToaster';
import konsole from '../controls/Konsole';

export function NewUser() {
    const [formData, setFormData] = useState({ image: '', mobileNo: '', address: '', position: '', facebookProfile: '', twitterProfile: '', instagramProfile: '', linkedInProfile: '', extraMobileNo: '', guardianName: '', guardianNo: '', guardianEmail: '' });
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { image, mobileNo, address, position, facebookProfile, twitterProfile, instagramProfile, linkedInProfile, extraMobileNo, guardianName, guardianNo, guardianEmail } = formData;
        const { firstName, middleName, lastName, email, createdAt } = JSON.parse(localStorage.getItem('userData'));
        const userData = { image, mobileNo, address, position, facebookProfile, twitterProfile, instagramProfile, linkedInProfile, extraMobileNo, guardianName, guardianNo, guardianEmail, firstName, middleName, lastName, email, createdAt };

        const token = localStorage.getItem('token');
        $CommonServiceFn.InvokeCommonApi('POST', $Service_Url.createNewUser, userData, (data, error) => {
            if (data) {
                AleartToaster.error('User created successfully');
                fetchUsers(currentPage);
                setShowForm(false);
            } else {
                AleartToaster.error('Something went wrong.');
            }
        }, { Authorization: `Bearer ${token}` });
    };

    const fetchUsers = async () => {
        const page = 1;
        const url = `${$Service_Url.allUserInfo}?page=${page}`;
        $CommonServiceFn.InvokeCommonApi('GET', url, null, (data, error) => {
            if (data) {
                const { users, totalPages } = data;
                setUsers(users);
                setTotalPages(totalPages);
            } else {
                konsole.warn("No users found in the response");
            }
        });
    };

    const deleteUser = async (userId) => {
        const token = localStorage.getItem('token');
        konsole.log(token, "njvvjvkdfkfkdfkf")
        const url = $Service_Url.deleteUserInfo.replace(':userId', userId);
        const userData = { userId };
        $CommonServiceFn.InvokeCommonApi('DELETE', url, userData, (data, error) => {
            if (data) {
                AleartToaster.error('User deleted successfully');
                fetchUsers(currentPage);
            } else {
                AleartToaster.error('Failed to delete the user');
            }
        }, { Authorization: `Bearer ${token}` });
    };

    return (
        <div>
            {showForm && (
                <form onSubmit={handleSubmit} style={{ color: '#ffffff', maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#0D6EFD", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create New User</h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Image URL</label>
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNo"
                                placeholder="Mobile Number"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Position</label>
                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={formData.position}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                    </div>

                    <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Social Profiles</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Facebook</label>
                            <input
                                type="text"
                                name="facebookProfile"
                                placeholder="Facebook Profile"
                                value={formData.facebookProfile}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Twitter</label>
                            <input
                                type="text"
                                name="twitterProfile"
                                placeholder="Twitter Profile"
                                value={formData.twitterProfile}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Instagram</label>
                            <input
                                type="text"
                                name="instagramProfile"
                                placeholder="Instagram Profile"
                                value={formData.instagramProfile}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>LinkedIn</label>
                            <input
                                type="text"
                                name="linkedInProfile"
                                placeholder="LinkedIn Profile"
                                value={formData.linkedInProfile}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                    </div>

                    <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>Guardian Details</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Guardian Name</label>
                            <input
                                type="text"
                                name="guardianName"
                                placeholder="Guardian Name"
                                value={formData.guardianName}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Guardian Mobile No</label>
                            <input
                                type="text"
                                name="guardianNo"
                                placeholder="Guardian Mobile No"
                                value={formData.guardianNo}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Guardian Email</label>
                            <input
                                type="email"
                                name="guardianEmail"
                                placeholder="Guardian Email"
                                value={formData.guardianEmail}
                                onChange={handleChange}
                                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ marginTop: "20px", width: "100%", padding: "10px", backgroundColor: "#ffffff", color: "#0D6EFD", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
                    >
                        Create User
                    </button>
                </form>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button className='mb-2 mt-3' onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Hide Create User Form' : 'Show Create User Form'}
                </button>
            </div>
            <div style={{ maxWidth: '100%', margin: '0 auto', padding: '20px', backgroundColor: '#0D6EFD', textAlign: 'center', borderRadius: "15px" }}>
                <h2 className='mt-3' style={{ color: '#FFFFFF' }}>Users List</h2>
                <div style={{ width: '100%', maxHeight: '600px', overflow: 'auto', padding: '0' }}>
                    <style>
                        {`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}
                    </style>
                    <table style={{ width: "100%", minWidth: "800px", borderCollapse: "separate", borderSpacing: "0", marginTop: "20px", fontSize: "14px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                        <thead style={{ backgroundColor: "#0D6EFD", color: "white" }}>
                            <tr>
                                {['Email', 'Name', 'Mobile', 'Address', 'Position', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'Guardian', 'Actions'].map((header, i) => (
                                    <th key={i} style={{ padding: "12px", textAlign: "center" }}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                                        transition: "background-color 0.3s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f1f1")}
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "white")
                                    }
                                >
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.email}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{`${user.firstName} ${user.lastName}`}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.mobileNo}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.address}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.position}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.facebookProfile}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.twitterProfile}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.instagramProfile}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.linkedInProfile}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.guardianName}</td>
                                    <td style={{ padding: "10px", textAlign: "center", borderBottom: "1px solid #ddd" }}>
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0061f2")}
                                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0D6EFD")}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                )}
                {currentPage < totalPages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
}
