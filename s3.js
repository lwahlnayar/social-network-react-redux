const knox = require("knox");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.awsKey,
    secret: secrets.awsSecret,
    bucket: "spicedling"
});

module.exports.uploadS3 = function(req, res, next) {
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        "x-amz-acl": "public-read"
    });

    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);
    //as soon as you get response from Amazon, do the following
    s3Request.on("response", s3Response => {
        if (s3Response.statusCode == 200) {
            fs.unlink(req.file.path, () => {});
            return next();
        }
        res.status(500).json({
            success: false
        });
    });
};
