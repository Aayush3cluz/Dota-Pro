import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String },
  team_id: { type: String },
  birth: { type: String },
  country: { type: String },
  status: { type: String },
  team: { type: String },
  role: [String],
  earnings: { type: String },
  history: [String],
  reference: String,
});

const model = mongoose.model("PlayersLiq", PlayerSchema);

module.exports = model;
