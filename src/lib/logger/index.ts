/**
 * Structured Logging System
 * Provides consistent logging across the application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  requestId?: string;
  action?: string;
  duration?: number;
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    if (this.isDevelopment) {
      const emoji = {
        debug: '🔍',
        info: 'ℹ️',
        warn: '⚠️',
        error: '❌',
      }[entry.level];

      return `${emoji} [${entry.level.toUpperCase()}] ${entry.message}`;
    }

    return JSON.stringify(entry);
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
    };

    if (error) {
      entry.error = {
        message: error.message,
        stack: error.stack,
        code: (error as any).code,
      };
    }

    const formatted = this.formatLog(entry);

    switch (level) {
      case 'debug':
        console.debug(formatted, context || '');
        break;
      case 'info':
        console.info(formatted, context || '');
        break;
      case 'warn':
        console.warn(formatted, context || '');
        break;
      case 'error':
        console.error(formatted, error || context || '');
        break;
    }

    // In production, send to monitoring service (e.g., Sentry, LogRocket)
    if (!this.isDevelopment && level === 'error') {
      // TODO: Integrate with error monitoring service
      // Example: Sentry.captureException(error, { contexts: { custom: context } });
    }
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: LogContext) {
    this.log('error', message, context, error);
  }

  /**
   * Log the start of an operation
   */
  startOperation(operation: string, context?: LogContext) {
    this.debug(`Starting ${operation}`, context);
    return {
      end: (success: boolean = true, additionalContext?: LogContext) => {
        if (success) {
          this.info(`Completed ${operation}`, { ...context, ...additionalContext });
        } else {
          this.warn(`Failed ${operation}`, { ...context, ...additionalContext });
        }
      },
    };
  }
}

export const logger = new Logger();
