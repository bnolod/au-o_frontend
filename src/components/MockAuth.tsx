import { useAuthentication } from "../contexts/AuthenticationContext";
import { LoginRequest, RegisterRequest } from "../lib/types";

export default function MockAuth() {
    const {login, register} = useAuthentication()
    const loginData: LoginRequest = {
        usernameOrEmail: "teszt",
        password: "Teszt@1234",
    }
    const registerData: RegisterRequest = {
        username: "teszt",
        email: "teszt@teszt.com",
        dateOfBirth: "1999-01-01",
        password: "Teszt@1234",
        nickname: "teszti",
    }
    return (
        <div>
        <h1>Mock Auth</h1>
        <button onClick={() => {login(loginData)}}>
            Login
        </button>
        <button onClick={() => {register(registerData)}}>
            Register
        </button>
        </div>
    );
}