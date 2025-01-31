import nodemailer from "nodemailer";

type TransportConfig = {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
}

// Configurar la función con el tipo correcto
const config = (): TransportConfig => {
    return {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_HOST_USER,
            pass: process.env.EMAIL_HOST_PASSWORD
        }
    };
};

// Crear el transporte correctamente
export const transport = nodemailer.createTransport(config());
