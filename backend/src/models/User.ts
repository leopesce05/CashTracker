import { Table, Column, Model, DataType, HasMany, AllowNull, Unique, Default } from 'sequelize-typescript'
import { Budget } from './Budget'

@Table({
    tableName: 'users'
})

export class User extends Model {
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.STRING(60),
        allowNull: false,
    })
    declare password: string

    @Unique(true)
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    declare email: string

    @Column({
        type: DataType.STRING(6),
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare confirmed: boolean

    //RELACION CON PRESUPUESTOS
    @HasMany(() => Budget,{
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare budgets: Budget[]

}