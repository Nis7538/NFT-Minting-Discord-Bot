import DiscordJS, { Intents, MessageAttachment } from 'discord.js';
import dotenv from 'dotenv';
import { mintNFT } from './interact';
dotenv.config();

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
    console.log('Bot Online');
});

client.on('messageCreate', message => {
    let attachments = message.attachments;
    let arr = message.content.split('\n');
    let name: string, description: string;
    if (arr.length === 2) {
        name = arr[0];
        description = arr[1];
        console.log(name, description);
    } else {
        console.log('Enter valid parameters');
    }
    if (message.attachments.size != 0) {
        attachments.forEach(async attachment => {
            let res = await mintNFT(attachment.url, name, description);
            message.reply(res.status);
        });
    }
});

client.login(process.env.TOKEN);
