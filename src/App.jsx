import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Feed />}> </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/connections" element={<Connections />}></Route>
            <Route path="/requests" element={<Requests />} ></Route>
            <Route path="/signup" element={<Signup />}> </Route>
            <Route path="/signup" element={<Signup />}> </Route>
            <Route path="/signup" element={<Signup />}> </Route>
            <Route path="/chat/:targetUserId" element={<Chat/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
