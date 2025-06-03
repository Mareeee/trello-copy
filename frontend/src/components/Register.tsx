import { useState } from "react";
import axios from "axios"
import "./Register.css"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const result = await axios.get("/home")
            alert(`server responded with: ${result.data}`)
        } catch (e) {
            alert(`something went wrong ${e}`)
        }
    }

    return (
        <div className="registration">
                <h2>Register Account</h2>

                <form name="registration" onSubmit={handleSubmit}>
                        <label>Email</label>
                    <input type="text" placeholder="Enter your email address"/>
                        <label>Password</label>
                    <input type="password" placeholder="Enter your password"/>
                        <label>Repeat Password</label>
                    <input type="password" placeholder="Repeat your password"/>
                    
                    <input type="submit" value="Register"/>
                </form>

                <div className="login"><p>Already have an account? </p><a className="login-href" href="#">Log in</a>  </div>
        </div>
    )
}

export default Register;