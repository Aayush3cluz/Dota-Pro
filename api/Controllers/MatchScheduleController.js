import getMatchData from '../Lib/getMatchData'

const MatchScheduleController ={
    getData:(req,res,next)=>{
        try {
            const data = await getMatchData();
        } catch (error) {
            res.send("500");
        }
    }

}
export default MatchScheduleController;