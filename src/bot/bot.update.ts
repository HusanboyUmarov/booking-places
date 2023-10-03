import { Update, Start, Ctx, Hears, Command, Action } from "nestjs-telegraf";
import { On } from "nestjs-telegraf/dist/decorators";

import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";


@Update()
export class BotUpdate{
    constructor(
        private readonly botService:BotService
    ){}

    @Start()
    async onStart (@Ctx() ctx: Context){
       this.botService.start(ctx)
    }
    @On('contact')
    async onContact(@Ctx() ctx:Context){
        return this.botService.onContact(ctx)
    }

    @Command('stop')
    async onStop(@Ctx() ctx:Context){
        return this.botService.onStop(ctx)
    }
    // @On('contact')
    // async onContact(@Ctx() ctx:Context){
    //     if('contact' in ctx.message)
    //     {
    //     await ctx.reply(String(ctx.message.contact.first_name));
    //     await ctx.reply(String(ctx.message.contact.last_name));
    //     await ctx.reply(String(ctx.message.contact.phone_number));
    //     await ctx.reply(String(ctx.message.contact.user_id));
    //     }
    // }

    // @On('photo')
    // async onPhoto(@Ctx() ctx:Context){
    //     if('photo' in ctx.message){
    //         await ctx.replyWithPhoto(
    //             String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
    //         );
    //     }
    // }

    // @On('video')
    // async onVideo(@Ctx() ctx:Context){
    //     if('video' in ctx.message){
    //         await ctx.reply(String(ctx.message.video.file_name));
    //     }

    // }

    // @On('sticker')
    // async onStiker(@Ctx() ctx: Context){
    //     if('strikker' in ctx.message) 
    //     await ctx.reply('👌')
    // }

    // @On('animation')
    // async onAnimation(@Ctx() ctx: Context){
    //     if('animation' in ctx.message) 
    //     await ctx.reply('Animate')
    // }

    

    // @On('location')
    // async onLocation(@Ctx() ctx:Context){
    //     if('location' in ctx.message)
    //     {
    //         await ctx.reply(String(ctx.message.location.latitude));
    //         await ctx.reply(String(ctx.message.location.longitude));

    //         await ctx.replyWithLocation(Number(ctx.message.location.latitude),Number(ctx.message.location.longitude));
    //     }
    // }


    // @On('voice')
    // async onVoice(@Ctx() ctx: Context){
    //     if('voice' in ctx.message){
    //         await ctx.reply(String(ctx.message.voice.duration))
    //     }
    // }

    // @On('invoice')
    // async onInVoice(@Ctx() ctx: Context){
    //     if('invoice' in ctx.message){
    //         await ctx.reply(String(ctx.message.invoice.title))
    //     }
    // }

    // @On('document')
    // async onDoc(@Ctx() ctx:Context){
    // if('document' in ctx.message){
    //     await ctx.reply(String(ctx.message.document.file_name))
    // }

    // }

    // @Hears('hi')
    // async hears(@Ctx() ctx:Context){
    //     await ctx.reply('Hey there')
    // }


    // @Command('info')
    // async info(@Ctx() ctx:Context){
    //     await ctx.reply('information')
    // }

    // @Command('inline_keyboard')
    // async inlineButton(@Ctx() ctx:Context){
    //     const inlineKeyboaer = [
    //         [
    //         {text:'Button 1', callback_data : 'button1'},
    //         {text:'Button 2', callback_data : 'button2'},
    //         {text:'Button 3', callback_data : 'button3'}
    //     ],
    //     [
    //         {text:'Button 4', callback_data : 'button4'},
    //     ],
    //     [
    //         {text:'Button 5', callback_data : 'button5'},
    //     ]
    //  ];

    //  ctx.reply('choose', {
    //     reply_markup:{
    //         inline_keyboard:inlineKeyboaer
    //     }
    //  });
     
    // }

    // @Action('button1')
    // async onActionButton1(@Ctx() ctx:Context){
    //     ctx.reply('you pressed button 1')
    // }

    // @Action('button2')
    // async onActionButton2(@Ctx() ctx:Context){
    //     ctx.reply('you pressed button 2')
    // }

    // @Action(/button+[1-9]/g)
    // async onActionButton(@Ctx() ctx:Context){
    //     ctx.reply('you pressed any Button')
    // }

    // @Command('main_keyboard')
    // async mainButton(@Ctx() ctx:Context){
    //     ctx.reply('choose', {
    //         parse_mode:'HTML' , 
    //         ...Markup.keyboard([
    //             ['bir', 'ikki'], 
    //             ['uch'],
    //             [Markup.button.contactRequest('telefon raqam yuborish')],
    //             [Markup.button.locationRequest('location yuborush')]
    //         ])
    //         .oneTime()
    //         .resize()

    //     })
    // }

    // @Hears('bir')
    // async onButton1(@Ctx() ctx:Context){
    //     ctx.reply('birni bosdingiz!!!')
    // }






    // @On('text')
    // async onText(@Ctx() ctx: Context){
    //     if('text' in ctx.message){
    //         if(ctx.message.text == 'salom') ctx.reply('hello')
    //       else await  ctx.reply(ctx.message.text)

    //     }
    // }

    // @On('message')
    // async onMessage(@Ctx() ctx: Context){
    //     console.log(ctx.botInfo)
    //     console.log(ctx.chat.id)
    //     console.log(ctx.chat.type)
    //     if('content' in ctx.message) 
    //     {
    //         console.log(ctx.message.content)
    //     }
    // }
}




