const CommunitySchema = new mongoose.Schema(
  {
    groupNeedsAttention: [
      {
        type: String,
        enum: [
          "Youth",
          "Women",
          "Farmers",
          "Students",
          "Senior citizens",
          "Business owners",
          "Low-income families",
          "Persons with disabilities",
          "Children",
          "Other",
        ],
      },
    ],

    groupNeedsAttentionOther: {
      type: String,
      trim: true,
    },

    biggestImpactDevelopment: [
      {
        type: String,
        enum: [
          "Roads",
          "Drinking water",
          "Employment",
          "Education",
          "Healthcare",
          "Agriculture",
          "Tourism",
          "Industry/business",
          "Waste management",
          "Public transportation",
          "Other",
        ],
      },
    ],

    developmentOther: {
      type: String,
      trim: true,
    },

    priorityProject: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Community = mongoose.model("Community", CommunitySchema);