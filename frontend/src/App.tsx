
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "@/components/auth/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NutricionistaDashboard from "./pages/nutricionista/Dashboard";
import PacienteDashboard from "./pages/paciente/Dashboard";
import PlanoAlimentar from "./pages/paciente/PlanoAlimentar";
import RegistrarRefeicao from "./pages/paciente/RegistrarRefeicao";
import NotFound from "./pages/NotFound";

// Importações para as páginas do Nutricionista
import Pacientes from "./pages/nutricionista/Pacientes";
import CadastrarPaciente from "./pages/nutricionista/CadastrarPaciente";
import Planos from "./pages/nutricionista/Planos";
import Mensagens from "./pages/nutricionista/Mensagens";
import ConfiguracoesNutricionista from "./pages/nutricionista/Configuracoes";
import HistoricoPaciente from "./pages/nutricionista/HistoricoPaciente";

// Importações para as páginas do Paciente
import MensagensPaciente from "./pages/paciente/Mensagens";
import ConfiguracoesPaciente from "./pages/paciente/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Rotas do Nutricionista - Protegidas */}
            <Route path="/nutricionista" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <NutricionistaDashboard />
              </ProtectedRoute>
            } />
            <Route path="/nutricionista/pacientes" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <Pacientes />
              </ProtectedRoute>
            } />
            <Route path="/nutricionista/pacientes/:id_cliente/historico" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <HistoricoPaciente />
              </ProtectedRoute>
            } />
            <Route path="/nutricionista/cadastrar-paciente" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <CadastrarPaciente />
              </ProtectedRoute>
            } />
            <Route path="/nutricionista/planos" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <Planos />
              </ProtectedRoute>
            } />
            <Route path="/nutricionista/mensagens" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <Mensagens />
              </ProtectedRoute>
            } />
            <Route path="/nutricionista/configuracoes" element={
              <ProtectedRoute requiredUserType="nutricionista">
                <ConfiguracoesNutricionista />
              </ProtectedRoute>
            } />
            
            {/* Rotas do Paciente - Protegidas */}
            <Route path="/paciente" element={
              <ProtectedRoute requiredUserType="paciente">
                <PacienteDashboard />
              </ProtectedRoute>
            } />
            <Route path="/paciente/plano" element={
              <ProtectedRoute requiredUserType="paciente">
                <PlanoAlimentar />
              </ProtectedRoute>
            } />
            <Route path="/paciente/registrar" element={
              <ProtectedRoute requiredUserType="paciente">
                <RegistrarRefeicao />
              </ProtectedRoute>
            } />
            <Route path="/paciente/mensagens" element={
              <ProtectedRoute requiredUserType="paciente">
                <MensagensPaciente />
              </ProtectedRoute>
            } />
            <Route path="/paciente/configuracoes" element={
              <ProtectedRoute requiredUserType="paciente">
                <ConfiguracoesPaciente />
              </ProtectedRoute>
            } />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
