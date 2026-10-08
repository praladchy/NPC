const ProblemsSchema = new mongoose.Schema(
  {
    household: {
      type: String,
      trim: true,
    },

    tole: {
      type: String,
      trim: true,
    },

    village: {
      type: String,
      trim: true,
    },

    ward: {
      type: String,
      trim: true,
    },

    municipality: {
      type: String,
      trim: true,
    },

    topPriorityProblem: {
      type: String,
      trim: true,
    },

    developmentPriorities: {
      type: PrioritySchema,
    },
  },
  { timestamps: true }
);
export const Problems = mongoose.model("Problems", ProblemsSchema);