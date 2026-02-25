import React, { useState, useEffect, useContext } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashBoard from "./components/dashboard/EmployeeDashBoard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthContext } from "./context/AuthProvider";
const App = () => {
  // localStorage.clear();

  // useEffect(()=>{
  //   setLocalStorage();
  //   getLocalStorage();
  // })

  const [user, setUser] = useState(null);
  const [loggedInUserData,setLoggedInUserData]=useState(null);
  const [userData,setUserData]= useContext(AuthContext);
  // console.log(authData);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);
  const handleLogin = (email, password) => {
    if (email === "admin@example.com" && password === "123") {
      setUser("admin");
      setLoggedInUserData('admin');
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: "admin" }));
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && password == e.password);
      if(employee){
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee }),
        );
      } 
    } else {
      alert("Invalid Credentials");
    }
  };
  // handleLogin('admin@example.com','123');
  const data = useContext(AuthContext);

  return (
    <div>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? <AdminDashboard /> :(user == 'employee' ? <EmployeeDashBoard data={loggedInUserData} />:null)}
      {/* <EmployeeDashBoard /> */}
      {/* <AdminDashboard /> */}
    </div>
  );
};

export default App;
