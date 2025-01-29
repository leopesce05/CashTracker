import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Budget } from './Budget'

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

    @ForeignKey(() => Budget)
    declare budgetId: number

    @BelongsTo(() => Budget)
    declare budget : Budget
}