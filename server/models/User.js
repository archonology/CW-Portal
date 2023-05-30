const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const quickLinkSchema = require("./QuickLink")


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
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Something is missing from your email address!"],
        },
        password: {
            type: String,
            required: true,
            match: [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Please make sure password starts with a letter, has a number a special character, and is between 6 and 16 characters long."]
        },
        // set lists
        favorites: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
        do: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
        doing: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
        done: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
        // user custom quickLinks
        userQuickLinks: [quickLinkSchema],
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