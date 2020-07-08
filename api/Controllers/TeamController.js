import db from "../../config/lowdb";
import Team from "../Models/Team";
import Player from "../Models/Player";
import getTeams from "../Lib/getTeamData";
import getTeamPlayers from "../Lib/getTeamPlayers";
const TeamController = {
  scrape: async (req, res, next) => {
    try {
      const teams = await getTeams();
      Team.insertMany(teams, (error, docs) => {
        if (error) {
          res.send(error);
        } else {
          res.send(docs.length);
        }
      });
    } catch (error) {
      res.send(error);
    }
  },
  getTeams: async (req, res, next) => {
    try {
      const teams = await Team.find({});
      res.send(teams);
    } catch (error) {
      res.send(error);
    }
  },
  savePlayers: async () => {
    try {
      const team = await Team.findOne({ players: { $size: 0 } });
      const players = await getTeamPlayers(team.team_id);
      if (players.length > 0) {
        const docs = await Player.insertMany(players);
        let result = docs.map((a) => a._id);
        team.players = result;
        let update = await team.save();
        db.get("team").push(update).write();
      } else {
        await Team.deleteOne({ _id: team._id });
      }
    } catch (error) {
      db.get("teamErrors").push(error).write();
      console.log(error);
    }
  },
};
export default TeamController;
