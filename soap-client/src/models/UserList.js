import {Schema, model}  from 'mongoose';

var UserListSchema = new Schema({
    user_id: {type: Number, required: true},
    content: {type: Map, required: true},
}, {timestamps: true});

module.exports = model("user_list", UserListSchema);
