import { useGetUsersQuery } from "../../features/userApiSlice";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";

const UserList = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const navigate = useNavigate();

  if (isLoading)
    return <div className="text-center text-secondary">Loading...</div>;
  if (error) {
    toast.error(error?.data?.message || error?.error);
  }

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="mb-3 flex flex-wrap justify-between gap-4">
        <h2 className="text-2xl font-bold text-secondary">Manage Users</h2>
      </div>
      <div className="hidden overflow-x-auto rounded-lg bg-white shadow md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                is-Admin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  #{user._id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.isAdmin
                        ? "bg-green-200 text-green-700"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                {!user.isAdmin && (
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="pr-2 text-lg text-primary">
                      <FiEdit
                        onClick={() =>
                          navigate(`/admin/users/${user._id}/edit`)
                        }
                      />
                    </button>
                    <button className="text-xl text-red-600">
                      <RiDeleteBin2Line />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
        {users?.map((user) => (
          <div
            key={user._id}
            className="space-y-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex-col items-center justify-between sm:flex sm:flex-row">
              <div className="text-sm text-secondary/60">#{user._id}</div>
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-0">
                <div
                  className={`rounded-full px-3 py-1 text-sm ${user.isAdmin ? "bg-green-200 text-green-700" : "bg-primary/10 text-primary"}`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </div>
              </div>
            </div>
            <div className="text-sm text-secondary">{user.name}</div>
            <div className="flex items-center text-sm text-gray-500">
              {user.email}
            </div>
            {!user.isAdmin && (
              <div className="flex justify-end gap-2">
                <button className="text-lg text-primary">
                  <FiEdit
                    onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                  />
                </button>
                <button className="pr-3 text-xl text-red-600">
                  <RiDeleteBin2Line />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
