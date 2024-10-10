import React from "react";
import { UserCircle, LogOut, LogIn } from "lucide-react";

const DashboardHeader = ({
  firstName = "Guest",
  lastName = "",
  isLoggedIn = false,
  avatarUrl,
  onLogin,
  onLogout,
  onRegister,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-white shadow rounded-lg">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${firstName}'s avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserCircle className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Health Dashboard</h1>
          <p className="text-gray-600">
            Welcome{`, ${firstName} ${lastName}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Account
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onLogout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onLogin}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </button>
            <button
              onClick={onRegister}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
