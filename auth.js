// Fake Authentication System for TREP DAWOUD
// No real OAuth, just localStorage simulation

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.initAuth();
    }

    initAuth() {
        this.currentUser = this.getCurrentUser();
    }

    loginGoogle() {
        const user = { name: "Google User" };
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUser = user;
        window.location.href = 'profile.html';
    }

    loginFacebook() {
        const user = { name: "Facebook User" };
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUser = user;
        window.location.href = 'profile.html';
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const userData = localStorage.getItem("user");
            this.currentUser = userData ? JSON.parse(userData) : null;
        }
        return this.currentUser;
    }

    logout() {
        localStorage.removeItem("user");
        this.currentUser = null;
        window.location.href = 'login.html';
    }

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

// Global auth instance
const auth = new AuthSystem();
