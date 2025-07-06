# Alma Destilada - Sistema de Pagamento

Este projeto implementa um sistema de pagamento completo para a Alma Destilada, permitindo que clientes façam pedidos online e que o proprietário receba notificações por email.

## Funcionalidades

- 🛒 Carrinho de compras funcional
- 💳 Página de pagamento com formulário de dados do cliente
- 📧 Envio automático de emails para o proprietário
- 📱 Design responsivo
- 🎨 Interface moderna e intuitiva

## Estrutura do Projeto

```
Loky/
├── public/
│   ├── index.html          # Página principal da loja
│   ├── payment.html        # Página de pagamento
│   ├── CSS/
│   │   └── style.css       # Estilos da aplicação
│   ├── js/
│   │   ├── script.js       # Funcionalidades da loja
│   │   └── payment.js      # Funcionalidades de pagamento
│   └── img/
│       └── logos/          # Imagens da marca
├── server.js               # Servidor Node.js
├── package.json            # Dependências do projeto
└── README.md              # Este arquivo
```

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Email

Para que o sistema envie emails, você precisa configurar as credenciais do Gmail:

1. **Ativar Autenticação de 2 Fatores** no seu Gmail
2. **Gerar uma Senha de App**:
   - Vá para Configurações da Conta Google
   - Segurança > Verificação em duas etapas
   - Senhas de app > Gerar nova senha
3. **Configurar a variável de ambiente**:

```bash
export EMAIL_PASSWORD="sua-senha-de-app-aqui"
```

Ou crie um arquivo `.env` na raiz do projeto:

```
EMAIL_PASSWORD=sua-senha-de-app-aqui
```

### 3. Executar o Servidor

```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Como Funciona

### Fluxo de Compra

1. **Adicionar Produtos**: Cliente adiciona produtos ao carrinho na página principal
2. **Finalizar Compra**: Clica em "Finalizar Compra" no carrinho
3. **Página de Pagamento**: É redirecionado para `/payment.html` com os dados do pedido
4. **Preencher Dados**: Cliente preenche informações pessoais e escolhe forma de pagamento
5. **Enviar Pedido**: Sistema envia email para o proprietário com todos os detalhes
6. **Confirmação**: Cliente recebe confirmação de sucesso

### Email Enviado

O email contém:
- ID único do pedido
- Data e hora do pedido
- Informações completas do cliente
- Lista detalhada dos produtos
- Valor total
- Forma de pagamento escolhida
- Mensagem adicional do cliente (se houver)

## Personalização

### Alterar Email do Proprietário

No arquivo `server.js`, linha 12:

```javascript
user: 'destiladaalma@gmail.com', // Seu email
```

E na linha 45:

```javascript
to: 'destiladaalma@gmail.com', // Email que receberá os pedidos
```

### Adicionar Produtos

No arquivo `public/index.html`, adicione novos produtos seguindo o padrão:

```html
<div class="product-card">
    <div class="product-image">
        <div class="product-bg cocktail-X"></div>
    </div>
    <div class="product-info">
        <h3>Nome do Produto</h3>
        <p>Descrição do produto</p>
        <div class="product-price">R$ XX,XX</div>
        <button class="btn btn-primary add-to-cart" 
                data-id="X" 
                data-name="Nome do Produto" 
                data-price="XX.XX" 
                data-image="cocktail-X">
            Adicionar ao Carrinho
        </button>
    </div>
</div>
```

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Email**: Nodemailer
- **Estilização**: CSS Grid, Flexbox, Animações CSS

## Segurança

- ✅ Validação de formulários no frontend e backend
- ✅ Sanitização de dados de entrada
- ✅ Uso de variáveis de ambiente para credenciais
- ✅ Geração de IDs únicos para pedidos

## Deploy

### Opções de Deploy

1. **Heroku**: Conecte seu repositório GitHub
2. **Vercel**: Deploy automático do frontend
3. **DigitalOcean**: VPS para controle total
4. **Railway**: Deploy simples e rápido

### Variáveis de Ambiente para Deploy

```
EMAIL_PASSWORD=sua-senha-de-app-gmail
PORT=3000
```

## Suporte

Para dúvidas ou problemas:
- Email: destiladaalma@gmail.com
- WhatsApp: (61) 98300-7811

---

**Alma Destilada** - Cachaça Artesanal de Qualidade 🍹 