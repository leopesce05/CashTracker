import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Budget } from './Budget'

//MODELO DE GASTO
@Table({
    tableName: 'expenses'
})

export class Expense extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    declare amount: number

    //RELACION CON PRESUPUESTOS
    @ForeignKey(() => Budget)
    declare budgetId: number

    @BelongsTo(() => Budget)
    declare budget : Budget
}