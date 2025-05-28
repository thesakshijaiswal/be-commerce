import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { InputField, Button } from "../components";
import {
  useGetUserByIdQuery,
  useUpdateUserAsAdminMutation,
} from "../features/userApiSlice";
import { IoShieldOutline } from "react-icons/io5";

const UserEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, isLoading: isLoadingUser } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: isUpdating }, refetch] =
    useUpdateUserAsAdminMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        isAdmin: user.isAdmin || false,
      });
    }
  }, [user]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        id,
        name: formData.name,
        email: formData.email,
        isAdmin: formData.isAdmin,
      }).unwrap();

      toast.success(res.message);
      navigate("/admin/users");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "B";
  };

  if (isLoadingUser) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-lg text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="rounded-lg bg-white p-4 shadow-md sm:p-6 lg:p-8">
          <h3 className="text-xl font-bold text-secondary sm:text-2xl">
            User Profile
          </h3>

          <div className="my-6 sm:my-8">
            <div className="border-b border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl">
                  {getInitials(user?.name)}
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-semibold capitalize text-gray-900 sm:text-2xl">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        user?.isAdmin
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user?.isAdmin ? "Administrator" : "Regular User"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ID: {user?._id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdateUser} className="space-y-4 sm:space-y-6">
            <InputField
              type="text"
              fieldName="name"
              label="Full Name"
              icon={AiOutlineUser}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter full name"
              required
            />

            <InputField
              type="email"
              fieldName="email"
              label="Email Address"
              icon={AiOutlineMail}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Enter email address"
              required
            />

            <div className="flex flex-col">
              <label
                htmlFor="role"
                className="flex select-none items-center justify-between gap-2 px-1 py-2 text-base text-gray-700"
              >
                Account Role
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <IoShieldOutline className="size-5" />
                </div>
                <select
                  id="role"
                  value={formData.isAdmin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isAdmin: e.target.value === "true",
                    }))
                  }
                  className="h-12 w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 pl-10 text-sm text-gray-700 shadow-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option value="false">Regular User</option>
                  <option value="true">Administrator</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-3 font-medium text-gray-700">
                Account Information
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                {user?.createdAt && (
                  <p>
                    <span className="font-medium">Join Date: </span>
                    {new Date(user.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                {user?.updatedAt && (
                  <p>
                    <span className="font-medium">Last Updated: </span>
                    {new Date(user.updatedAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
                <p>
                  <span className="font-medium">Account Role: </span>
                  <span
                    className={
                      user?.isAdmin ? "text-green-600" : "text-blue-600"
                    }
                  >
                    {user?.isAdmin ? "Administrator" : "Regular User"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update User"}
              </Button>
              <Button
                type="button"
                className="w-full bg-gray-500 hover:bg-gray-600"
                onClick={() => navigate("/admin/users")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
