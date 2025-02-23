import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { fetchLogin } from '../../api/userService';

import "./login.css"

function Login() {
    /*****data for you backend***/
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();
    const handleSubmit = async () => {
        try {
            setLoading(true);
            let userDetails = {
                password, email
            }
            const user = await fetchLogin(userDetails);;
            login(user);

            setEmail("");
            setPassword("");

            setLoading(false);
            navigate("/")
        }

        catch (err) {
            console.log(err.message);
            setLoading(false);
            setErrMsg('Error while doing signup');
            setTimeout(() => {
                setErrMsg("");
            }, 2000)

        }

    }
    if (loading) return <h1>Loading.....</h1>
    return (
        <div className="signinscreen">
            <div className="container">
                <div className="innerContainer">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            // backgroundColor: 'red',
                        }}
                    >
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>
                            <i className="fas fa-arrow-circle-left fa-5x"></i>
                        </div>
                        <p>Sign In</p>
                    </div>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="lname"
                        name="email"
                        placeholder="Your email.."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="lname"
                        name="password"
                        placeholder="Your Password.."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Link to="/signup" className="link">
                        <span>Create a new account ?</span>
                    </Link>
                    <br />
                    <input type="submit" value="Sign in" onClick={handleSubmit} />
                    <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
                </div>
            </div>
        </div>
    )
}

export default Login;