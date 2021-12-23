import axios from "axios";



const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

class AuthService {

    constructor() {
        this.isAuthenticated = false;
        this.token = '';
        this.user = null;
        this.tryAuthFromLocalStorage();
    }

    async login(credentials) {
        try {
            let resp = await axios.post(`http://localhost:8080/api/admin/login`, credentials);
            window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(resp.data));
            console.log(resp);
            this.isAuthenticated = true;
            this.token = resp.data.token;
            this.user = resp.data.userDetails;
        } catch (error) {
            this.isAuthenticated = false;
        }
        return this.isAuthenticated;
    }

    tryAuthFromLocalStorage() {
        let auth = window.localStorage.getItem(AUTH_TOKEN_KEY);
        if (auth) {
            let authInfo = JSON.parse(auth);
            this.token = authInfo.token;
            this.user = authInfo.userDetails;
            this.isAuthenticated = true;
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.user = null;
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
}

let authService = new AuthService();
export default authService;