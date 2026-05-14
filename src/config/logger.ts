import * as appInsights from 'applicationinsights';
import winston from 'winston';
import { envs } from './envs';

appInsights
    .setup(envs.APPINSIGHTS_CONNECTION_STRING)
    .setSendLiveMetrics(true)
    .setAutoCollectConsole(false)
    .start();

const aiClient = appInsights.defaultClient;
const appInsightsTransport = new winston.transports.Console({
    level: "info",
    format: winston.format.printf((obj)=>{
        const level = obj.level;
        const message = obj.message;
        const timestamp = obj.timestamp;
        aiClient.trackTrace({
            message:`[${(level)} ${(message)} ${(timestamp)}]`,
            properties: { timestamp }
        })
        return `[${(level)} ${(message)} ${(timestamp)}]`;
    })
});

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.Console(),
        appInsightsTransport
    ]
});
