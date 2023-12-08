(async () => {
    const readline = require('readline/promises')
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    const host = await rl.question('host:')
    const user = await rl.question('user:')
    const password = await rl.question('password:')
    const database = await rl.question('database:')
    let secret_key = await rl.question('secret_key(随机生成):')
    secret_key = secret_key ? secret_key : 'secret_key_' + Math.random().toString(36).split('.')[1]

    const config = {
        "db_config": {
            "host": host,
            "user": user,
            "password": password,
            "database": database,
            "pool": {
                "min": 5,
                "max": 20
            }
        },
        "secret_key": secret_key
    };
    rl.close()
    console.log(config)

    const fs = require('fs/promises')
    fs.writeFile('./config.json', JSON.stringify(config)).then(() => { })
})()


