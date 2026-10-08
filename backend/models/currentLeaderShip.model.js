const CurrentLeadershipSchema = new mongoose.Schema(
  {
    mayorSatisfaction: {
      type: String,
      enum: [
        "Very satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very dissatisfied",
        "Don't know / Not familiar",
      ],
    },

    mayorDoneWell: {
      type: String,
      trim: true,
    },

    needsImprovement: {
      type: String,
      trim: true,
    },

    accessibility: {
      type: String,
      enum: [
        "Very accessible",
        "Accessible",
        "Sometimes accessible",
        "Difficult to reach",
        "Don't know",
      ],
    },

    concernsHeard: {
      type: String,
      enum: [
        "Yes",
        "Partly",
        "No",
        "Don't know",
      ],
    },
  },
  {timestamps: true}
);
export const CurrentLeadership = mongoose.model("CurrentLeadership", CurrentLeadershipSchema);