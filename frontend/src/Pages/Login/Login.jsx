import { useState } from "react";
import "./Login.css"

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const users = [{ username: "Admin", password: "Gujarat@821" }];
    const handleSubmit = (e) => {
        e.preventDefault()
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            setauthenticated(true);
            console.log(password);
            localStorage.setItem("authenticated", true);
            window.location.href = "/NewsAddingPage"; // replace with the URL of the new page
        }
    };

    return (
        // <div className="GJHAgh8972">
        //     <div className="GHSG86356">
        //         <h1>Welcome Admin</h1>
        //         <form onSubmit={handleSubmit}>
        //             <input
        //                 type="text"
        //                 name="Username"
        //                 value={username}
        //                 onChange={(e) => setusername(e.target.value)}
        //                 pl
        //             />
        //             <br />
        //             <input
        //                 type="password"
        //                 name="Password"
        //                 value={password}
        //                 onChange={(e) => setpassword(e.target.value)}
        //             />
        //             <input type="submit" value="Submit" />
        //         </form>
        //     </div>
        // </div>
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title">Admin Sign Up</div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-control-label">USERNAME</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setusername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                            // pattern=".{6,}"
                                        />
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            {/* <button type="submit" className="btn btn-outline-primary">
                                                LOGIN
                                            </button> */}
                                            <input className="btn btn-outline-primary" type="submit" value="Submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default Login;

