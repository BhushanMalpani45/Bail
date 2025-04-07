
import mongoose from 'mongoose';

const faceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    attendance: [{
        date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['present', 'absent'],
            default: 'present',
        },
        location: {
            latitude: {
                type: Number,
                required: false,
            },
            longitude: {
                type: Number,
                required: false,
            }
        }
    }]
},{timestamps:true});

const FaceRecognition = mongoose.model('PrisonerFaceRecognition', faceSchema);

export default FaceRecognition;
