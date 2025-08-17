// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const modals = document.querySelectorAll('.modal');
const modalCloseButtons = document.querySelectorAll('.modal-close');
const addOrgBtn = document.querySelector('#add-org-btn');

// Debug logging
console.log('Mobile menu toggle element:', mobileMenuToggle);
console.log('Nav menu element:', navMenu);

// Mobile Menu Toggle
if (mobileMenuToggle) {
    console.log('Mobile menu toggle found, adding event listener');
    mobileMenuToggle.addEventListener('click', (e) => {
        console.log('Mobile menu toggle clicked');
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.toggle('active');
        console.log('Nav menu active state:', navMenu.classList.contains('active'));
    });
} else {
    console.error('Mobile menu toggle element not found!');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            console.log('Mobile menu closed (clicked outside)');
        }
    }
});

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Mobile menu toggle element:', mobileMenuToggle);
    console.log('Nav menu element:', navMenu);
    
    if (!mobileMenuToggle || !navMenu) {
        console.error('Mobile menu elements not found!');
        return;
    }

    // Toggle button click event
    mobileMenuToggle.addEventListener('click', function(e) {
        console.log('Mobile menu toggle clicked');
        e.preventDefault();
        e.stopPropagation();
        
        navMenu.classList.toggle('mobile-active');
        console.log('Nav menu mobile-active state:', navMenu.classList.contains('mobile-active'));
    });

    // Menü dışına tıklandığında kapat
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('mobile-active')) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('mobile-active');
                console.log('Mobile menu closed (clicked outside)');
            }
        }
    });

    // Nav link tıklandığında menüyü kapat (mobilde)
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                console.log('Mobile menu closed (nav link clicked)');
            }
        });
    });

    // Ekran boyutu değiştiğinde menüyü kapat
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            console.log('Mobile menu closed (window resized)');
        }
    });
}
document.addEventListener('DOMContentLoaded', initMobileMenu);
// Close mobile menu when clicking on a nav link
document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link') && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        console.log('Mobile menu closed (nav link clicked)');
    }
});

// Modal Management
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function hideAllModals() {
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Modal Event Listeners
modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            hideModal(modal.id);
        }
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal.id);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideAllModals();
    }
});

// Add Organization Modal
if (addOrgBtn) {
    addOrgBtn.addEventListener('click', () => {
        showModal('add-org-modal');
    });
}

// Modal Action Buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-action="cancel"]')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            hideModal(modal.id);
        }
    }
    
    if (e.target.matches('[data-action="save"]')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            // Close modal after save action
            hideModal(modal.id);
        }
    }
});

// Step Management - UI Only
document.addEventListener('click', (e) => {
    // Edit step button - Show modal
    if (e.target.closest('.btn-edit')) {
        const modal = document.getElementById('edit-step-modal');
        if (modal) {
            showModal('edit-step-modal');
        }
    }
    
    // Complete step button - Visual feedback only
    if (e.target.closest('.btn-complete')) {
        const stepItem = e.target.closest('.step-item');
        const button = e.target.closest('.btn-complete');
        
        if (!stepItem.classList.contains('completed')) {
            stepItem.classList.add('completed');
            button.disabled = true;
        }
    }
});

// Form Submission - UI Only
const taskForm = document.querySelector('.task-form');
if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const taskName = document.getElementById('task-name').value.trim();
        const stepCount = document.getElementById('step-count').value;
        const organization = document.getElementById('organization').value;
        const importance = document.getElementById('importance').value;
        const urgency = document.getElementById('urgency').value;
        
        if (taskName && stepCount && organization && importance && urgency) {
            // Show success message
            alert('Görev başarıyla oluşturuldu!');
            
            // Reset form
            taskForm.reset();
            
            // Navigate to home page
            window.location.href = 'index.html';
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    });
}

// Add Step Form - UI Only
const addStepForm = document.querySelector('.add-step-form');
if (addStepForm) {
    addStepForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const stepInput = addStepForm.querySelector('input');
        const stepName = stepInput.value.trim();
        
        if (stepName) {
            // Show success message
            alert('Adım başarıyla eklendi!');
            
            // Reset form
            stepInput.value = '';
        } else {
            alert('Lütfen adım adını girin.');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('TaskMaster frontend başlatıldı!');
});

// Form validation - UI Only
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger-color)';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Lütfen tüm gerekli alanları doldurun.');
            }
        });
    });
});

// TaskMaster Application Script

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Organization form handling
    const organizationForm = document.querySelector('.organization-form');
    if (organizationForm) {
        organizationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(organizationForm);
            const orgData = {
                name: formData.get('org-name')
            };
            
            // Here you would typically send the data to a server
            console.log('New organization data:', orgData);
            
            // Show success message
            showNotification('Kurum başarıyla eklendi!', 'success');
            
            // Reset form
            organizationForm.reset();
        });
    }

    // Add organization modal functionality (for organizations.html)
    const addOrgBtn = document.getElementById('add-org-btn');
    const addOrgModal = document.getElementById('add-org-modal');
    
    if (addOrgBtn && addOrgModal) {
        addOrgBtn.addEventListener('click', function() {
            addOrgModal.classList.add('active');
        });
        
        // Close modal when clicking on close button
        const modalClose = addOrgModal.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                addOrgModal.classList.remove('active');
            });
        }
        
        // Close modal when clicking outside
        addOrgModal.addEventListener('click', function(e) {
            if (e.target === addOrgModal) {
                addOrgModal.classList.remove('active');
            }
        });
        
        // Handle modal actions
        const modalActions = addOrgModal.querySelectorAll('[data-action]');
        modalActions.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                if (action === 'save') {
                    const orgName = document.getElementById('new-org-name').value;
                    if (orgName.trim()) {
                        // Here you would typically send the data to a server
                        console.log('New organization:', orgName);
                        showNotification('Kurum başarıyla eklendi!', 'success');
                        document.getElementById('new-org-name').value = '';
                        addOrgModal.classList.remove('active');
                    } else {
                        showNotification('Lütfen kurum adını girin!', 'error');
                    }
                } else if (action === 'cancel') {
                    addOrgModal.classList.remove('active');
                    document.getElementById('new-org-name').value = '';
                }
            });
        });
    }

    // Task actions
    const taskEditBtns = document.querySelectorAll('.btn-edit');
    
    taskEditBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const taskName = this.closest('.task-row').querySelector('.task-name h4').textContent;
            showNotification(`"${taskName}" görevi düzenleniyor...`, 'info');
        });
    });

    // Organization item actions
    const orgEditBtns = document.querySelectorAll('.organization-item .btn-edit');
    
    orgEditBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const orgName = this.closest('.organization-item').querySelector('.org-info h4').textContent;
            showNotification(`"${orgName}" kurumu düzenleniyor...`, 'info');
        });
    });

    // Add step functionality
    const addStepForm = document.querySelector('.add-step-form');
    if (addStepForm) {
        addStepForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const stepInput = this.querySelector('input[type="text"]');
            const stepText = stepInput.value.trim();
            
            if (stepText) {
                addNewStep(stepText);
                stepInput.value = '';
                showNotification('Yeni adım eklendi!', 'success');
            }
        });
    }

    // Enhanced hover effects for task rows
    const taskRows = document.querySelectorAll('.task-row');
    taskRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Helper function to add new step
function addNewStep(stepText) {
    const stepsList = document.querySelector('.steps-list');
    if (!stepsList) return;
    
    const stepCount = stepsList.children.length + 1;
    
    const newStep = document.createElement('div');
    newStep.className = 'step-item';
    newStep.innerHTML = `
        <div class="step-content">
            <div class="step-number">${stepCount}</div>
            <div class="step-text">${stepText}</div>
        </div>
        <div class="step-actions">
            <button class="btn btn-icon btn-edit" title="Düzenle">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-icon btn-delete" title="Sil">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    stepsList.appendChild(newStep);
    
    // Add event listeners to new step
    const editBtn = newStep.querySelector('.btn-edit');
    const deleteBtn = newStep.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', function() {
        const stepText = this.closest('.step-item').querySelector('.step-text').textContent;
        showNotification(`"${stepText}" adımı düzenleniyor...`, 'info');
    });
    
    deleteBtn.addEventListener('click', function() {
        const stepItem = this.closest('.step-item');
        const stepText = stepItem.querySelector('.step-text').textContent;
        
        if (confirm(`"${stepText}" adımını silmek istediğinizden emin misiniz?`)) {
            stepItem.remove();
            showNotification(`"${stepText}" adımı silindi!`, 'success');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--border-color);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(100%);
        transition: var(--transition);
        border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'info'}-color);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Close on click outside
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    });
}

// Helper function to get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger-color)';
            input.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.2)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
            input.style.boxShadow = 'none';
        }
    });
    
    return isValid;
}

// Add form validation to organization form
document.addEventListener('DOMContentLoaded', function() {
    const organizationForm = document.querySelector('.organization-form');
    if (organizationForm) {
        const requiredInputs = organizationForm.querySelectorAll('input[required], select[required]');
        
        requiredInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.style.borderColor = 'var(--danger-color)';
                    this.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.2)';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                    this.style.boxShadow = 'none';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'var(--primary-color)';
                    this.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.2)';
                }
            });
        });
    }
});
