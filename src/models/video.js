import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose";

const VideoSchema = mongoose.Schema(
  {
    videoFile: {
      type: String, // cloudinary url
      required: true,
    },

    thumbnail: {
      type: String, // cloudinary url
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number, //will get it from cloudinary
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { timestamps: true }
);

export const Video = mongoose.model("Video", VideoSchema);
