import { Column, DataType, Model, Table } from "sequelize-typescript";

interface OtpAttr{
    id:string;
    otp:string;
    expiration_time:Date;
    verified:boolean;
    check: string;
}

@Table({tableName:'otp'})
export class Otp extends Model <Otp, OtpAttr>{
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        allowNull:false
    })
    id:string;
    
    @Column({
        type:DataType.STRING,
        allowNull:false})
    otp:string;
    @Column({
        type:DataType.DATE,
        allowNull:false})
    expiration_time:Date;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false})
    verified:boolean;

    @Column({
        type:DataType.STRING,
        allowNull:false})
    check: string;

}