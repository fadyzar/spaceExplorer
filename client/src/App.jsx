import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main.jsx";
import LogIn from "./components/login/LogIn.jsx";
import SignUp from "./components/signup/SignUp.jsx";
import { LoginProvider } from "./components/context/LoginContext.jsx";
import Explore from "./pages/explore/Explore.jsx";
import ISSTracker from "./pages/Iss/ISSTracker.jsx";


function App() {

  return (
    <>
    <LoginProvider>
      
      <Routes>
        <Route path="/" element={<LogIn />}></Route> 
         <Route path="/signup" element={<SignUp/>}></Route>
         <Route path="/mainPage" element={<Main/>}></Route>
         <Route path="/explore" element={<Explore/>}></Route>
         <Route path="/iss" element={<ISSTracker/>}></Route>




       

      </Routes>
      </LoginProvider>
     

    </>
  );
}

export default App;
