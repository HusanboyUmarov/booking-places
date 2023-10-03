import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf/dist/decorators';
import { BOT_NAME } from 'src/app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { Bot } from './model/bot.model';


@Injectable()
export class BotService {
    constructor(
        @InjectModel(Bot) private botRepo: typeof Bot,
        @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
    ){}
    async sendOPT(phoneNumber:string, OTP:string){
        const user = await this.botRepo.findOne({
            where:{phone_number:phoneNumber}
        });

        if(!user || !user.status){
            return false
        }
        await this.bot.telegram.sendChatAction(String(user.user_id), 'typing');
        await this.bot.telegram.sendMessage(String(user.user_id),'Verify code: ' + OTP)
        return true

    }


    async onStop(ctx:Context){
        const userId = ctx.from.id
        const user = await this.botRepo.findOne({where:{user_id:userId}})
        if(user.status){
            await this.botRepo.update(
                {
                    status:false,
                    phone_number:null
                },
                {
                    where:{ user_id:userId}
                }
            );
        }

        await ctx.reply('Botdan chiqib ketingiz',{
            parse_mode:"HTML",
            ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        })
    }


    async onContact(ctx:Context){
        if('contact' in ctx.message){
            const userId = ctx.from.id
            const user  = await this.botRepo.findOne({
                where:{user_id:userId}
            });
            console.log(1)
            if(!user){
                ctx.reply('Iltimos start tugmani bosing', {
                    parse_mode:"HTML", 
                    ...Markup.keyboard([['/start']])
                    .oneTime()
                    .resize(),
                });
            }
            else{
                if(ctx.message.contact.user_id != userId){
                    await ctx.reply("Iltimos ozingizni tel raqamingizni kriting",{
                        parse_mode:"HTML",
                        ...Markup.keyboard([
                            [Markup.button.contactRequest('Tel raqam yuborish')],
                        ])
                        .oneTime()
                        .resize(),
                    });
                }
                else{
                    let phone:string;
                    ctx.message.contact.phone_number[0]== '+'
                    ? (phone= ctx.message.contact.phone_number)
                    :(phone= '+' + ctx.message.contact.phone_number)
                    await this.botRepo.update({
                        phone_number:String(phone),
                        status:true
                    },
                    {
                        where:{user_id:userId}
                    },
                    );

                }
            }
        }

        await ctx.reply('Bot royxatiga qoshildingiz :)',{
            parse_mode:"HTML"
        })
    }

    async start(ctx:Context){
        const userId = ctx.from.id;
        const user = await this.botRepo.findOne({where:{user_id:String(userId)}})
        if(!user){
            await this.botRepo.create({
                user_id:String(userId),
                first_name:ctx.from.first_name,
                last_name:ctx.from.last_name,
                username: ctx.from.username
            });
            await ctx.reply(
                `Iltimos <b> Telefon raqamni yuborush </b> tugmasini bosing`,
                {
                    parse_mode:'HTML',
                    ...Markup.keyboard([
                        [Markup.button.contactRequest('telefon raqamni yuborish')]
                    ])
                    .oneTime()
                    .resize(),
                }
            )

        }
        else if(!user.status){
            await ctx.reply(
                `Iltimos <b> Telefon raqamni yuborush </b> tugmasini bosing`,{
                    parse_mode:'HTML',
                    ...Markup.keyboard([
                        [Markup.button.contactRequest('telefon raqamni yuborish')]
                    ])
                    .oneTime()
                    .resize(),
                }
            );
        }else{
            
            await this.bot.telegram.sendChatAction(userId, 'typing')
            await ctx.reply('bu bot orqali,Stdion dasturi orqali muloqot ornamtiladi',{
                parse_mode:'HTML',
                ...Markup.removeKeyboard()
            },
            );
        }

    }
 
}
