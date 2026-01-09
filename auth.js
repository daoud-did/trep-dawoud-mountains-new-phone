// Authentication System for TREP DAWOUD
// Stores users in localStorage under "trep_users"
// Stores current session under "trep_current_user"

const AUTH = {
    isLoggedIn: () => {
        return localStorage.getItem(CONFIG.USER_STORAGE_KEY) !== null;
    },

    login: (email, password) => {
        // Simulate login
        const user = { email, name: 'User' };
        localStorage.setItem(CONFIG.USER_STORAGE_KEY, JSON.stringify(user));
        return true;
    },

    logout: () => {
        localStorage.removeItem(CONFIG.USER_STORAGE_KEY);
    },

    getUser: () => {
        const user = localStorage.getItem(CONFIG.USER_STORAGE_KEY);
        return user ? JSON.parse(user) : null;
    }
};

// Register a new local user
function registerLocal(firstName, lastName, email, password) {
    try {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return { success: false, message: 'البريد الإلكتروني مسجل بالفعل' };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString(),
            profile: {
                avatar: firstName.charAt(0),
                bio: '',
                location: '',
                experience: 'مبتدئ',
                achievements: [],
                stats: {
                    mountainsClimbed: 0,
                    totalElevation: 0,
                    coursesCompleted: 0,
                    questionsAnswered: 0
                }
            }
        };

        // Add to users array
        users.push(newUser);
        localStorage.setItem('trep_users', JSON.stringify(users));

        // Auto login
        localStorage.setItem('trep_current_user', JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }));

        return { success: true, message: 'تم إنشاء الحساب بنجاح', user: newUser };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'حدث خطأ أثناء إنشاء الحساب' };
    }
}

// Login with local credentials
function loginLocal(email, password) {
    try {
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Set current session
            localStorage.setItem('trep_current_user', JSON.stringify({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }));

            return { success: true, message: 'تم تسجيل الدخول بنجاح', user: user };
        } else {
            return { success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'حدث خطأ أثناء تسجيل الدخول' };
    }
}

// Fake Google login (simulated)
function loginFakeGoogle() {
    try {
        const fakeGoogleUser = {
            id: 'google_' + Date.now(),
            firstName: 'جوجل',
            lastName: 'يوزر',
            email: 'user_' + Date.now() + '@gmail.com',
            provider: 'google'
        };

        // Check if Google user exists, if not create
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');
        
        fakeGoogleUser.createdAt = new Date().toISOString();
        fakeGoogleUser.profile = {
            avatar: fakeGoogleUser.firstName.charAt(0),
            bio: '',
            location: '',
            experience: 'مبتدئ',
            achievements: [],
            stats: {
                mountainsClimbed: 0,
                totalElevation: 0,
                coursesCompleted: 0,
                questionsAnswered: 0
            }
        };
        users.push(fakeGoogleUser);
        localStorage.setItem('trep_users', JSON.stringify(users));

        // Set session
        localStorage.setItem('trep_current_user', JSON.stringify({
            id: fakeGoogleUser.id,
            email: fakeGoogleUser.email,
            firstName: fakeGoogleUser.firstName,
            lastName: fakeGoogleUser.lastName
        }));

        return { success: true, message: 'تم تسجيل الدخول بـ Google بنجاح' };
    } catch (error) {
        console.error('Google login error:', error);
        return { success: false, message: 'حدث خطأ في تسجيل الدخول بـ Google' };
    }
}

// Fake Facebook login (simulated)
function loginFakeFacebook() {
    try {
        const fakeFacebookUser = {
            id: 'facebook_' + Date.now(),
            firstName: 'فيسبوك',
            lastName: 'يوزر',
            email: 'user_' + Date.now() + '@facebook.com',
            provider: 'facebook'
        };

        // Check if Facebook user exists, if not create
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');
        
        fakeFacebookUser.createdAt = new Date().toISOString();
        fakeFacebookUser.profile = {
            avatar: fakeFacebookUser.firstName.charAt(0),
            bio: '',
            location: '',
            experience: 'مبتدئ',
            achievements: [],
            stats: {
                mountainsClimbed: 0,
                totalElevation: 0,
                coursesCompleted: 0,
                questionsAnswered: 0
            }
        };
        users.push(fakeFacebookUser);
        localStorage.setItem('trep_users', JSON.stringify(users));

        // Set session
        localStorage.setItem('trep_current_user', JSON.stringify({
            id: fakeFacebookUser.id,
            email: fakeFacebookUser.email,
            firstName: fakeFacebookUser.firstName,
            lastName: fakeFacebookUser.lastName
        }));

        return { success: true, message: 'تم تسجيل الدخول بـ Facebook بنجاح' };
    } catch (error) {
        console.error('Facebook login error:', error);
        return { success: false, message: 'حدث خطأ في تسجيل الدخول بـ Facebook' };
    }
}

// Logout user
function logout() {
    try {
        localStorage.removeItem('trep_current_user');
        return { success: true, message: 'تم تسجيل الخروج بنجاح' };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, message: 'حدث خطأ أثناء تسجيل الخروج' };
    }
}

// Get current logged in user
function getCurrentUser() {
    try {
        const session = localStorage.getItem('trep_current_user');
        if (!session) return null;

        const sessionData = JSON.parse(session);
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');
        const user = users.find(u => u.id === sessionData.id);

        return user || null;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

// Update user profile
function updateUserProfile(userId, profileData) {
    try {
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        // Update profile data
        users[userIndex].profile = { ...users[userIndex].profile, ...profileData };
        localStorage.setItem('trep_users', JSON.stringify(users));

        return { success: true, message: 'تم تحديث الملف الشخصي بنجاح' };
    } catch (error) {
        console.error('Update profile error:', error);
        return { success: false, message: 'حدث خطأ أثناء تحديث الملف الشخصي' };
    }
}

// Get all users (for admin purposes)
function getAllUsers() {
    try {
        return JSON.parse(localStorage.getItem('trep_users') || '[]');
    } catch (error) {
        console.error('Get all users error:', error);
        return [];
    }
}

// Delete user account
function deleteUser(userId) {
    try {
        const users = JSON.parse(localStorage.getItem('trep_users') || '[]');
        const filteredUsers = users.filter(u => u.id !== userId);

        if (filteredUsers.length === users.length) {
            return { success: false, message: 'المستخدم غير موجود' };
        }

        localStorage.setItem('trep_users', JSON.stringify(filteredUsers));

        // If deleting current user, logout
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            logout();
        }

        return { success: true, message: 'تم حذف الحساب بنجاح' };
    } catch (error) {
        console.error('Delete user error:', error);
        return { success: false, message: 'حدث خطأ أثناء حذف الحساب' };
    }
}

// Check if user is authenticated
function isAuthenticated() {
    return getCurrentUser() !== null;
}

// Initialize auth system on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for authentication redirects
    const currentUser = getCurrentUser();
    const currentPath = window.location.pathname;

    // Redirect logic can be added here based on authentication status
    // For example, redirect to login if trying to access protected pages

    console.log('Auth system initialized. Current user:', currentUser ? currentUser.firstName : 'None');
});

// Signup with Google (same as login)
function signupWithGoogle() {
    return loginFakeGoogle();
}

// Signup with Facebook (same as login)
function signupWithFacebook() {
    return loginFakeFacebook();
}

// Handle auth form submissions
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            AUTH.login(email, password);
            alert('تم تسجيل الدخول بنجاح');
            window.location.href = 'dashboard.html';
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;

            if (password !== confirm) {
                alert('كلمات المرور غير متطابقة');
                return;
            }

            const user = { name, email };
            localStorage.setItem(CONFIG.USER_STORAGE_KEY, JSON.stringify(user));
            alert('تم إنشاء الحساب بنجاح');
            window.location.href = 'dashboard.html';
        });
    }
});
