const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'destiladaalma@gmail.com', // Replace with your email
        pass: process.env.EMAIL_PASSWORD // Set this as environment variable
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

app.get('/test-payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test-payment.html'));
});

// Email endpoint
app.post('/api/send-order', async (req, res) => {
    try {
        const { orderData } = req.body;
        
        // Format email content
        const itemsList = orderData.items.map(item => 
            `- ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const paymentMethodText = {
            'pix': 'PIX',
            'transfer': 'Transferência Bancária',
            'cash': 'Dinheiro na Entrega'
        };

        const emailContent = `
Novo Pedido Recebido!

ID do Pedido: ${orderData.orderId}
Data: ${new Date(orderData.orderDate).toLocaleString('pt-BR')}

INFORMAÇÕES DO CLIENTE:
Nome: ${orderData.customer.name}
Email: ${orderData.customer.email}
Telefone: ${orderData.customer.phone}
Endereço: ${orderData.customer.address}
Forma de Pagamento: ${paymentMethodText[orderData.customer.paymentMethod]}

ITENS DO PEDIDO:
${itemsList}

TOTAL: R$ ${orderData.total.toFixed(2)}

MENSAGEM DO CLIENTE:
${orderData.customer.message || 'Nenhuma mensagem adicional.'}

---
Este email foi enviado automaticamente pelo site Alma Destilada.
        `;

        // Send email
        const mailOptions = {
            from: 'destiladaalma@gmail.com',
            to: 'arrsevv@proton.me',
            subject: `Novo Pedido - ${orderData.orderId}`,
            text: emailContent,
            html: emailContent.replace(/\n/g, '<br>')
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Order sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Error sending order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 