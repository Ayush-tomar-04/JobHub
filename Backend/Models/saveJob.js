const mongoose = require("mongoose");
const savedJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
        required: true
    },

    savedAt: {
        type: Date,
        default: Date.now
    }
});
savedJobSchema.index(
  { userId: 1, jobId: 1 },
  { unique: true }
);

module.exports = mongoose.model("savedJob", savedJobSchema);