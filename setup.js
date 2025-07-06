#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 Configuração do Sistema de Pagamento - Alma Destilada\n');

console.log('Para configurar o envio de emails, você precisa:');
console.log('1. Ativar autenticação de 2 fatores no Gmail');
console.log('2. Gerar uma senha de app');
console.log('3. Configurar as variáveis de ambiente\n');

console.log('📧 Configuração do Email:');
console.log('- Vá para: https://myaccount.google.com/security');
console.log('- Ative "Verificação em duas etapas"');
console.log('- Vá em "Senhas de app"');
console.log('- Gere uma nova senha para "Email"');
console.log('- Use essa senha como EMAIL_PASSWORD\n');

rl.question('Digite sua senha de app do Gmail: ', (password) => {
    const envContent = `EMAIL_PASSWORD=${password}\nPORT=3000\n`;
    
    fs.writeFileSync('.env', envContent);
    
    console.log('\n✅ Arquivo .env criado com sucesso!');
    console.log('📝 Para executar o servidor:');
    console.log('   npm install');
    console.log('   npm start');
    console.log('\n🌐 O servidor estará disponível em: http://localhost:3000');
    
    rl.close();
}); 