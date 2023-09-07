const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager")

const getSecret = async (secretId) => {
    try {

        // if(secretId === 'jwt_secret'){
        //     return {"jwt_secret":"dnqPNyveEefq5nkihDS71cWXhPA25VywV6rzfGUN5yUOtU5pYYlXcqCyfZS4iMsqJdMIwgLTRjJbTzVxnZm9Mqf3TR16woXhmC4aVbmwzbzgQYcRrxjIVX68WxJEer0G"}

        // }

        // if(secretId === 'cloudinary_secrets'){
        //     return {"cloudinary_cloud_name":"ddetpj28z","cloudinary_api_key":"649934916723966","cloudinary_api_secret":"gYlN2-cbwUYNDIG1FnMsM1oTG1U"}
        // }

        // return {"username":"postgres","password":"postgres1234","engine":"postgres","host":"bitacora-dev.cqjpydkuzasu.us-west-2.rds.amazonaws.com","port":5432,"dbname":"db_bitacora_dev","dbInstanceIdentifier":"bitacora-dev"}


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