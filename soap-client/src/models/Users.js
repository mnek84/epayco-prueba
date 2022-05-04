import * as _ from "underscore";
import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

var Schema = mongoose.Schema;

var UserModel = new Schema({
    uuid: {type: String, required: true,unique:true,index:1},
    name:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,index:1},
    password:{type:String,required:true},
    status:Boolean,
    confirmation_code:{type:String,required:true,index:1},
    confirmed:{type:mongoose.SchemaTypes.Decimal128,required:true},
    remember_token:{type:String,required:true,index:1},
    documentType:{type:String,required:true},
    document:{type:String,required:true},
    birthdate:{type:mongoose.SchemaTypes.Date,required:true},
    gender:{type:String,required:true},
    country_id:{type:mongoose.SchemaTypes.Number,required:true},
    state_id:{type:mongoose.SchemaTypes.Number,required:true},
    city_id:{type:mongoose.SchemaTypes.Number,required:true},
    smart_token:{type:String,required:true,index:1},
    devices:{type:mongoose.SchemaTypes.Array}
}, {timestamps: true});

UserModel.plugin(paginate);

UserModel.set('toJSON', {
    transform: function(doc, ret, options) {
        return _.pick(ret, 'uuid', 'name', 'lastname','document','documentType','country_id','state_id','city_id','smart_token','email','gender','birthdate') }
    }
);

export const Users = mongoose.model("users", UserModel);
