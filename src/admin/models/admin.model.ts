import { Column, DataType, Model, Table } from "sequelize-typescript";

interface createAdminAttr{
    username:string;
    email:string;
    telegram_link:string;
    admin_photo:string;
    hashed_assword:string;
    is_active:boolean;
    is_creator:boolean
    hashed_refresh_token :number
}

@Table({tableName:'admin'})
export class Admin extends Model<Admin, createAdminAttr> {
    @Column({
        type:DataType.BIGINT, 
        autoIncrement:true, 
        primaryKey:true})
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false})
    username:string;

    @Column({
        type:DataType.STRING,
        allowNull:false})
    email:string;

    @Column({
        type:DataType.STRING,
        allowNull:false})
    telegram_link:string;

    @Column({
        type:DataType.STRING,
        defaultValue:null })
    admin_photo:string;

    @Column({
        type:DataType.STRING,
        allowNull:false})
    hashed_assword:string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false})
    is_active:boolean;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false})
    is_creator:boolean

    @Column({
        type:DataType.STRING,
        defaultValue:false})
    hashed_refresh_token :number
}
