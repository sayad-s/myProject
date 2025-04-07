import express from 'express';
import cors from 'cors';
import { AppDataSource } from './src/configs/ormconfig.mjs';
import bookRoutes from './src/routes/bookRoutes.mjs';
import dotenv from 'dotenv';

dotenv.config(); // load .env file
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(async () => {
        console.log("Connected to PostgreSQL");

        // Run migrations before starting the server
        await AppDataSource.runMigrations();
        console.log("Migrations executed");
        
        // register routes
        app.use(bookRoutes);
        // app.use("/books", bookRoutes);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("Database connection failed", err));

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
});