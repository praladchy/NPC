const SurveyLocationSchema = new mongoose.Schema(
  {
    province: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    municipality: {
      type: String,
      required: true,
      trim: true,
    },

    wardNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 35,
    },

    village: {
      type: String,
      trim: true,
    },

    tole: {
      type: String,
      trim: true,
    },

    dateOfSurvey: {
      type: Date,
      required: true,
      default: Date.now,
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);
LocationSchema.index(
  {
    province: 1,
    district: 1,
    municipality: 1,
  },
  {
    unique: true,
  },
);

LocationSchema.index({
  province: 1,
  district: 1,
});

export const SurveyLocation = mongoose.model(
  "SurveyLocation",
  SurveyLocationSchema,
);
