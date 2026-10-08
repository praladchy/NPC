import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["SuperAdmin", "supervisor", "volunteer"],
      index: true,
    },

    assignedArea: {
      province: {
        type: String,
        trim: true,
      },

      district: {
        type: String,
        trim: true,
      },

      municipality: {
        type: String,
        trim: true,
      },

      wards: [
        {
          type: Number,
          min: 1,
          max: 35,
        },
      ],
    },

    otp: {
      type: Number,
      default: null,
      select: false,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationExpiresAt:{
      type: Date,
      default: null,  
    },
    permissions: [
      {
        type: String,
        trim: true,
      },
    ],
    refreshToken: {
      type: String,
      select: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", UserSchema);
