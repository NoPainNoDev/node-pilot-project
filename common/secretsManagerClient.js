// AWS SDK 
const AWS = require('aws-sdk');
// 환경 변수
// process.env

// AWS config
AWS.config.update({
  region: process.env.AWS_REGION
});

// Secrets Manager Client 생성
const secretsManager = new AWS.SecretsManager();

/**
 * 비밀 값을 가져오는 함수
 * @param {String} secretName - 가져올 비밀의 이름
 * @returns {Promise<String>} - 비밀 값 Promise
 */
async function getSecretValue(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
      return data.SecretString;
    } else {
      let buff = new Buffer(data.SecretBinary, 'base64');
      return buff.toString('ascii');
    }
  } catch (err) {
    console.error(`Error retrieving secret "${secretName}": ${err}`);
    throw err;
  }
}

module.exports = { getSecretValue };