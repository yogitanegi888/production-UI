const { Redirect } = require("react-router-dom");
const { Route } = require("react-router-dom");
const { default: authService } = require('../Services/AuthServices')

function LoginRoute(props) {
    if (!authService.isAuthenticated) {
        return <Route {...props}/>;
    } else {
        return <Redirect to={{pathname: '/'}}/>
    }
}

export default LoginRoute;