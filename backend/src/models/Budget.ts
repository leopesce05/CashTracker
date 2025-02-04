import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Expense } from './Expense'
import { User } from './User'

//MODELO DE PRESUPUESTo
@Table({
    tableName: 'budgets'
})

export default class Budget extends Model {
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

    //RELACION CON GASTOS
    @HasMany(() => Expense,{
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare expenses: Expense[]

    //RELACION CON USUARIOS
    @ForeignKey(() => User)
    declare userId: number

    @BelongsTo(() => User)
    declare user : User
}