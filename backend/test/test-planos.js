import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function testPlanosAPI() {
  try {
    console.log('🧪 Testando API de Planos Nutricionais...');
    
    // 1. Testar health check
    console.log('\n1. Testando health check...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check:', healthResponse.data);
    
    // 2. Testar login para obter token
    console.log('\n2. Fazendo login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'mariaclara@gmail.com',
      senha: '12345678'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login realizado, token obtido');
    
    // 3. Testar buscar planos
    console.log('\n3. Buscando planos nutricionais...');
    const planosResponse = await axios.get(`${BASE_URL}/nutricionista/planos-nutricionais`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Planos encontrados:', planosResponse.data);
    
    // 4. Testar criar plano
    console.log('\n4. Criando plano nutricional...');
    const createResponse = await axios.post(`${BASE_URL}/nutricionista/planos-nutricionais`, {
      id_cliente: 1,
      nome: 'Plano Teste',
      descricao: 'Plano de teste para verificar funcionamento',
      refeicoes: [
        {
          horario: '08:00',
          descricao: 'Café da manhã',
          porcoes: '1 porção'
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Plano criado:', createResponse.data);
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

testPlanosAPI();
