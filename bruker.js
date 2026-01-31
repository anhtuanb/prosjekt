// userdata.js - Fil for å lagre brukerinformasjon

// Lag en global brukerdatabase
const userDatabase = {
    'admin': { 
        password: 'admin123', 
        email: 'admin@example.com', 
        role: 'admin',
        fullName: 'Administrator'
    },
    'user': { 
        password: 'user123', 
        email: 'user@example.com', 
        role: 'user',
        fullName: 'Test User'
    },
    'demo': { 
        password: 'demo123', 
        email: 'demo@example.com', 
        role: 'user',
        fullName: 'Demo User'
    },
    'per': { 
        password: 'per123', 
        email: 'per@example.com', 
        role: 'user',
        fullName: 'Per Hansen'
    },
    'ada': { 
        password: 'ada123', 
        email: 'ada@example.com', 
        role: 'user',
        fullName: 'Ole Olsen'
    },
    'willy': { 
        password: 'willy123', 
        email: 'willy@example.com', 
        role: 'user',
        fullName: 'willy Olsen'
    }      
};

// Hjelpefunksjoner for å håndtere brukerdata
function getUser(username) {
    return userDatabase[username];
}

function addUser(username, userData) {
    userDatabase[username] = userData;
    saveToLocalStorage();
    return true;
}

function updateUser(username, userData) {
    if (userDatabase[username]) {
        userDatabase[username] = { ...userDatabase[username], ...userData };
        saveToLocalStorage();
        return true;
    }
    return false;
}

function deleteUser(username) {
    if (userDatabase[username] && username !== 'admin') {
        delete userDatabase[username];
        saveToLocalStorage();
        return true;
    }
    return false;
}

function getAllUsers() {
    return { ...userDatabase };
}

function usernameExists(username) {
    return !!userDatabase[username];
}

function emailExists(email) {
    return Object.values(userDatabase).some(user => user.email === email);
}

// Lagre til localStorage
function saveToLocalStorage() {
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
}

// Last fra localStorage ved oppstart
function loadFromLocalStorage() {
    const storedUsers = localStorage.getItem('userDatabase');
    if (storedUsers) {
        try {
            const parsedUsers = JSON.parse(storedUsers);
            Object.keys(parsedUsers).forEach(username => {
                userDatabase[username] = parsedUsers[username];
            });
        } catch (error) {
            console.error('Feil ved lasting av brukere fra localStorage:', error);
        }
    }
}

// Last inn brukere ved oppstart
loadFromLocalStorage();

// Gjør funksjonene tilgjengelige globalt
window.userDatabase = userDatabase;
window.getUser = getUser;
window.addUser = addUser;
window.usernameExists = usernameExists;
window.emailExists = emailExists;
window.loadFromLocalStorage = loadFromLocalStorage;
