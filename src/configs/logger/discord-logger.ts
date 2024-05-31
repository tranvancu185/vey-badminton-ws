import DiscordLogger from './discord';
import os from 'os';

const DISCORD_WEBHOOK_DOMAIN_V1 = process.env.DISCORD_WEBHOOK_DOMAIN_V1 || 'https://discord.com/api/webhooks';
const DISCORD_WEBHOOK_DOMAIN_V2 = process.env.DISCORD_WEBHOOK_DOMAIN_V2 || 'https://discordapp.com/api/v6/webhooks';
const DISCORD_WEBHOOK_ID = process.env.DISCORD_WEBHOOK_ID || '1246039636820623421';
const DISCORD_WEBHOOK_TOKEN = process.env.DISCORD_WEBHOOK_TOKEN || 'vcg-L9Ywu-bfnHZtFldmIWHB4o-JCYIP4fjydOyUYnPqDOVcYHyfsqXEJhBIPMAXEl-j';

const loggerDiscord = new DiscordLogger({
    hook: `${DISCORD_WEBHOOK_DOMAIN_V1}/${DISCORD_WEBHOOK_ID}/${DISCORD_WEBHOOK_TOKEN}`,
    url: `${DISCORD_WEBHOOK_DOMAIN_V2}/${DISCORD_WEBHOOK_ID}/${DISCORD_WEBHOOK_TOKEN}`,
    icon: '', // optional, will be included as an icon in the footer
    serviceName: 'Ume Badminton WS', // optional, will be included as text in the footer
    defaultMeta: {                    // optional, will be added to all the messages
        'Process ID': process.pid,
        Host: os.hostname(),            // import os from 'os';
    },
    errorHandler: err => {            // optional, if you don't want this library to log to console
        console.error('error from discord', err);
    }
});
export interface IDiscordLogger {
    level?: 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'silly';
    message: string;
    error?: Error;
    json?: any;
    description?: string;
    meta?: { [key: string]: string | number | Date };
}

export default loggerDiscord;