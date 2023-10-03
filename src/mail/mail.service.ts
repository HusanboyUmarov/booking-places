import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    async sendUserConfirm(user: User): Promise<void> {
        const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
        console.log(url);
        console.log(process.env.PORT);
        console.log(user.email, user.first_name);



        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Stadium App, Confirm your Email!',
            template: 'confirmation', // Assuming you have a template named 'confirmation'
            context: {
                name: user.first_name,
                newUrl: url
            },
        });
    }
}