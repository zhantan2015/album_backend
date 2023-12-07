import log4js from 'log4js'

log4js.configure({
    appenders: {
        stdout: {
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%d{hh:mm:ss} %f:%l [%p] %m"
            }
        },
        file: {
            type: "multiFile",
            base: "logs/",
            property: "datetime",
            maxLogSize: 10485760,
            backups: 3,
            extension: ".log",
            layout: {
                type: "pattern",
                pattern: "%d{yyyy/MM/dd hh:mm:ss} [%p] %m"
            }
        }
    },
    categories: {
        default: {
            appenders: ["stdout"], level: "debug", enableCallStack: true
        },
        file: { appenders: ["stdout", "file"], level: "info", }
    }
})

const logger = log4js.getLogger("file")
const stdout = log4js.getLogger()
logger.addContext('datetime', new Date().toLocaleDateString().replaceAll('/', '-'))
logger.level = 'info'
stdout.level = 'debug'

export {
    logger, stdout
}