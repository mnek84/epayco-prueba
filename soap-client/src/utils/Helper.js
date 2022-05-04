import path from 'path';
import {I18n} from 'i18n';

exports.i18n = new I18n({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '../language')
})


exports.getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

exports.getClientIp = (req) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    ip = ip.replace("::ffff:",""); //Replace iPv6 prefix
    return ip;
}

exports.strRandom = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
