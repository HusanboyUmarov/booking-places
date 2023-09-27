import { ApiProperty } from "@nestjs/swagger/dist";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserAttr{
    first_name: string;
    last_name: string;
    username:string;
    hashed_password:string;
    telegram_link: string;
    email: string;
    phone:string;
    user_photo: string;
    birthday:Date;
    is_owner:boolean;
    is_active:boolean;
    hashed_refresh_token: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserAttr> {
    @ApiProperty({example:1, description:'Uniqui ID'})
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    })
    id: number;

    @ApiProperty({example:'user1', description:'user of name'})
    @Column({
        type:DataType.STRING,
    })
    first_name: string;
    
    @ApiProperty({example:'user1', description:'user last name'})
    @Column({
        type:DataType.STRING,
    })
    last_name: string;

    @ApiProperty({example:'user1', description:'username'})
    @Column({
        type:DataType.STRING,
        unique:true
    })
    username:string;

    @ApiProperty({example:'password', description:'user hashed_password'})
    @Column({
        type:DataType.STRING,
    })
    hashed_password:string;

    @ApiProperty({example:'telegram_link', description:'link'})
    @Column({
        type:DataType.STRING,
    })
    telegram_link: string;

    @ApiProperty({example:'email@gamil.com', description:'email'})
    @Column({
        type:DataType.STRING,
        unique:true
    })
    email: string;

    @ApiProperty({example:'+998911234567', description:'phone'})
    @Column({
        type:DataType.STRING,
    })
    phone:string;

    @ApiProperty({example:'photo_name', description:'foto Name'})
    @Column({
        type:DataType.STRING,
    })
    user_photo: string;

    @ApiProperty({example:'12.02.2002', description:'birthday'})
    @Column({
        type:DataType.DATE,
    })
    birthday:Date;
    @ApiProperty({example:'false/true', description:'is_owner'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_owner:boolean;

    @ApiProperty({example:'false/true', description:'is_active'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_active:boolean;
    @ApiProperty({example:'token', description:'hashed-token'})
    @Column({
        type:DataType.STRING,
    })
    hashed_refresh_token: string;

    @Column({
        type:DataType.STRING,
    })
    activation_link: string
}

