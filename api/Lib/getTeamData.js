import axios from "axios";

const getTeams = async () => {
  const result = new Promise(async (resolve, reject) => {
    axios
      .get("https://api.opendota.com/api/teams")
      .then(({ data }) => {
        data = filterTeams(data);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
  return await result;
};
const filterTeams = (teams) => {
  teams = teams.filter((team) => {
    return team.last_match_time > 1561939200;
  });
  return teams;
};
export default getTeams;
