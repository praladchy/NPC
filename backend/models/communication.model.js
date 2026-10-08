const CommunicationSchema = new mongoose.Schema(
  {
    currentSources: [
      {
        type: String,
        enum: [
          "Facebook",
          "TikTok",
          "YouTube",
          "Newspaper",
          "Television",
          "Radio",
          "Friends/family",
          "Community meetings",
          "Local representatives",
          "Other",
        ],
      },
    ],

    currentSourcesOther: {
      type: String,
      trim: true,
    },

    preferredChannels: [
      {
        type: String,
        enum: [
          "Social media",
          "Community meetings",
          "SMS",
          "Local representatives",
          "Newspaper",
          "Radio",
          "Website",
          "Other",
        ],
      },
    ],

    preferredOther: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Communication = mongoose.model("Communication", CommunicationSchema);