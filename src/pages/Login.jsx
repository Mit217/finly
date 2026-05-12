import App from "../App.jsx"
import { useState } from "react";
import "../style.css";

function Login() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("1234"); // default password
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (password === savedPassword) {
      setLoggedIn(true);
    } else {
      alert("Invalid Password");
    }
  };

  const handleChangePassword = () => {
    if (oldPassword === savedPassword) {
      setSavedPassword(newPassword);
      alert("Password changed successfully!");
      setIsChangingPassword(false);
      setOldPassword("");
      setNewPassword("");
    } else {
      alert("Old password is incorrect");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPassword("");
  };

  if (loggedIn) {
    return (
    <App/>
    );
  }

  return (
    <main className="login-container">
      <div className="card">
        <div className="title-card">
            <h1>finly.</h1>
            <p>Your one-stop financer!</p>
        </div>
        
        <div className="login-card">
            {!isChangingPassword ? (
          <>
            <h1>Login</h1>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p
              className="switch"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </p>
          </>
        ) : (
          <>
            <h1>Change Password</h1>
            <input
              type="password"
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Update Password</button>
            <p
              className="switch"
              onClick={() => setIsChangingPassword(false)}
            >
              Back to Login
            </p>
          </>
        )}

        </div>
        
      </div>
    </main>
  );
}

export default Login;