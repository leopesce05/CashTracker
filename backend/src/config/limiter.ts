import {rateLimit} from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5, 
    message: 'Muchas peticiones, intenta de nuevo en 15 minutos'
});