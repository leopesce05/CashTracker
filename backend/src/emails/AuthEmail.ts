import { transport } from "../config/nodemailer"

type EmailType = {
    name: string;
    email: string;
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {

        try {
            const email = await transport.sendMail({
                from: 'CashTrackr',
                to: user.email,
                subject: "Cash Tracker - Confirma tu cuenta",
                text: `Hola ${user.name}, confirma tu cuenta con el siguiente token: ${user.token}`,
                html: `<h1>Hola ${user.name}</h1>
                    <p>Visita el siguiente enlace:</p>
                    <a href="#">Confirmar cuenta</a>
                    <p>e ingresa el codigo: <b>${user.token}</b></p>`,
                });
        } catch (error) {
            console.log("Error al enviar email:", error);
        }
    };

    static sendPasswordResetToken = async (user: EmailType) => {

        try {
            const email = await transport.sendMail({
                from: 'CashTracker',
                to: user.email,
                subject: "Cash Tracker - Restrablece tu contraseña",
                text: `Hola ${user.name}, para : ${user.token}`,
                html: `<h1>Hola ${user.name}, has solicitado reestrablecer tu contraseña</h1>
                    <p>Visita el siguiente enlace:</p>
                    <a href="#">Reestablecer contraseña</a>
                    <p>e ingresa el codigo: <b>${user.token}</b></p>`,
                });
        } catch (error) {
            console.log("Error al enviar email:", error);
        }
    };
}