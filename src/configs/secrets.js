const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager")

const getSecret = async (secretId) => {
    try {

    const client = new SecretsManagerClient({
        region: 'us-west-2'
    });
    
    const { SecretString } = await client.send(
        new GetSecretValueCommand({
            SecretId: secretId
        })
    )
    return SecretString
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getSecret
}