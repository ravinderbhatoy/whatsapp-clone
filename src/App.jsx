import Chat from "./components/Chat";
import Split from "react-split";
import Register from "./components/Register";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Search from './components/Search'

import { useContext } from "react";
import { UserContext } from "./context/User";
import Noroom from "./components/Noroom";

function App() {
  const userState = useContext(UserContext);
  const {currentUser, active} = useContext(UserContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const RoomSelected = ({children}) =>{
    if(!active){
      return <Noroom/>;
    }
    return children;  
  }

  const routes = [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <main>
            <Split
              sizes={[30, 70]}
              direction="horizontal"
              cursor="col-resize"
              className="flex min-h-screen"
            >
              <Search/>
              <RoomSelected>
              <Chat />
              </RoomSelected>
            </Split>
          </main>
        </ProtectedRoute>
      )
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
