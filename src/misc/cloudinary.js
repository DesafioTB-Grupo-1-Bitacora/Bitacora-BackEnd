require("dotenv").config({ path: "../../.env" });
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { getSecret } = require('../configs/secrets')


getSecret('cloudinary_secrets')
.then((result) => {
    const {cloudinary_cloud_name, cloudinary_api_key, cloudinary_api_secret} = JSON.parse(result)
    cloudinary.config({
        cloud_name: cloudinary_cloud_name,
        api_key: cloudinary_api_key,
        api_secret: cloudinary_api_secret,
        secure: true,
    })
})


const checkFolder = async (folder) => {
    try {
        const result = await cloudinary.search.expression(`folder:${folder}`).execute();
        return result.resources.length > 0;
    } catch (error) {
        console.log(error)
    }
}

const createFolder = async (folder) => {
    await cloudinary.api.create_folder(folder).then(res => console.log(res)).catch(error => console.log(error));
}

const uploadFile = async (buffer, folder, tag) => {
    await cloudinary.uploader.upload_stream({resource_type: "auto", folder: folder, use_filename: true, tags: tag}, (error, result) => {
        error ? console.log(error) : console.log(result)
    }).end(buffer);
}

const getFiles = async (folder) => {
    const result = await cloudinary.search.expression(`folder:${folder}`).with_field("tags").execute();
    const files = result.resources.map(resource => ({ tag: resource.tags[0], url: resource.secure_url }));
    return files;
}

const deleteFiles = async (folder) => {
    const files = await cloudinary.search.expression(`folder:${folder}`).execute();
    const resources = files.resources.map(resource => {
        return { public_id: resource.public_id, resource_type: resource.resource_type}
    });
    console.log(resources);
    for(let resource of resources){
        await cloudinary.uploader.destroy(resource.public_id, { resource_type: resource.resource_type }).then(res => console.log(res))
    }
    await cloudinary.api.delete_folder(folder);
}

module.exports = {
    checkFolder,
    createFolder,
    uploadFile,
    getFiles,
    deleteFiles
}