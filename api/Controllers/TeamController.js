import db from "../../config/lowdb";
import Team from "../Models/Team";
import Player from "../Models/Player";
import PlayerTemp from "../Models/PlayerTemp";
import getTeams from "../Lib/getTeamData";
import getTeamPlayers from "../Lib/getTeamPlayers";
import getPlayerLinks from "../Lib/getLiqTeams";
import stringSimilarity from "string-similarity";
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
  getPlayerLinks: async () => {
    try {
      let team = await Team.findOne({ temp: { $exists: false } });
      let ids = team.players;
      let players = await Player.find().where("_id").in(ids).exec();
      let playerStrings = [];
      let playerMap = {};
      players.forEach((player) => {
        playerStrings.push(player.name);
        playerMap[player.name] = player.account_id;
      });
      let links = await getPlayerLinks(team.name);

      if (links === null) {
        team.temp = "axiios";
        await team.save();
        return;
      }
      links = links.map((L) => {
        let str = stringSimilarity.findBestMatch(L.id, playerStrings);
        return { ...L, player: playerMap[playerStrings[str.bestMatchIndex]] };
      });
      let result = await PlayerTemp.insertMany(links);
      team.temp = "Found";
      await team.save();
      console.log("Hello");
    } catch (error) {
      console.log(error);
    }
  },
  // dirtyWork: async (req, res, next) => {
  //   try {
  //     const result = await Team.updateMany({}, { $unset: { temp: 1 } });
  //     res.send(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  getPlayers: async (req, res, next) => {
    try {
      let id = req.params.id;
      // let team = await Team.find({team_id:id});
      let players = await Player.find({ team_id: id });
      players.length > 0
        ? res.send(players)
        : res.send({ error: `No team found with id ${id}` });
    } catch (e) {
      res.send({ error: e });
    }
  },
  nameSearch:(req,res,next)=>{
    try {
      let name = req.params.id;
      let exp = new RegExp(`.*${name}.*`, "i");
      let teams = await Team.find({ tag: exp });
      res.send(teams);
    } catch (e) {
      res.send({ error: "500 server error"});
    }
  }
};

export default TeamController;
