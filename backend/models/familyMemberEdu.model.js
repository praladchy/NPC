const RespondentSchema = new mongoose.Schema(
  {
    ageGroup: {
      type: String,
      enum: [
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

    education: {
      type: String,
      enum: [
        "No formal education",
        "Primary",
        "Secondary",
        "Higher secondary",
        "Bachelor",
        "Master or above",
        "Other",
      ],
    },
  },
  {
    _id: false,
  }
);
export const familyMemberEdu = mongoose.model("FamilyMemberEdu", RespondentSchema);