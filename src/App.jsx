import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet,
    useLocation,
} from "react-router-dom";
import ResponsiveAppBar from "./components/Header.jsx";
import Home from './Home.jsx';
import Products from './Products';
import Manager from './Manager.jsx';
import SignUp from "./SignUp.jsx";
import SignInSide from "./SingIn.jsx";
import './App.css';

function Root() {
    const location = useLocation();
    const noHeaderPaths = ["/SignUp", "/SignIn"];
    const hideHeader = noHeaderPaths.includes(location.pathname);

    return (
        <>
            {!hideHeader && <ResponsiveAppBar />}
            <div className="content" style={{ paddingTop: hideHeader ? '0' : '80px' }}>
                <Outlet />
            </div>
        </>
    );
}

function NotFound() {
    return <h2>404 - Page Not Found</h2>;
}

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="SignUp" element={<SignUp />} />
                <Route path="SignIn" element={<SignInSide />} />
                <Route path="products" element={<Products />} />
                <Route path="manager" element={<Manager />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return (
        <div id="root">
            <RouterProvider router={router} />
        </div>
    );
}
