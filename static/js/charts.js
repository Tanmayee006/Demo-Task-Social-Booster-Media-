// Charts.js - Custom JavaScript for Task Dashboard

// Global variables
let charts = {};
let dashboardData = {
    tasks: [],
    summary: {},
    weather: {}
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Initializing Task Dashboard...');
    
    // Load mock data
    loadMockData();
    
    // Initialize charts if on reports page
    if (document.getElementById('completionChart')) {
        initializeReportsCharts();
    }
    
    // Add animation classes to cards
    animateCards();
    
    console.log('Dashboard initialized successfully!');
}

// Setup event listeners
function setupEventListeners() {
    // Task form listeners
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
        setupTaskFormListeners();
    }
    
    // Filter listeners
    setupFilterListeners();
    
    // Weather listeners
    setupWeatherListeners();
    
    // Search functionality
    setupSearchFunctionality();
}

// Load mock data for demonstration
function loadMockData() {
    dashboardData.tasks = [
        {
            id: 1,
            title: 'Complete Project Demo',
            description: 'Prepare comprehensive demo for client presentation',
            priority: 'high',
            status: 'pending',
            location: 'New York',
            created_at: '2024-01-15',
            due_date: '2024-01-20'
        },
        {
            id: 2,
            title: 'Database Setup',
            description: 'Configure PostgreSQL database connection',
            priority: 'medium',
            status: 'completed',
            location: 'London',
            created_at: '2024-01-10',
            completed_at: '2024-01-14'
        },
        {
            id: 3,
            title: 'Update Documentation',
            description: 'Update API documentation and README',
            priority: 'low',
            status: 'in_progress',
            location: 'Tokyo',
            created_at: '2024-01-12'
        },
        {
            id: 4,
            title: 'Weather API Integration',
            description: 'Integrate OpenWeatherMap API for location-based data',
            priority: 'medium',
            status: 'completed',
            location: 'Paris',
            created_at: '2024-01-08',
            completed_at: '2024-01-12'
        }
    ];
    
    dashboardData.summary = {
        total_tasks: dashboardData.tasks.length,
        completed_tasks: dashboardData.tasks.filter(t => t.status === 'completed').length,
        pending_tasks: dashboardData.tasks.filter(t => t.status === 'pending').length,
        in_progress_tasks: dashboardData.tasks.filter(t => t.status === 'in_progress').length,
        completion_rate: 20
    };
    
    updateSummaryCards();
}

// Update summary cards with data
function updateSummaryCards() {
    const elements = {
        'total-tasks': dashboardData.summary.total_tasks,
        'completed-tasks': dashboardData.summary.completed_tasks,
        'pending-tasks': dashboardData.summary.pending_tasks,
        'overdue-tasks': 1 // Mock overdue count
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            animateNumber(element, 0, value, 1000);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Setup task form listeners
function setupTaskFormListeners() {
    const form = document.getElementById('task-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', updateTaskPreview);
    });
}

// Update task preview in modal
function updateTaskPreview() {
    const title = document.getElementById('task-title')?.value || '';
    const priority = document.getElementById('task-priority')?.value || 'medium';
    const location = document.getElementById('task-location')?.value || '';
    
    if (title.length > 0) {
        console.log(`Task Preview: ${title} - Priority: ${priority} - Location: ${location}`);
    }
}

// Setup filter listeners
function setupFilterListeners() {
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', applyFilters);
    }
}

// Apply filters to task list
function applyFilters() {
    const statusFilter = document.getElementById('status-filter')?.value || '';
    const priorityFilter = document.getElementById('priority-filter')?.value || '';
    const searchTerm = document.getElementById('search-tasks')?.value?.toLowerCase() || '';
    
    let filteredTasks = dashboardData.tasks;
    
    if (statusFilter) {
        filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }
    
    if (priorityFilter) {
        filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }
    
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );
    }
    
    updateTaskList(filteredTasks);
    console.log(`Filters applied. Showing ${filteredTasks.length} tasks.`);
}

// Update task list display
function updateTaskList(tasks) {
    const taskListElement = document.getElementById('task-list');
    if (!taskListElement) return;
    
    if (tasks.length === 0) {
        taskListElement.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No tasks found</h5>
                <p class="text-muted">Try adjusting your filters or create a new task</p>
            </div>
        `;
        return;
    }
    
    const tasksHtml = tasks.map(task => createTaskCard(task)).join('');
    taskListElement.innerHTML = tasksHtml;
}

// Create task card HTML
function createTaskCard(task) {
    const priorityIcons = {
        low: '🟢',
        medium: '🟡',
        high: '🔴',
        urgent: '🚨'
    };
    
    const statusIcons = {
        pending: '📋',
        in_progress: '⚡',
        completed: '✅',
        cancelled: '❌'
    };
    
    return `
        <div class="task-item card mb-3 priority-${task.priority} ${task.status ? 'status-' + task.status.replace('_', '-') : ''}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="card-title mb-1">${escapeHtml(task.title)}</h6>
                        ${task.description ? `<p class="card-text text-muted small mb-2">${escapeHtml(task.description.substring(0, 100))}${task.description.length > 100 ? '...' : ''}</p>` : ''}
                        <div class="d-flex gap-2">
                            <span class="badge bg-${getPriorityColor(task.priority)}">${priorityIcons[task.priority]} ${task.priority}</span>
                            <span class="badge bg-${getStatusColor(task.status)}">${statusIcons[task.status]} ${task.status.replace('_', ' ')}</span>
                            ${task.location ? `<span class="badge bg-info"><i class="fas fa-map-marker-alt me-1"></i>${escapeHtml(task.location)}</span>` : ''}
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="fas fa-cog"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            ${task.status !== 'completed' ? `
                                <li><a class="dropdown-item" href="#" onclick="markTaskComplete(${task.id})">
                                    <i class="fas fa-check text-success me-2"></i>Mark Complete
                                </a></li>
                            ` : ''}
                            ${task.location ? `
                                <li><a class="dropdown-item" href="#" onclick="checkTaskWeather('${task.location}')">
                                    <i class="fas fa-cloud-sun text-info me-2"></i>Check Weather
                                </a></li>
                            ` : ''}
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="deleteTask(${task.id})">
                                <i class="fas fa-trash me-2"></i>Delete
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup weather listeners
function setupWeatherListeners() {
    const weatherButton = document.getElementById('get-weather');
    const weatherInput = document.getElementById('weather-city');
    
    if (weatherButton) {
        weatherButton.addEventListener('click', getWeather);
    }
    
    if (weatherInput) {
        weatherInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getWeather();
            }
        });
    }
}

// Get weather information
function getWeather() {
    const cityInput = document.getElementById('weather-city');
    const weatherInfo = document.getElementById('weather-info');
    
    if (!cityInput || !weatherInfo) return;
    
    const city = cityInput.value.trim();
    if (!city) {
        showAlert('Please enter a city name', 'warning');
        return;
    }
    
    // Show loading state
    weatherInfo.innerHTML = `
        <div class="text-center">
            <div class="spinner-border spinner-border-sm text-white mb-2"></div>
            <p class="mb-0">Loading weather data...</p>
        </div>
    `;
    
    // Simulate API call with mock data
    setTimeout(() => {
        const mockWeatherData = {
            city: city,
            temperature: Math.floor(Math.random() * 30 + 5),
            description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 50 + 30),
            wind: Math.floor(Math.random() * 20 + 5)
        };
        
        displayWeatherInfo(mockWeatherData);
    }, 1000);
}

// Display weather information
function displayWeatherInfo(data) {
    const weatherInfo = document.getElementById('weather-info');
    if (!weatherInfo) return;
    
    weatherInfo.innerHTML = `
        <div class="text-center">
            <div class="mb-3">
                <h5>${data.city}</h5>
                <div class="temperature-display mb-2">${data.temperature}°C</div>
                <p class="mb-3">${data.description}</p>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="bg-white bg-opacity-25 rounded p-2 mb-2">
                        <i class="fas fa-tint d-block mb-1"></i>
                        <small>Humidity</small>
                        <div class="fw-bold">${data.humidity}%</div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="bg-white bg-opacity-25 rounded p-2 mb-2">
                        <i class="fas fa-wind d-block mb-1"></i>
                        <small>Wind</small>
                        <div class="fw-bold">${data.wind} m/s</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showAlert(`Weather loaded for ${data.city}`, 'success');
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-tasks');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
    }
}

// Initialize reports charts
function initializeReportsCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    console.log('Initializing reports charts...');
    
    // Set Chart.js global defaults
    Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
    Chart.defaults.plugins.legend.display = false;
    
    // Initialize all charts
    setTimeout(() => {
        createCompletionTrendChart();
        createPriorityDistributionChart();
        createStatusDistributionChart();
        createLocationAnalyticsChart();
    }, 100);
}

// Create completion trend chart
function createCompletionTrendChart() {
    const ctx = document.getElementById('completionChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    
    // Sample data for the last 7 days
    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        data.push(Math.floor(Math.random() * 8) + 2); // Random data between 2-10
    }
    
    charts.completion = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tasks Completed',
                data: data,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#28a745',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 10,
                    displayColors: false
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' }
                }
            }
        }
    });
}

// Create priority distribution chart
function createPriorityDistributionChart() {
    const ctx = document.getElementById('priorityChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    
    charts.priority = new Chart(chartCtx, {
        type: 'doughnut',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                data: [8, 12, 4],
                backgroundColor: ['#dc3545', '#ffc107', '#28a745'],
                hoverBackgroundColor: ['#c82333', '#e0a800', '#218838'],
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} tasks (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Create status distribution chart
function createStatusDistributionChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    
    charts.status = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
            datasets: [{
                label: 'Tasks',
                data: [6, 5, 12, 1],
                backgroundColor: ['#6c757d80', '#007bff80', '#28a74580', '#dc354580'],
                borderColor: ['#6c757d', '#007bff', '#28a745', '#dc3545'],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 10
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' }
                }
            }
        }
    });
}

// Create location analytics chart
function createLocationAnalyticsChart() {
    const ctx = document.getElementById('locationChart');
    if (!ctx) return;
    
    const chartCtx = ctx.getContext('2d');
    
    charts.location = new Chart(chartCtx, {
        type: 'bar',
        data: {
            labels: ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'],
            datasets: [{
                label: 'Tasks',
                data: [8, 6, 4, 3, 3],
                backgroundColor: ['#FF638480', '#36A2EB80', '#FFCE5680', '#4BC0C080', '#9966FF80'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 10
                }
            },
            scales: {
                x: { grid: { display: false } },
                y: { 
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' }
                }
            }
        }
    });
}

// Task management functions
function markTaskComplete(taskId) {
    const task = dashboardData.tasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'completed';
        task.completed_at = new Date().toISOString();
        showAlert(`Task "${task.title}" marked as completed!`, 'success');
        applyFilters(); // Refresh the task list
        updateSummaryCards(); // Update summary statistics
    }
}

function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
        return;
    }
    
    const taskIndex = dashboardData.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const deletedTask = dashboardData.tasks.splice(taskIndex, 1)[0];
        showAlert(`Task "${deletedTask.title}" deleted successfully`, 'info');
        applyFilters(); // Refresh the task list
        updateSummaryCards(); // Update summary statistics
    }
}

function checkTaskWeather(location) {
    const weatherInput = document.getElementById('weather-city');
    if (weatherInput) {
        weatherInput.value = location;
        getWeather();
        showAlert(`Checking weather for ${location}...`, 'info');
    }
}

// Save new task
function saveTask() {
    const title = document.getElementById('task-title')?.value?.trim();
    const priority = document.getElementById('task-priority')?.value || 'medium';
    const description = document.getElementById('task-description')?.value?.trim();
    const location = document.getElementById('task-location')?.value?.trim();
    const dueDate = document.getElementById('task-due-date')?.value;
    
    // Validation
    if (!title) {
        showAlert('Please enter a task title', 'warning');
        return;
    }
    
    if (title.length < 3) {
        showAlert('Task title must be at least 3 characters long', 'warning');
        return;
    }
    
    // Create new task
    const newTask = {
        id: Date.now(), // Simple ID generation
        title: title,
        description: description,
        priority: priority,
        status: 'pending',
        location: location,
        due_date: dueDate,
        created_at: new Date().toISOString()
    };
    
    // Add to tasks array
    dashboardData.tasks.push(newTask);
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    if (modal) {
        modal.hide();
    }
    
    const form = document.getElementById('task-form');
    if (form) {
        form.reset();
    }
    
    // Refresh UI
    applyFilters();
    updateSummaryCards();
    
    showAlert(`Task "${title}" created successfully! 🎉`, 'success');
}

// Animation functions
function animateCards() {
    const cards = document.querySelectorAll('.card, .summary-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility functions
function getPriorityColor(priority) {
    const colors = {
        low: 'success',
        medium: 'warning', 
        high: 'danger',
        urgent: 'dark'
    };
    return colors[priority] || 'secondary';
}

function getStatusColor(status) {
    const colors = {
        pending: 'secondary',
        in_progress: 'primary',
        completed: 'success',
        cancelled: 'danger'
    };
    return colors[status] || 'secondary';
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Alert system
function showAlert(message, type = 'info', duration = 4000) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alertId = 'alert-' + Date.now();
    const alert = document.createElement('div');
    alert.id = alertId;
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed custom-alert`;
    alert.style.cssText = `
        top: 20px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 350px; 
        max-width: 500px;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    `;
    
    const icons = {
        success: 'fas fa-check-circle text-success',
        danger: 'fas fa-exclamation-circle text-danger',
        warning: 'fas fa-exclamation-triangle text-warning',
        info: 'fas fa-info-circle text-info'
    };
    
    alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${icons[type] || icons.info} me-2 fs-5"></i>
            <div class="flex-grow-1">${message}</div>
            <button type="button" class="btn-close ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (document.getElementById(alertId)) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => alert.remove(), 300);
        }
    }, duration);
}

// Data refresh functions
function refreshDashboard() {
    console.log('Refreshing dashboard data...');
    loadMockData();
    applyFilters();
    showAlert('Dashboard refreshed successfully! 🔄', 'success');
}

function refreshCharts() {
    console.log('Refreshing charts...');
    
    // Destroy existing charts
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    
    // Reinitialize charts
    setTimeout(() => {
        initializeReportsCharts();
        showAlert('Charts refreshed with latest data! 📊', 'success');
    }, 500);
}

// Export functionality
function exportReport() {
    const reportData = {
        summary: dashboardData.summary,
        tasks: dashboardData.tasks,
        exportedAt: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `task-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showAlert('Report exported successfully! 💾', 'success');
}

// Performance monitoring
function logPerformance(label, startTime) {
    const endTime = performance.now();
    console.log(`${label}: ${(endTime - startTime).toFixed(2)}ms`);
}

// Error handling
function handleError(error, context = 'Unknown') {
    console.error(`Error in ${context}:`, error);
    showAlert(`Something went wrong in ${context}. Please try again.`, 'danger');
}

// Theme management
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
    
    showAlert(`Switched to ${isDark ? 'light' : 'dark'} theme`, 'info');
}

// Responsive utilities
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Window resize handler
window.addEventListener('resize', debounce(() => {
    // Resize charts if they exist
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
}, 250));

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N = New task
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        const modal = document.getElementById('taskModal');
        if (modal) {
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    }
    
    // Ctrl/Cmd + R = Refresh (prevent default browser refresh)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshDashboard();
    }
    
    // Escape = Close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        });
    }
});

// Print functionality
function printReport() {
    window.print();
}

// Share functionality
function shareReport() {
    if (navigator.share) {
        navigator.share({
            title: 'Task Dashboard Report',
            text: 'Check out my task management statistics!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showAlert('Report URL copied to clipboard!', 'success');
        }).catch(() => {
            showAlert('Could not copy URL to clipboard', 'warning');
        });
    }
}

// Initialize tooltips and popovers (Bootstrap)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.card, .summary-card').forEach(el => {
        observer.observe(el);
    });
};

// Call animation observer after DOM load
document.addEventListener('DOMContentLoaded', observeElements);

// Export functions for global access
window.TaskDashboard = {
    refreshDashboard,
    refreshCharts,
    exportReport,
    saveTask,
    markTaskComplete,
    deleteTask,
    checkTaskWeather,
    getWeather,
    showAlert,
    toggleTheme,
    printReport,
    shareReport
};

console.log('Task Dashboard Charts.js loaded successfully! 🚀');



