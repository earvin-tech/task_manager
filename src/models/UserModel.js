const { default: mongoose } = require("mongoose");
const crypto = require("node:crypto");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: false,
            minLength: 8,
        },
        salt: {
            type: String,
            required: false,
            unique: false,
            default: function () {
                let newUserSalt = crypto.randomBytes(64).toString("hex");
                return newUserSalt;
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    if (!this.salt) {
        this.salt = crypto.randomBytes(64).toString("hex");
    }

    this.password = crypto.scryptSync(this.password, this.salt, 64).toString("hex");

    next();
});

userSchema.methods.comparePassword = function (passwordToCheck) {
    let userSalt = this.salt;
    let hashedSaltedPassword = crypto.scryptSync(passwordToCheck, userSalt, 64).toString("hex");

    return this.password == hashedSaltedPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = {User};