import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Login = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <Link
            onClick={() => loginWithRedirect()}>
                Log in
            </Link>
        )
    );

};

export default Login;
