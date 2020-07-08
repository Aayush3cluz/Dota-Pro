import axios from "axios";
const getActivePlayers = async (team_id) => {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`https://api.opendota.com/api/teams/${team_id}/players`)
      .then(({ data }) => {
        data = data.filter((d) => d.is_current_team_member === true);
        data = data.map((d2) => {
          return { ...d2, team_id };
        });
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getActivePlayers;
