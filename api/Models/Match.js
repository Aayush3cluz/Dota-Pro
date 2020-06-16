import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  leftName: {
    type: String,
  },
  leftInitial: {
    type: String,
  },
  rightName: {
    type: String,
  },
  rightInitial: {
    type: String,
  },
  leftImage: {
    type: String,
  },
  rightImage: {
    type: String,
  },
  score: {
    type: String,
  },
  bestOf: {
    type: String,
  },
  stream: {
    type: String,
  },
  time: {
    type: String,
  },
  leagueImage: {
    type: String,
  },
  leagueName: {
    type: String,
  },
  concluded: {
    type: Boolean,
  },
});

const model = mongoose.model("Matches", MatchSchema);

module.exports = model;
