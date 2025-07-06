// Payment page functionality
class PaymentProcessor {
    constructor() {
        this.orderData = this.loadOrderFromURL();
        this.init();
    }

    init() {
        this.displayOrder();
        this.bindEvents();
    }

    loadOrderFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const orderData = urlParams.get('order');
        
        if (orderData) {
            try {
                return JSON.parse(decodeURIComponent(orderData));
            } catch (e) {
                console.error('Error parsing order data:', e);
                return null;
            }
        }
        
        // If no order data, redirect to home
        window.location.href = '/index.html';
        return null;
    }

    displayOrder() {
        if (!this.orderData || !this.orderData.items) {
            return;
        }

        const orderItemsContainer = document.getElementById('orderItems');
        const orderTotalElement = document.getElementById('orderTotal');

        // Display order items
        const itemsHTML = this.orderData.items.map(item => `
            <div class="order-item">
                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>Quantidade: ${item.quantity}</small>
                </div>
                <div>
                    <strong>R$ ${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
        `).join('');

        orderItemsContainer.innerHTML = itemsHTML;

        // Display total
        const total = this.orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    bindEvents() {
        const form = document.getElementById('paymentForm');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder();
        });

        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    async processOrder() {
        const form = document.getElementById('paymentForm');
        const submitBtn = document.getElementById('submitBtn');
        const loading = document.getElementById('loading');
        const successMessage = document.getElementById('successMessage');

        // Get form data
        const formData = new FormData(form);
        const customerData = {
            name: formData.get('customerName'),
            email: formData.get('customerEmail'),
            phone: formData.get('customerPhone'),
            address: formData.get('customerAddress'),
            message: formData.get('customerMessage'),
            paymentMethod: formData.get('paymentMethod')
        };

        // Validate required fields
        if (!customerData.name || !customerData.email || !customerData.phone || !customerData.address) {
            this.showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Show loading
        submitBtn.disabled = true;
        loading.style.display = 'block';
        form.style.display = 'none';

        try {
            // Prepare order data
            const orderData = {
                customer: customerData,
                items: this.orderData.items,
                total: this.orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                orderDate: new Date().toISOString(),
                orderId: this.generateOrderId()
            };

            // Send email to owner
            await this.sendOrderEmail(orderData);

            // Show success message
            loading.style.display = 'none';
            successMessage.style.display = 'block';

            // Clear cart from localStorage
            localStorage.removeItem('cart');

        } catch (error) {
            console.error('Error processing order:', error);
            this.showNotification('Erro ao processar o pedido. Tente novamente.', 'error');
            
            // Reset form
            submitBtn.disabled = false;
            loading.style.display = 'none';
            form.style.display = 'block';
        }
    }

    async sendOrderEmail(orderData) {
        try {
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderData })
            });

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Failed to send order');
            }
        } catch (error) {
            console.error('Error sending order:', error);
            throw error;
        }
    }



    generateOrderId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `AD-${timestamp}-${random}`.toUpperCase();
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize payment processor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PaymentProcessor();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 