const mongoose = require("mongoose");
const uuid = require("uuid");
const cryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            trim: true,
            unique: true,
        },
        name: String,
        email: String,
        ency_password: String,
        salt: String,
    },
    { timestamps: true },
);

userSchema.virtual("password").set(function(plainpassword) {
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(plainpassword);
});

userSchema.methods = {
    securePassword: function(plainpassword) {
        return cryptoJS.SHA256(plainpassword, this.salt).toString();
    },
    isAuthenticated: function(plainpassword){
        return this.ency_password === this.securePassword(plainpassword);
    }
}



const User = mongoose.model("User",userSchema);

module.exports = { User };