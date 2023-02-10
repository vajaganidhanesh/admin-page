import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Pages/Users";
import AddUserDetails from "./Pages/AddUserDetails";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <AddUserDetails />
                <Users />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
