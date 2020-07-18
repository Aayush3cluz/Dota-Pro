import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  id: String,
  name: String,
  pos: String,
  join: String,
  link: String,
  team_id: String,
  team_name: String,
  player: String,
  liq: String,
});

const model = mongoose.model("PlayerTemp", PlayerSchema);

module.exports = model;
