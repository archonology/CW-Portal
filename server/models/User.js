const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const resourceSchema = require("./Resource");


// define user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Something is missing from your email address!"],
        },
        password: {
            type: String,
            required: true,
            match: [/^[A-Za-z]\w{7,14}$/, "Password must be between 7-14 characters."]
        },
        // set lists
        favorites: [resourceSchema],
        do: [resourceSchema],
        doing: [resourceSchema],
        done: [resourceSchema],
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;