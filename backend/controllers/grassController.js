const gitData = require('../models/gitDataModel');
const crawling = require('../functions/crawling');
const Approve = require('../models/approveModel');
const { CreateGitData } = require('../functions/crawling');

function dateToString(date) { // 시간 빼고 오직 년월일만 
	var year = date.getFullYear();
	var month = date.getMonth()+1;
    if (month < 10) month = '0'+month;
	var day = date.getDate();
	if (day < 10) day = '0'+day;
	return year+'-'+month+'-'+day;
}

async function GetPersonalGrass(req, res){
    try {
        const user_id = req.body.userId;
        const challenge_id = req.body.challengeId;
        const year = req.body.year;
        const month = req.body.month;

        // Approve 모델에서, 해당 유저, 해당 챌린지, 해당 년도,달에 대한 정보 긁어오기 
        const result = await Approve.findByUserChallangeMonth(user_id, challenge_id, year, month);
        
        // 위에서 filter한 데이터에서 날짜만 남기기 
        const approve = result.map(element => dateToString(element.date));
        console.log(approve);

        // 해당 유저의 gitData에서 세 달에 대한 날짜 가져오기
        var gitAll = await gitData.findOneByUserId(user_id);
		if(gitAll === null){
			await CreateGitData(user_id);
			gitAll = await gitData.findOneByUserId(user_id);
		}
        const git = await crawling.getCommitDate(gitAll.commit_data, year, month);
        console.log(git);

        // approve랑 git 중복제거해서 한 배열에 담기 
        const dates = Array.from(new Set(approve.concat(git))).sort();
        console.log(dates);

        // 세달동안 , 1~마지막일 까지의 커밋 여부를 true, false 배열로 만들기 
        const dateCount = new Date(year, month-2, 0).getDate()+new Date(year, month-1, 0).getDate()+new Date(year, month, 0).getDate();
        const isCommitedList = new Array(dateCount).fill(false); // 우선 전부 다 false
       
        var tempDate = new Date(year, month-3); 
        for(var i=0; i< dateCount;i++){
            if (dates.find(element => element == dateToString(tempDate)) !== undefined)
                isCommitedList[i] = true;
            tempDate.setDate(tempDate.getDate()+1);
        }
        // console.log(isCommitedList);
        res.status(201).json({isCommitedList: isCommitedList});
    }catch(err) {
        console.log(err);
        res.status(401).json({ error: err });
    }

}
 

// /grass/challenge api 처리 함수 여기에 만들어주세요!


module.exports = {
    getPersonalGrass: GetPersonalGrass,
}