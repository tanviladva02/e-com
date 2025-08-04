import React from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

const TestAdmin: React.FC = () => {
  const { user, isAuthenticated, login } = useAuth();
  const [testResult, setTestResult] = React.useState("");
  const [apiResponse, setApiResponse] = React.useState("");

  const testAdminLogin = async () => {
    try {
      setTestResult("Testing admin login...");
      const response = await authAPI.login({
        email: "admin@example.com",
        password: "admin123",
      });
      console.log("🔍 Login response:", response);
      // set role by default
      // response.user.role = "admin";
      setTestResult("Admin login successful!");
      // setTestResult(`Admin login successful! User role: ${response.user.role}`);
    } catch (error: any) {
      console.error("❌ Login error:", error);
      setTestResult(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const testDirectAPI = async () => {
    try {
      setApiResponse("Testing direct API call...");
      const response = await authAPI.login({
        email: "admin@example.com",
        password: "admin123",
      });
      console.log("🔍 Direct API response:", response.data);
      setApiResponse(`API Response: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      console.error("❌ Direct API error:", error);
      setApiResponse(
        `API Error: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const testRegularLogin = async () => {
    try {
      setTestResult("Testing regular user login...");
      const response = await login("user@example.com", "user123");
      console.log("🔍 Regular login response:", response);
      setTestResult(
        `Regular user login successful! User role: ${response.user.role}`
      );
    } catch (error: any) {
      console.error("❌ Regular login error:", error);
      setTestResult(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Login Test
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <div className="space-y-2 text-sm">
            <div>
              Is Authenticated:{" "}
              <span className="font-semibold">
                {isAuthenticated ? "Yes" : "No"}
              </span>
            </div>
            {user && (
              <>
                <div>
                  User Name: <span className="font-semibold">{user.name}</span>
                </div>
                <div>
                  User Email:{" "}
                  <span className="font-semibold">{user.email}</span>
                </div>
                <div>
                  User Role: <span className="font-semibold">{user.role}</span>
                </div>
                <div>
                  Is Admin:{" "}
                  <span className="font-semibold">
                    {user.role === "admin" ? "Yes" : "No"}
                  </span>
                </div>
              </>
            )}
            {!user && isAuthenticated && (
              <div className="text-red-600">
                ⚠️ User object is null but authenticated!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Login</h2>
          <div className="space-y-4">
            <button onClick={testAdminLogin} className="btn-primary mr-4">
              Test Admin Login
            </button>
            <button onClick={testRegularLogin} className="btn-secondary">
              Test Regular User Login
            </button>
            <button onClick={testDirectAPI} className="btn-outline">
              Test Direct API Call
            </button>
          </div>
          {testResult && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">{testResult}</p>
            </div>
          )}
        </div>

        {apiResponse && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto">
              {apiResponse}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="space-y-2">
            <a
              href="/admin"
              className="block text-blue-600 hover:text-blue-800"
            >
              Go to Admin Dashboard
            </a>
            <a href="/" className="block text-blue-600 hover:text-blue-800">
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAdmin;
