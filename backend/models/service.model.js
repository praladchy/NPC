const ServicesSchema = new mongoose.Schema(
  {
    overallSatisfaction: {
      type: String,
      enum: [
        "Very satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very dissatisfied",
        "Don't know",
      ],
    },

    ratings: {
      type: ServiceRatingSchema,
    },

    needsMostImprovement: {
      type: String,
      trim: true,
    },
  },
   {timestamps: true}
);
export const Services = mongoose.model("Services", ServicesSchema);