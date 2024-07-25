import mongoose, {Schema, Document} from 'mongoose';
// Document will be used or type safety

// Defining shape/structure of message object
// Message is of type Document
export interface Message extends Document{
    content: string; // Typescript string starts with small 's'
    createdAt: Date;
}

// Defining schema for message object
// MessageSchema is of type Schema and specifically of type Message
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String, // Mongoose string starts with capital 'S'
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Defining shape/structure of user object
export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]; // Array of messages belonging to user
}

// Defining schema for user object
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], // Custom error message
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required']
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verification code expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema] // Embedding MessageSchema into UserSchema
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;