const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  username: {
    type: String,
    required: "true",
  },
  qst_title: {
    type: String,
    required: true,
  },
  qst_content: {
    type: String,
    required: true,
  },
  qst_likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  qst_dislikes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  responses: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      username: {
        type: String,
        required: true,
      },
      rep_content: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      rep_likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      rep_dislikes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      rep_date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  asked_date: {
    default: Date.now,
    type: Date,
  },
});
module.exports = mongoose.model("question", QuestionSchema);
