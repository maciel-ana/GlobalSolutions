class NotificationSystem {
    constructor() {
        this.notification = null;
        this.isVisible = false;
        this.autoShowDelay = 3000; 
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createNotification();
            setTimeout(() => {
                this.showNotification();
            }, this.autoShowDelay);
        });
    }

    createNotification() {
        this.notification = document.createElement('div');
        this.notification.className = 'notification-alert';
        this.notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-icon">🌧️</span>
                <h4 class="notification-title">ALERTA METEOROLÓGICO</h4>
                <button class="notification-close" onclick="notificationSystem.hideNotification()">&times;</button>
            </div>
            <div class="notification-body">
                <strong>Chuvas Intensas Previstas</strong><br>
                Risco elevado de enchentes na sua região. Mantenha-se seguro e acesse informações sobre abrigos próximos.
            </div>
            <div class="notification-time">
                Atualizado às ${this.getCurrentTime()}
            </div>
            <div class="notification-click-hint">
                👆 Clique aqui para acessar informações de segurança
            </div>
        `;

        this.notification.addEventListener('click', (e) => {
            if (!e.target.classList.contains('notification-close')) {
                this.redirectToSite();
            }
        });

        document.body.appendChild(this.notification);
    }

    showNotification() {
        if (this.notification && !this.isVisible) {
            this.notification.classList.add('show', 'animate-in');
            this.isVisible = true;            setTimeout(() => {
                if (this.isVisible) {
                    this.hideNotification();
                }
            }, 12000);
        }
    }

    hideNotification() {
        if (this.notification && this.isVisible) {
            this.notification.classList.remove('show');
            this.isVisible = false;
        }
    }

    redirectToSite() {
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
            window.location.href = 'dicas.html';
        } else {
            window.location.href = 'index.html';
        }
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    setupNotificationButton() {
        const notificationBtn = document.querySelector('.notificacao__nav');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerNotification();
            });
            
            notificationBtn.title = 'Clique para ver alertas de emergência';
        }
    }

    triggerNotification() {
        if (!this.isVisible) {
            this.showNotification();
        }
    }
}

const notificationSystem = new NotificationSystem();
document.addEventListener('DOMContentLoaded', () => {
    notificationSystem.setupNotificationButton();
});

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menuGroup = document.getElementById('menuGroup');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (hamburger) hamburger.classList.toggle('active');
    if (menuGroup) menuGroup.classList.toggle('active');
    if (menuOverlay) menuOverlay.classList.toggle('active');
}

function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menuGroup = document.getElementById('menuGroup');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (hamburger) hamburger.classList.remove('active');
    if (menuGroup) menuGroup.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
}


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu__group a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});