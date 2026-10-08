const OpenQuestionsSchema = new mongoose.Schema(
  {
    hiddenProblem: {
      type: String,
      trim: true,
    },

    municipalityDoingWell: {
      type: String,
      trim: true,
    },

    municipalityNotDoingWell: {
      type: String,
      trim: true,
    },

    suggestionToMayor: {
      type: String,
      trim: true,
    },

    additionalComments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
export const OpenQuestions = mongoose.model("OpenQuestions", OpenQuestionsSchema);