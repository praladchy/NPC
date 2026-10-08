const SurveySchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | SURVEY IDENTIFICATION
    |--------------------------------------------------------------------------
    */

    surveyCode: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 1: LOCATION
    |--------------------------------------------------------------------------
    */

    location: {
      type: SurveyLocationSchema,
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 2: HOUSEHOLD
    |--------------------------------------------------------------------------
    */

    household: {
      type: HouseholdSchema,
      required: true,
    },

    /*
    |--------------------------------------------------------------------------
    | OPTIONAL RESPONDENT DEMOGRAPHICS
    |--------------------------------------------------------------------------
    */

    respondent: {
      type: RespondentSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 3: FAMILY MEMBERS
    |--------------------------------------------------------------------------
    */

    familyMembers: {
      type: [FamilyMemberSchema],
      default: [],
    },

    mainOccupation: {
      type: String,
      enum: [
        "Agriculture",
        "Business",
        "Government employment",
        "Private employment",
        "Daily wage/labour",
        "Foreign employment/remittance",
        "Self-employment",
        "Service sector",
        "Other",
      ],
    },

    mainOccupationOther: {
      type: String,
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 4: PROBLEMS
    |--------------------------------------------------------------------------
    */

    problems: {
      type: ProblemsSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 5: MUNICIPAL SERVICES
    |--------------------------------------------------------------------------
    */

    services: {
      type: ServicesSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 6: CURRENT LEADERSHIP
    |--------------------------------------------------------------------------
    */

    currentLeadership: {
      type: CurrentLeadershipSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 7: EXPECTATIONS FROM MAYOR
    |--------------------------------------------------------------------------
    */

    mayorExpectations: {
      type: MayorExpectationsSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 8: COMMUNITY & DEVELOPMENT
    |--------------------------------------------------------------------------
    */

    community: {
      type: CommunitySchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 9: PUBLIC COMMUNICATION
    |--------------------------------------------------------------------------
    */

    communication: {
      type: CommunicationSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | SECTION 10: FINAL OPEN QUESTIONS
    |--------------------------------------------------------------------------
    */

    openQuestions: {
      type: OpenQuestionsSchema,
    },

    /*
    |--------------------------------------------------------------------------
    | FIELD STAFF
    |--------------------------------------------------------------------------
    */

    enumerator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | WHO SUBMITTED THE RECORD
    |--------------------------------------------------------------------------
    */

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | SURVEY STATUS
    |--------------------------------------------------------------------------
    */

    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "verified",
        "archived",
      ],
      default: "submitted",
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | OFFLINE / SYNC STATUS
    |--------------------------------------------------------------------------
    */

    syncStatus: {
      type: String,
      enum: [
        "pending",
        "syncing",
        "synced",
        "failed",
      ],
      default: "synced",
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | OPTIONAL SYNC ERROR
    |--------------------------------------------------------------------------
    */

    syncError: {
      type: String,
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | VERIFICATION
    |--------------------------------------------------------------------------
    */

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verifiedAt: {
      type: Date,
    },

    verificationNote: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


/*
|--------------------------------------------------------------------------
| INDEXES FOR ANALYTICS
|--------------------------------------------------------------------------
*/

/* Location analytics */
SurveySchema.index({
  "location.province": 1,
  "location.district": 1,
  "location.municipality": 1,
});

SurveySchema.index({
  "location.municipality": 1,
  "location.wardNumber": 1,
});

/* Enumerator analytics */
SurveySchema.index({
  enumerator: 1,
  createdAt: -1,
});

/* Status analytics */
SurveySchema.index({
  status: 1,
  createdAt: -1,
});

/* Date analytics */
SurveySchema.index({
  createdAt: -1,
});


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

/*
 * Make sure voter counts do not exceed total eligible voters.
 */
SurveySchema.pre("validate", function (next) {
  const household = this.household;

  if (!household) {
    return next();
  }

  const totalGenderVoters =
    (household.maleVoters || 0) +
    (household.femaleVoters || 0) +
    (household.otherVoters || 0);

  if (totalGenderVoters > household.totalEligibleVoters) {
    return next(
      new Error(
        "Male, female and other voters cannot exceed total eligible voters."
      )
    );
  }

  if (household.totalEligibleVoters > household.totalMembers) {
    return next(
      new Error(
        "Total eligible voters cannot exceed total household members."
      )
    );
  }

  next();
});


/*
|--------------------------------------------------------------------------
| AUTO GENERATE SURVEY CODE
|--------------------------------------------------------------------------
*/

SurveySchema.pre("save", async function (next) {
  if (this.surveyCode) {
    return next();
  }

  const Survey = mongoose.model("Survey");

  let code;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    code = `SUR-${new Date().getFullYear()}-${randomNumber}`;

    exists = await Survey.exists({
      surveyCode: code,
    });
  }

  this.surveyCode = code;

  next();
});


/*
|--------------------------------------------------------------------------
| MODEL
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model("Survey", SurveySchema);