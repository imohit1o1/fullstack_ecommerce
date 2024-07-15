import mongoose, { Schema, } from "mongoose"
import validator from "validator";
import bcrypt from "bcrypt";


const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    postalCode: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    }
});


const userSchema = Schema({
    firstName: {
        type: String,
        minLength: [3, "First Name contaians at least 3 characters"],
        trim: true,
    },
    lastName: {
        type: String,
        minLength: [3, "Last Name contaians at least 3 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: [validator.isEmail, "Email is invalid"],
        trim: true,
    },
    phone: {
        type: String,
        minLength: [10, "Phone Number must contains exactly 10 digits"],
        maxLength: [10, "Phone Number must contains exactly 10 digits"],
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters"],
        select: false,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("user", userSchema)