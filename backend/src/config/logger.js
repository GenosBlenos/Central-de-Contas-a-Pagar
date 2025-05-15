import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/erros-%DATE%.log',
      level: 'error',
      maxSize: '20m',
      maxFiles: '30d'
    }),
    new winston.transports.Console({
      format: combine(colorize(), logFormat)
    })
  ]
});