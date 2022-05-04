import * as _ from "underscore";
import crypto from 'crypto';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserTokenModel = new Schema({
    user_id: {type: String, required: true,index:1},
    token: {type: String, required: true,unique:true,index:1},
    expires: Date,
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
}, {timestamps: true});


UserTokenModel.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

UserTokenModel.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});


UserTokenModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
        delete ret.user;
    }
});

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

export const generateRefreshToken = (user, ipAddress) => {
    return new UserToken({
        user_id: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

export const UserToken = mongoose.model("user_tokens", UserTokenModel);
