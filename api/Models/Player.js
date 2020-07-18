import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  account_id: { type: String },
  name: { type: String },
  games_played: { type: Number },
  wins: { type: Number },
  team_id: { type: String },
  liq_profile: {
    type: String,
    default: "Wait",
  },
});

const model = mongoose.model("Players", PlayerSchema);

module.exports = model;
