const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Add auto-generated ID
  title: String,
  type: String,
  content: String,
})

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  studyMaterials: [materialSchema],
  attendanceSheet: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      studentName: String,
      records: [
        {
          date: { type: Date, default: Date.now, required: true },
          isPresent: { type: Boolean, required: true },
        },
      ],
    },
  ],
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;