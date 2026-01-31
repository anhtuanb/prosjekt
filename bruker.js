// userdata.js - Fil for å lagre brukerinformasjon

// Eksporter brukerdata som et objekt som kan importeres
export const userDatabase = {
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
    'ole': { 
        password: 'ole123', 
        email: 'ole@example.com', 
        role: 'user',
        fullName: 'Per Hansen'
    }    
};

// Hjelpefunksjoner for å håndtere brukerdata
export function getUser(username) {
    return userDatabase[username];
}

export function addUser(username, userData) {
    userDatabase[username] = userData;
    // Lagre i localStorage for persistens
    saveToLocalStorage();
    return true;
}

export function updateUser(username, userData) {
    if (userDatabase[username]) {
        userDatabase[username] = { ...userDatabase[username], ...userData };
        saveToLocalStorage();
        return true;
    }
    return false;
}

export function deleteUser(username) {
    if (userDatabase[username] && username !== 'admin') {
        delete userDatabase[username];
        saveToLocalStorage();
        return true;
    }
    return false;
}

export function getAllUsers() {
    return { ...userDatabase };
}

export function usernameExists(username) {
    return !!userDatabase[username];
}

export function emailExists(email) {
    return Object.values(userDatabase).some(user => user.email === email);
}

// Lagre til localStorage
function saveToLocalStorage() {
    localStorage.setItem('demoUsers', JSON.stringify(userDatabase));
}

// Last fra localStorage ved oppstart
export function loadFromLocalStorage() {
    const storedUsers = localStorage.getItem('demoUsers');
    if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        // Legg til nye brukere fra localStorage (overskriv ikke defaults)
        Object.keys(parsedUsers).forEach(username => {
            userDatabase[username] = parsedUsers[username];
        });
    }
}