import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import {db} from './config/db'
import budgetRouter from './routes/budgetRouter'


async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Database connected'))
    } catch (error) {
        console.log(colors.red("Fallo la conexion"))
    }
} 

connectDB()

const app = express()

app.use(express.json())

app.use(morgan('dev'))

//ROUTING
app.use('/api/budgets', budgetRouter)


export default app