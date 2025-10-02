/**
 * Logger utilitaire pour remplacer les console.log
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      const entry = this.formatMessage('debug', message, data);
      console.debug(`[DEBUG] ${entry.timestamp}: ${entry.message}`, entry.data);
    }
  }

  info(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      const entry = this.formatMessage('info', message, data);
      console.info(`[INFO] ${entry.timestamp}: ${entry.message}`, entry.data);
    }
  }

  warn(message: string, data?: unknown): void {
    const entry = this.formatMessage('warn', message, data);
    console.warn(`[WARN] ${entry.timestamp}: ${entry.message}`, entry.data);
  }

  error(message: string, data?: unknown): void {
    const entry = this.formatMessage('error', message, data);
    console.error(`[ERROR] ${entry.timestamp}: ${entry.message}`, entry.data);
  }
}

export const logger = new Logger();
