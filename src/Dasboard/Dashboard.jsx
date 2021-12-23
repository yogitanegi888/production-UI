import axios from "axios";
import { setNestedObjectValues } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import authService from "../Services/AuthServices";

function Dashboard(props) {



    let hist = useHistory();
    let [users, setUsers] = useState([]);
    async function fetchProductionList() {
        try {
            let res = await axios.get(`http://localhost:8080/api/auth/getproduction`)
            setUsers(res.data);


        } catch (error) {
            console.log(error);
            window.alert("something went wrong");
            setUsers([]);

        }

    }
    useEffect(() => (
        fetchProductionList()
    ), []);
    async function handelDelete(userId) {
        try {
            let resp = await axios.delete(`http://localhost:8080/api/auth/deleteproduction/${userId}`);
            window.alert("file is deleted");
            fetchProductionList()
        } catch (error) {
            alert("Something went wrong");
        }
    }
    function logout() {
        let decision = window.confirm('Are you sure');
        if (decision) {
            authService.logout();
            hist.push('/login');
        }
    }

    return (
     
        <div className="row">
            <div className="col-12">
            <button className="btn btn-danger float-right" onClick={logout}>Logout</button>
            <nav className="navbar navbar-light bg-light float-right" >
  <span className="navbar-brand mb-0 h1"></span>
</nav>
                <h4 className=" text-center py-3">Product List</h4>
                <table className="table table-borderless">
                    <thead className="thead-light">
                        <tr>
                            <th>s. no</th>
                            <th>title</th>
                            <th>description</th>
                            <th>salelingPrice</th>
                            <th>purchasingPrice</th>
                            <th>image</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.title}</td>
                                    <td>{user.description}</td>
                                    <td>{user.salelingPrice}</td>
                                    <td>{user.purchasingPrice}</td>
                                    <td><img  width="200px" src={`http://localhost:8080/api/auth/downloadimg/${user.image}`} alt="" /></td>
                                    
                                    <td><button className="btn btn-info">Edit</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>(handelDelete(user._id))} >Delete</button></td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>


            </div>

        </div>
    );

}

export default Dashboard;
