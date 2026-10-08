const PrioritySchema = new mongoose.Schema(
  {
    priority1: {
      type: String,
      trim: true,
    },

    priority2: {
      type: String,
      trim: true,
    },

    priority3: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);
