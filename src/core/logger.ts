import winston from 'winston';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const logger = {
  info: function(message: string, service: string) {
    winstonLogger.info({ message, service });
  },
  error: function(message: string, service: string) {
    winstonLogger.error({ message, service });
  }
}

export default logger;