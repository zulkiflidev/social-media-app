import type { User} from "@/lib/redux/slices/authSlice";

const TOKEN_KEY = "sociality_token";
const USER_KEY = "sociality_user";


function saveSession(token: string, user: User) {

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));    
}

function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

function getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try{
        return JSON.parse(raw) as User;
    }
    catch {
        return null;
    }
}


function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}


