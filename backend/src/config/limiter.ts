import {rateLimit} from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10, 
    message: 'Muchas peticiones, intenta de nuevo en 15 minutos'
});