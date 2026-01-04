import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users
  useEffect(() => {
    axios.get("https://habit-tracker-server-site.vercel.app/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this user?");
    if (!confirm) return;

    try {
      await axios.delete(`https://habit-tracker-server-site.vercel.app/users/${id}`);
      toast.success("User deleted");
      setUsers(users.filter(u => u._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // Make admin
  const makeAdmin = async (id) => {
    try {
      await axios.patch(`https://habit-tracker-server-site.vercel.app/users/admin/${id}`);
      toast.success("User promoted to Admin");

      setUsers(users.map(u =>
        u._id === id ? { ...u, role: "admin" } : u
      ));
    } catch {
      toast.error("Failed to make admin");
    }
  };

 if (loading) {
    return (
      <p className="text-center mt-25 text-blue-500 font-semibold">
        <Loading></Loading>
        <p className="text-3xl my-5 text-blue-600 font-bold">All Users...</p>
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl text-center font-bold mb-6">All Users (Admin)</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success">Admin</span>
                  ) : (
                    <span className="badge badge-info">User</span>
                  )}
                </td>
                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="btn btn-xs btn-success"
                    >
                      Make Admin
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs btn-error text-white"
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
  );
};

export default AdminUsers;