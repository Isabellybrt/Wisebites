"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default);
app.use('/api', planRoutes_1.default);
app.use('/api', clientRoutes_1.default);
const PORT = process.env.PORT || 5000;
database_1.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
