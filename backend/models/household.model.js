const HouseholdSchema = new mongoose.Schema(
  {
    respondentName: {
      type: String,
      trim: true,
    },

    headOfFamily: {
      type: String,
      required: true,
      trim: true,
    },

    totalMembers: {
      type: Number,
      required: true,
      min: 1,
    },

    totalEligibleVoters: {
      type: Number,
      required: true,
      min: 0,
    },

    maleVoters: {
      type: Number,
      default: 0,
      min: 0,
    },

    femaleVoters: {
      type: Number,
      default: 0,
      min: 0,
    },

    otherVoters: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  
);
export const Household = mongoose.model("Household", HouseholdSchema);