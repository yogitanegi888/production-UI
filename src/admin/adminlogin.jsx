import { useFormik } from "formik";
import { useHistory } from "react-router";

import authService from "../Services/AuthServices";
function AdminLogin(props){
    let hist = useHistory();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: async (credentials) => {
            let status = await authService.login(credentials);
            if (status) {
                hist.push('/Dashboard');


                
            } else {
                alert("Invalid Username or password");
            }
        }
    });
    return (
        <div className="container">
            <div className="row justify-content-center p-3">
                <div className="col-lg-4 col-md-6 py-3 shadow-sm border">
                    <h3 className="text-center">Admin Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username: </label>
                            <input type="text" name="username" className="form-control" placeholder="Username" value={formik.values.username} onChange={formik.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" className="form-control" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
   
}
export default AdminLogin ;