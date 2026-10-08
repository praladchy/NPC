const FamilyMemberSchema = new mongoose.Schema(
  {
    memberNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    ageGroup: {
      type: String,
      enum: [
        "0-17",
        "18-25",
        "26-35",
        "36-45",
        "46-55",
        "56-65",
        "65+",
      ],
    },

    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Other",
        "Prefer not to say",
      ],
    },

    occupation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
export const FamilyMember = mongoose.model("FamilyMember", FamilyMemberSchema);