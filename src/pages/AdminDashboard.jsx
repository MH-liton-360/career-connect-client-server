import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const makeAdmin = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/users/admin/${id}`);
            fetchUsers();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${id}`);
            fetchUsers();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td className="border px-4 py-2">{u.name}</td>
                            <td className="border px-4 py-2">{u.email}</td>
                            <td className="border px-4 py-2">{u.role}</td>
                            <td className="border px-4 py-2 flex gap-2">
                                {u.role !== "admin" && (
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={() => makeAdmin(u._id)}
                                    >
                                        Make Admin
                                    </button>
                                )}
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteUser(u._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
