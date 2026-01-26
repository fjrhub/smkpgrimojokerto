// models/newsModel.js
import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  publishDate: {
    type: Date,
    required: [true, 'Publish date is required'],
  },
  status: {
    type: String,
    enum: ['draft', 'publish'],
    default: 'draft',
  },
  attachment: {
    originalName: String,
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
  },
  author: {
    username: {
      type: String,
      required: [true, 'Author username is required'],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Alternatif: Gunakan pre save hook dengan async/await
newsSchema.pre('save', async function() {
  this.updatedAt = Date.now();
});

export const News = mongoose.models.News || mongoose.model('News', newsSchema);