const fromCandidateExpectationsSchema = new mongoose.Schema(
  {
    qualities: [
      {
        type: String,
        enum: [
          "Honest",
          "Accessible",
          "Experienced",
          "Development-focused",
          "Good administrator",
          "Responsive to citizens",
          "Transparent",
          "Accountable",
          "Good communicator",
          "Understands local problems",
          "Can complete development projects",
          "Other",
        ],
      },
    ],

    qualitiesOther: {
      type: String,
      trim: true,
    },

    firstPriority: {
      type: String,
      trim: true,
    },

    threePriorities: {
      type: PrioritySchema,
    },

    meetResidentsImportance: {
      type: String,
      enum: [
        "Very important",
        "Important",
        "Neutral",
        "Not very important",
        "Not important",
      ],
    },

    oneExpectation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const MayorExpectations = mongoose.model("MayorExpectations", fromCandidateExpectationsSchema);