import { useState } from "react";
import axios from "axios"
import "./Register.css"

type RegisterProps = {
    onSuccess: () => void;
    onSwitchToLogin: () => void;
};

function Register({onSuccess, onSwitchToLogin} : RegisterProps ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");

        if (password !== repeatPassword) {
            setError("Password does not match!");
            return;
        }

        try {
            const response = await axios.post("/api/users", {email, password});
            localStorage.setItem("token", response.headers['x-auth-token']);
            console.log(`token: ${response.headers['x-auth-token']}`);
            onSuccess();
        } catch (e) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Registration failed.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }

    return (
        <div className="registration">
            <h2>Register Account</h2>

            <form name="registration" onSubmit={handleSubmit}>
                    <label>Email</label>
                <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label>Repeat Password</label>
                <input type="password" placeholder="Repeat your password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                
                <input type="submit" value="Register"/>
            </form>

            {error && <p>Error: <span style={{color: "red"}}>{error}</span></p>}

            <div className="login">
                <p>Already have an account? </p>
                <a className="login-href" onClick={onSwitchToLogin}>Log in</a>
            </div>
        </div>
    )
}

export default Register;