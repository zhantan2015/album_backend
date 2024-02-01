import msyql from 'mysql2'
import { logger, stdout } from './log'
import { Connection } from 'mysql2'
// @ts-ignore
import config from '../config.json'

class DB {
    conn?: Connection
    static ins: DB

    constructor(db_config: any) {
        this.conn = msyql.createConnection(db_config)
        this.conn.connect()
    }

    static createDB() {
        if (!DB.ins) {
            DB.ins = new DB(config['db_config'])
        }
        return DB.ins;
    }

    execute(sql: string, values?: [...any]) {
        logger.info(sql, values)
        return new Promise((resolve, reject) => {
            this.conn!.execute(sql, values?.filter(i => i)
                , (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
        })
    }
}

export default DB.createDB