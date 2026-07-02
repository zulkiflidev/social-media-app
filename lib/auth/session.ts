import type { User} from "@/lib/redux/slices/authSlice";

const TOKEN_KEY = "sociality_token";
const USER_KEY = "sociality_user";


export function saveSession(token: string, user: User) {

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));    
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    try{
        return JSON.parse(raw) as User;
    }
    catch {
        return null;
    }
}


export function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}


