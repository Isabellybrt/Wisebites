-- Script para inserir dados de exemplo no banco WiseBites
-- Execute este script após criar as tabelas

-- Inserir alimentos de exemplo
INSERT INTO Alimento (nome, calorias) VALUES
('Arroz Branco', 130),
('Arroz Integral', 120),
('Feijão Preto', 77),
('Frango Grelhado', 165),
('Salmão', 208),
('Atum', 144),
('Ovo', 155),
('Leite Desnatado', 42),
('Iogurte Natural', 59),
('Queijo Cottage', 98),
('Banana', 89),
('Maçã', 52),
('Laranja', 47),
('Brócolis', 34),
('Espinafre', 23),
('Cenoura', 41),
('Batata', 77),
('Aveia', 389),
('Pão Integral', 247),
('Azeite de Oliva', 884);

-- Inserir usuários de exemplo
INSERT INTO Usuario (nome, email, senha, tipo_usuario, telefone) VALUES
('João Silva', 'joao@email.com', '$2a$10$rQZ9K8mN2pL1sX3vB4cF5gH6jK7lM8nO9pQ0rS1tU2vW3xY4zA5bC6dE7fG8hI9jJ0kK1lL2mM3nN4oO5pP6qQ7rR8sS9tT0uU1vV2wW3xX4yY5zZ', 'cliente', '(11) 99999-9999'),
('Maria Santos', 'maria@email.com', '$2a$10$rQZ9K8mN2pL1sX3vB4cF5gH6jK7lM8nO9pQ0rS1tU2vW3xY4zA5bC6dE7fG8hI9jJ0kK1lL2mM3nN4oO5pP6qQ7rR8sS9tT0uU1vV2wW3xX4yY5zZ', 'cliente', '(11) 88888-8888'),
('Dr. Carlos Nutri', 'carlos@nutri.com', '$2a$10$rQZ9K8mN2pL1sX3vB4cF5gH6jK7lM8nO9pQ0rS1tU2vW3xY4zA5bC6dE7fG8hI9jJ0kK1lL2mM3nN4oO5pP6qQ7rR8sS9tT0uU1vV2wW3xX4yY5zZ', 'nutricionista', '(11) 77777-7777'),
('Dra. Ana Nutri', 'ana@nutri.com', '$2a$10$rQZ9K8mN2pL1sX3vB4cF5gH6jK7lM8nO9pQ0rS1tU2vW3xY4zA5bC6dE7fG8hI9jJ0kK1lL2mM3nN4oO5pP6qQ7rR8sS9tT0uU1vV2wW3xX4yY5zZ', 'nutricionista', '(11) 66666-6666');

-- Inserir perfis de clientes
INSERT INTO Cliente (id_cliente, idade, pesoAtual, altura, restricoes, objetivo) VALUES
(1, 30, 75.5, 1.75, 'Lactose', 'Perder peso'),
(2, 25, 65.0, 1.65, 'Glúten', 'Ganhar massa muscular');

-- Inserir perfis de nutricionistas
INSERT INTO Nutricionista (id_nutricionista, especialidade) VALUES
(3, 'Nutrição Esportiva'),
(4, 'Nutrição Clínica');

-- Inserir histórico alimentar para clientes
INSERT INTO HistoricoAlimentar (id_cliente) VALUES
(1),
(2);

-- Inserir alimentos extras de exemplo
INSERT INTO AlimentoExtra (id_historicoAlimentar, descricao, horario, quantidade) VALUES
(1, 'Bolo de chocolate', '2024-01-15 15:30:00', '1 fatia'),
(1, 'Refrigerante', '2024-01-15 12:00:00', '350ml'),
(2, 'Sorvete', '2024-01-14 20:00:00', '1 bola');

-- Inserir registros de peso de exemplo
INSERT INTO PesoRegistro (id_cliente, dataHora, peso) VALUES
(1, '2024-01-01 08:00:00', 76.0),
(1, '2024-01-08 08:00:00', 75.5),
(1, '2024-01-15 08:00:00', 75.0),
(2, '2024-01-01 08:00:00', 64.5),
(2, '2024-01-08 08:00:00', 65.0),
(2, '2024-01-15 08:00:00', 65.5);

-- Inserir planos nutricionais de exemplo
INSERT INTO PlanoNutricional (id_cliente, dataCriacao) VALUES
(1, '2024-01-10'),
(2, '2024-01-12');

-- Inserir refeições de exemplo
INSERT INTO Refeicao (horario, descricao, porcoes, id_planoNutricional) VALUES
('08:00', 'Café da manhã', '1 porção', 1),
('12:00', 'Almoço', '1 porção', 1),
('18:00', 'Jantar', '1 porção', 1),
('08:00', 'Café da manhã', '1 porção', 2),
('12:00', 'Almoço', '1 porção', 2),
('18:00', 'Jantar', '1 porção', 2);

-- Associar alimentos às refeições
INSERT INTO RefeicaoAlimentos (id_refeicao, id_alimento) VALUES
-- Café da manhã do cliente 1
(1, 8), -- Leite
(1, 9), -- Iogurte
(1, 12), -- Banana
(1, 18), -- Aveia

-- Almoço do cliente 1
(2, 1), -- Arroz
(2, 3), -- Feijão
(2, 4), -- Frango
(2, 15), -- Brócolis

-- Jantar do cliente 1
(3, 5), -- Salmão
(3, 16), -- Espinafre
(3, 17), -- Cenoura

-- Café da manhã do cliente 2
(4, 8), -- Leite
(4, 7), -- Ovo
(4, 13), -- Maçã
(4, 19), -- Pão Integral

-- Almoço do cliente 2
(5, 2), -- Arroz Integral
(5, 3), -- Feijão
(5, 4), -- Frango
(5, 15), -- Brócolis

-- Jantar do cliente 2
(6, 6), -- Atum
(6, 16), -- Espinafre
(6, 17); -- Cenoura

-- Inserir atendimentos de exemplo
INSERT INTO Atendimento (id_cliente, id_nutricionista, motivo, horarioPreferencial, observacoes) VALUES
(1, 3, 'Avaliação inicial', '14:00', 'Cliente com objetivo de perder peso'),
(2, 4, 'Acompanhamento mensal', '16:00', 'Cliente com restrição ao glúten'),
(1, 3, 'Reavaliação', '10:00', 'Ajuste no plano nutricional'),
(2, 4, 'Consulta de rotina', '15:00', 'Verificação de progresso');

-- Inserir estimativas de calorias de exemplo
INSERT INTO CaloriaEstimativa (id_cliente, caloriasEstimadas) VALUES
(1, 450),
(1, 380),
(2, 520),
(2, 410);
