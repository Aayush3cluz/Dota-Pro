import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  team_id: {
    type: String,
  },
  ratings: {
    type: String,
  },
  wins: {
    type: Number,
  },
  losses: {
    type: Number,
  },
  last_match_time: {
    type: Number,
  },
  name: {
    type: String,
  },
  tag: {
    type: String,
  },
  logo_url: {
    type: String,
  },
  players: [
    {
      type: String,
    },
  ],
  temp: String,
});

const model = mongoose.model("Teams", TeamSchema);

module.exports = model;
