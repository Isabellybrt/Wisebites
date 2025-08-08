import axios from 'axios';

// Configuração base da API
const API_BASE_URL = 'http://localhost:5000/api';

// Instância do axios com configuração base
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funções de autenticação
export const authAPI = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email: string; senha: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Funções para clientes
export const clienteAPI = {
  getProfile: async () => {
    const response = await api.get('/cliente/profile');
    return response.data;
  },
  
  updateProfile: async (profileData: any) => {
    const response = await api.put('/cliente/profile', profileData);
    return response.data;
  },
  
  registerWeight: async (weightData: { peso: number; dataHora?: string }) => {
    const response = await api.post('/cliente/peso', weightData);
    return response.data;
  },
  
  getWeightHistory: async () => {
    const response = await api.get('/cliente/peso');
    return response.data;
  },
  
  registerExtraFood: async (foodData: any) => {
    const response = await api.post('/cliente/alimentos-extras', foodData);
    return response.data;
  },
  
  getExtraFoodHistory: async () => {
    const response = await api.get('/cliente/alimentos-extras');
    return response.data;
  },
  
  uploadCalorieEstimate: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('imagem', imageFile);
    
    const response = await api.post('/cliente/calorias-estimativas', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getCalorieEstimates: async () => {
    const response = await api.get('/cliente/calorias-estimativas');
    return response.data;
  },
  
  registrarRefeicao: async (refeicaoData: any) => {
    const response = await api.post('/cliente/registrar-refeicao', refeicaoData);
    return response.data;
  },
  
  getRegistrosRefeicao: async (data?: string) => {
    const params = data ? `?data=${data}` : '';
    const response = await api.get(`/cliente/registros-refeicao${params}`);
    return response.data;
  },
  
  getDashboardData: async () => {
    const response = await api.get('/cliente/dashboard');
    return response.data;
  },
};

// Funções para nutricionistas
export const nutricionistaAPI = {
  getProfile: async () => {
    const response = await api.get('/nutricionista/profile');
    return response.data;
  },
  
  updateProfile: async (profileData: any) => {
    const response = await api.put('/nutricionista/profile', profileData);
    return response.data;
  },
  
  getClients: async () => {
    const response = await api.get('/nutricionista/clientes');
    return response.data;
  },
  
  getClientDetails: async (clientId: number) => {
    const response = await api.get(`/nutricionista/clientes/${clientId}`);
    return response.data;
  },
  
  createNutritionalPlan: async (planData: any) => {
    const response = await api.post('/nutricionista/planos-nutricionais', planData);
    return response.data;
  },
  
  updateNutritionalPlan: async (planId: number, planData: any) => {
    const response = await api.put(`/nutricionista/planos-nutricionais/${planId}`, planData);
    return response.data;
  },
  
  getPlanos: async () => {
    const response = await api.get('/nutricionista/planos-nutricionais');
    return response.data;
  },
  
  associarPlano: async (data: { id_cliente: number; id_planoNutricional: number }) => {
    const response = await api.post('/nutricionista/associar-plano', data);
    return response.data;
  },
  
  getAppointments: async () => {
    const response = await api.get('/nutricionista/atendimentos');
    return response.data;
  },
  
  createAppointment: async (appointmentData: any) => {
    const response = await api.post('/nutricionista/atendimentos', appointmentData);
    return response.data;
  },
  
  cadastrarPaciente: async (pacienteData: any) => {
    const response = await api.post('/nutricionista/cadastrar-paciente', pacienteData);
    return response.data;
  },
  
  getHistoricoRefeicoesPaciente: async (id_cliente: number) => {
    const response = await api.get(`/nutricionista/clientes/${id_cliente}/historico-refeicoes`);
    return response.data;
  },
  
  getDashboardData: async () => {
    const response = await api.get('/nutricionista/dashboard');
    return response.data;
  },
};

// Funções para alimentos
export const alimentosAPI = {
  getAll: async () => {
    const response = await api.get('/alimentos');
    return response.data;
  },
  
  search: async (query: string) => {
    const response = await api.get(`/alimentos/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/alimentos/${id}`);
    return response.data;
  },
  
  create: async (foodData: any) => {
    const response = await api.post('/alimentos', foodData);
    return response.data;
  },
  
  update: async (id: number, foodData: any) => {
    const response = await api.put(`/alimentos/${id}`, foodData);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/alimentos/${id}`);
    return response.data;
  },
};

export default api;
