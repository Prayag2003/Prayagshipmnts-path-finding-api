import mongoose from 'mongoose';

const TrafficUpdateSchema = new mongoose.Schema({
    road_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Road' },
    timestamp: Date,
    traffic_condition: String
});

const TrafficUpdate = mongoose.model('TrafficUpdate', TrafficUpdateSchema);
export { TrafficUpdate };
