import mongoose from "mongoose";

const ServiceRatingSchema = new mongoose.Schema(
  {
    roads: {
      type: Number,
      min: 1,
      max: 5,
    },

    drinkingWater: {
      type: Number,
      min: 1,
      max: 5,
    },

    wasteManagement: {
      type: Number,
      min: 1,
      max: 5,
    },

    drainage: {
      type: Number,
      min: 1,
      max: 5,
    },

    healthcare: {
      type: Number,
      min: 1,
      max: 5,
    },

    education: {
      type: Number,
      min: 1,
      max: 5,
    },

    streetLighting: {
      type: Number,
      min: 1,
      max: 5,
    },

    publicTransportation: {
      type: Number,
      min: 1,
      max: 5,
    },

    municipalAdministrativeServices: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    _id: false,
  }
);
export const ServiceRating = mongoose.model("ServiceRating", ServiceRatingSchema);