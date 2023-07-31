const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
              const validateEmail =  /^([A-Za-z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})$/
              return validateEmail.test(email)
            }
        }
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    {
        toJSON: {
            virtuals: true,

        },
        id: false,
    }
);
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    });
const User = model("User", userSchema);
module.exports = User;