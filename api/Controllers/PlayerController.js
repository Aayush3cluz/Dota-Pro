import Player from "../Models/Player";
import PlayerTemp from "../Models/PlayerTemp";
import PlayerLiq from "../Models/Player_Liq";
import getData from "../Lib/getLiquipediaData";
import db from "../../config/lowdb";

const PLayerController = {
  getAll: async (req, res, next) => {
    try {
      const players = await Player.find({});
      res.send(players);
    } catch (error) {
      res.send(error);
    }
  },
  scrape: async () => {
    try {
      const player = await PlayerTemp.findOne({
        liq: { $exists: false },
      });
      let link = player.link.substring(7, player.link.length);
      const data = await getData(link);
      if (data !== null) {
        data.reference = player.player;
        const result = await PlayerLiq.create(data);
        player.liq = result._id;
        await player.save();
        db.get("liq").push(result).write();
      } else {
        player.liq = "Not found";
        const res = await player.save();
        db.get("liq").push(res).write();
      }
    } catch (error) {
      console.log(error);
    }
  },
  getProfile: async (req, res, next) => {
    try {
      let id = req.params.id;
      let profile = await PlayerLiq.find({ reference: id });
      profile.length > 0
        ? res.send(profile)
        : res.send({ error: `Player with id ${id} does not exist` });
    } catch (e) {
      res.send({ error: e });
    }
  },
  nameSearch: async (req, res, next) => {
    try {
      let name = req.params.id;
      console.log(name);
      let exp = new RegExp(`.*${name}.*`, "i");
      let players = await Player.find({ name: exp });
      res.send(players);
    } catch (e) {
      console.log(e);
      res.send({ error: "Hello" });
    }
  },
};
export default PLayerController;
