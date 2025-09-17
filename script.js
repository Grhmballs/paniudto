// Paniudto Restaurant Website - JavaScript
// IT Student Project - Simple functionality implementation

// ===== USER DATA MANAGEMENT =====
// Initialize users in localStorage if not exists
function initializeUsers() {
    if (!localStorage.getItem('paniudtoUsers')) {
        const defaultUsers = [
            { username: 'student', password: 'password123' },
            { username: 'admin', password: 'admin123' },
            { username: 'test', password: 'test123' }
        ];
        localStorage.setItem('paniudtoUsers', JSON.stringify(defaultUsers));
    }
}

// Get all users from localStorage
function getAllUsers() {
    initializeUsers();
    return JSON.parse(localStorage.getItem('paniudtoUsers'));
}

// Add new user to localStorage
function addUser(username, password) {
    const users = getAllUsers();
    users.push({ username: username, password: password });
    localStorage.setItem('paniudtoUsers', JSON.stringify(users));
}

// Check if user exists
function userExists(username) {
    const users = getAllUsers();
    return users.find(u => u.username === username);
}

// Local dishes from Cantilan, Surigao del Sur
const cantilanDishes = [
    {
        id: 1,
        name: 'Kinilaw na Tuna',
        description: 'Fresh tuna cured in vinegar and calamansi, mixed with onions, ginger, and local herbs. A signature dish of coastal Cantilan.',
        price: '₱280',
        image: 'images/kinilaw-tuna.jpg',
        fallbackEmoji: '🐟'
    },
    {
        id: 2,
        name: 'Tinolang Isda',
        description: 'Clear fish soup with ginger, malunggay leaves, and fresh fish caught from Cantilan waters. Comfort food at its finest.',
        price: '₱220',
        image: 'images/tinolang-isda.jpg',
        fallbackEmoji: '🍲'
    },
    {
        id: 3,
        name: 'Sinuglaw',
        description: 'A fusion of sinugba (grilled pork) and kinilaw (ceviche). A perfect combination of smoky and tangy flavors.',
        price: '₱320',
        image: 'images/sinuglaw.jpg',
        fallbackEmoji: '🥩'
    },
    {
        id: 4,
        name: 'Lato Salad',
        description: 'Fresh sea grapes with tomatoes, onions, and local vinegar dressing. A healthy and refreshing seaweed delicacy.',
        price: '₱150',
        image: 'images/lato-salad.jpg',
        fallbackEmoji: '🥗'
    },
    {
        id: 5,
        name: 'Lechon Kawali Cantilan Style',
        description: 'Crispy pork belly with a unique Cantilan marinade, served with spiced vinegar and rice.',
        price: '₱380',
        image: 'images/lechon-kawali.jpg',
        fallbackEmoji: '🍖'
    },
    {
        id: 6,
        name: 'Buko Pie',
        description: 'Traditional coconut pie made with fresh coconut from local farms. A sweet ending to your meal.',
        price: '₱120',
        image: 'images/buko-pie.jpg',
        fallbackEmoji: '🥥'
    },
    {
        id: 7,
        name: 'Ginataang Langka',
        description: 'Young jackfruit cooked in coconut milk with shrimp and local spices. A creamy, flavorful vegetable dish.',
        price: '₱200',
        image: 'images/ginataang-langka.jpg',
        fallbackEmoji: '🍛'
    },
    {
        id: 8,
        name: 'Pancit Cantilan',
        description: 'Local version of pancit with fresh seafood, vegetables, and a special sauce recipe passed down through generations.',
        price: '₱180',
        image: 'images/pancit-cantilan.jpg',
        fallbackEmoji: '🍜'
    }
];

// ===== UTILITY FUNCTIONS =====

// Simple function to get current user from localStorage
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Simple function to set current user in localStorage
function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

// Simple function to clear current user
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// ===== LOGIN FUNCTIONALITY =====

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');
            
            // Simple validation
            if (!username || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            // Check credentials against stored users
            const users = getAllUsers();
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Login successful
                setCurrentUser(username);
                updateNavigation(); // Update nav immediately
                showSuccess('Login successful! Redirecting to dashboard...');
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showError('Invalid username or password');
            }
        });
    }
});

// ===== REGISTER FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageDiv = document.getElementById('register-message');
            
            // Simple validation
            if (!username || !password || !confirmPassword) {
                showRegisterMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showRegisterMessage('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showRegisterMessage('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Check if username already exists
            if (userExists(username)) {
                showRegisterMessage('Username already exists', 'error');
                return;
            }
            
            // Save user to localStorage (persistent storage)
            addUser(username, password);
            
            showRegisterMessage('Registration successful! You can now login with your credentials.', 'success');
            
            // Clear form
            registerForm.reset();
            
            // Redirect to login after delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});

// ===== DASHBOARD FUNCTIONALITY =====

// Check if user is logged in for dashboard access
function checkLoginStatus() {
    const currentUser = getCurrentUser();
    const welcomeUser = document.getElementById('welcomeUser');
    
    // If we're on the dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        if (!currentUser) {
            // Redirect to login if not logged in
            alert('Please login to access the dashboard');
            window.location.href = 'login.html';
            return;
        } else {
            // Show welcome message
            if (welcomeUser) {
                welcomeUser.textContent = `Welcome back, ${currentUser}!`;
            }
        }
    }
}

// Load dishes into the dashboard
function loadDishes() {
    const dishesGrid = document.querySelector('.dishes-grid');
    
    if (dishesGrid) {
        // Show loading message
        dishesGrid.innerHTML = '<div class="loading">Loading delicious dishes...</div>';
        
        // Simulate loading delay (like a real app might have)
        setTimeout(() => {
            dishesGrid.innerHTML = '';
            
            cantilanDishes.forEach(dish => {
                const dishCard = createDishCard(dish);
                dishesGrid.appendChild(dishCard);
            });
            
            // Add fade-in animation
            dishesGrid.classList.add('fade-in');
        }, 1000);
    }
}

// Create a dish card element
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    
    card.innerHTML = `
        <div class="dish-image">
            <img src="${dish.image}" alt="${dish.name}" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="emoji-fallback" style="display:none;">
                ${dish.fallbackEmoji}
            </div>
        </div>
        <div class="dish-content">
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
            <div class="dish-price">${dish.price}</div>
        </div>
    `;
    
    return card;
}

// ===== LOGOUT FUNCTIONALITY =====

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        clearCurrentUser();
        updateNavigation(); // Update nav immediately
        alert('You have been logged out successfully');
        window.location.href = 'index.html';
    }
}

// ===== UTILITY FUNCTIONS FOR MESSAGES =====

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.className = 'success-message';
        errorDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.className = 'error-message'; // Reset class
        }, 5000);
    }
}

function showRegisterMessage(message, type) {
    const messageDiv = document.getElementById('register-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// ===== NAVIGATION HELPER =====

// Check login status immediately when script loads (before DOM)
const currentUserOnLoad = getCurrentUser();

// Update navigation based on login status and highlight current page
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationFast();
    highlightCurrentPage();
});

// Fast navigation update - uses pre-loaded user status
function updateNavigationFast() {
    const loginButton = document.querySelector('.login-btn');
    
    if (loginButton) {
        if (currentUserOnLoad) {
            // User is logged in - show logout
            loginButton.textContent = 'Logout';
            loginButton.href = '#';
            loginButton.onclick = logout;
            loginButton.removeAttribute('href');
        } else {
            // User is not logged in - show login
            loginButton.textContent = 'Login';
            loginButton.href = 'login.html';
            loginButton.onclick = null;
        }
        
        // Mark button as ready (makes it visible via CSS)
        loginButton.classList.add('ready');
    }
}

// Update navigation to show Login/Logout based on user status (for live updates)
function updateNavigation() {
    const currentUser = getCurrentUser();
    const loginButton = document.querySelector('.login-btn');
    
    if (loginButton) {
        if (currentUser) {
            // User is logged in - show logout
            loginButton.textContent = 'Logout';
            loginButton.href = '#';
            loginButton.onclick = logout;
            loginButton.removeAttribute('href');
        } else {
            // User is not logged in - show login
            loginButton.textContent = 'Login';
            loginButton.href = 'login.html';
            loginButton.onclick = null;
        }
        
        // Ensure button is visible
        loginButton.classList.add('ready');
    }
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== SIMPLE FORM ENHANCEMENTS =====

// Add some basic form interaction improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#e74c3c';
            this.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) { // only run this on login.html
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const u = document.getElementById('username').value.trim();
      const p = document.getElementById('password').value.trim();

      try {
        const res = await fetch('data/users.json');
        const users = await res.json();

        const user = users.find(x => x.username === u && x.password === p);

        if (!user) {
          alert('Invalid username or password');
          return;
        }

        // store info in session
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('role', user.role);

        // go to dashboard
        window.location.href = 'dashboard.html';
      } catch (err) {
        console.error('Error loading users.json', err);
        alert('Login system error — check console.');
      }
    });
  }
});


// ===== CONSOLE MESSAGES FOR DEMO =====

console.log('🍽️ Paniudto Restaurant Website Loaded!');
console.log('Demo Login Credentials:');
console.log('Username: student, Password: password123');
console.log('Username: admin, Password: admin123');
console.log('Username: test, Password: test123');
console.log('---');
console.log('✅ User registration now saves to localStorage!');
console.log('New accounts will persist between page loads.');
console.log('This is an IT student project showcasing local Cantilan cuisine!');

