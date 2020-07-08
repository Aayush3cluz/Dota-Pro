import Player from "../Models/Player";

const PLayerController = {
  getAll: async (req, res, next) => {
    try {
      const players = await Player.find({});
      res.send(players);
    } catch (error) {
      res.send(error);
    }
  },
  scrape:()=>{
    
  }
};
export default PLayerController;
