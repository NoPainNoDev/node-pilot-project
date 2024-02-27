// local DB접속을 위해서는 gossm 실행이 필요합니다.

const { getSecretValue } = require('../common/secretsManagerClient')

async function getDatabaseConfig() {
    const secretValue = await getSecretValue(process.env.AWS_DB_SECRET_ID);
    const secret = JSON.parse(secretValue); 
    return {
        "USERNAME": secret.username,
        "PASSWORD": secret.password,
        "DATABASE": "dtxCentral",
        "HOST": "localhost",
        "PORT": "3306",
        "DIALECT": "mysql"
    }
}

module.exports = getDatabaseConfig;