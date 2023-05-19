/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from "mongoose";
import { entity } from "./constants";

const locationSchema = new mongoose.Schema(
  {
    _id: "UUID",
    name: { type: String, required: true, index: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    code: { type: String, required: true, unique: true },
    year: { type: Number, required: true },
  },
  {
    discriminatorKey: "entity",
    timestamps: true,
  }
);
export const LocationModel = mongoose.model(
  "Location",
  locationSchema,
  "locations"
);

const locationRelationSchema = new mongoose.Schema({
  _id: "UUID",
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const provinceSchema = new mongoose.Schema({
  capital: locationRelationSchema,
});
export const ProvinceModel = LocationModel.discriminator(
  entity.province,
  provinceSchema
);

const municipalitySchema = new mongoose.Schema({
  province: locationRelationSchema,
});
export const MunicipalityModel = LocationModel.discriminator(
  entity.municipality,
  municipalitySchema
);

const autonomousCitySchema = new mongoose.Schema();
export const AutonomousCityModel = LocationModel.discriminator(
  entity.autonomousCity,
  autonomousCitySchema
);
