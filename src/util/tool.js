
const fs = require('fs');
const crypto = require('crypto');

function get_file_md5(path) {
    var rs = fs.createReadStream(path);
    var hash = crypto.createHash('md5');
    rs.on('data', hash.update.bind(hash));
    return rs.on('end', function() {
        return hash.digest("hex").toString();
    })
}

function get_string_md5(str) {
    var hash = crypto.createHash("md5");
    hash.update(str, "utf-8")
    return hash.digest("hex").toString();
}

module.exports = {
    get_file_md5,
    get_string_md5,
}
