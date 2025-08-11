import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function testSimple() {
  try {
    console.log('🧪 Teste simples da API...');
    
    // 1. Testar health check
    console.log('\n1. Testando health check...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check:', healthResponse.data);
    
    // 2. Testar endpoint de planos sem token (deve dar erro de autenticação)
    console.log('\n2. Testando endpoint de planos sem token...');
    try {
      const planosResponse = await axios.get(`${BASE_URL}/nutricionista/planos-nutricionais`);
      console.log('❌ Não deveria funcionar sem token:', planosResponse.data);
    } catch (error) {
      console.log('✅ Erro esperado (sem autenticação):', error.response?.status, error.response?.data?.message);
    }
    
    // 3. Testar criação de plano sem token
    console.log('\n3. Testando criação de plano sem token...');
    try {
      const createResponse = await axios.post(`${BASE_URL}/nutricionista/planos-nutricionais`, {
        id_cliente: 1,
        nome: 'Plano Teste',
        descricao: 'Plano de teste',
        refeicoes: []
      });
      console.log('❌ Não deveria funcionar sem token:', createResponse.data);
    } catch (error) {
      console.log('✅ Erro esperado (sem autenticação):', error.response?.status, error.response?.data?.message);
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

testSimple();
