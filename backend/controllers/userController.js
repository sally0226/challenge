
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('../modules/jwt');
const Challenge = require('../models/challengeModel');


function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

function CreateUser(req, res) {

    const { user_id, user_pw, user_name, user_email, git_id } = req.body;


    let today = getCurrentDate();
    console.log(today);
    const in_date = today;
    const last_update = today;


    const create = (user) => {
        if (user) {
            throw new Error('user exists')
        } else {
            return User.create(user_id, user_pw, user_name, user_email, git_id, in_date, last_update);
        }
    }
    User.findOneByUsername(user_id).then(create)
    res.end("result");
}

function DeleteUser(req, res) {
    var _id = req.params.id;

    User.findByIdAndDelete(_id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted : ", docs);
        }
    });
    res.end('Delete')

}

function GetChallengeList(req, res) {		// userId를 기반으로 user의 ch_list반환.
    const userId = req.params.userId;

	User.findOneByUsername(userId)
	.then((user) => {
		if(user){
			console.log("user의 challenge 정보 얻음");
			console.log(user.ch_list);
			res.send(user.ch_list);
		}else{
			throw new Error('not exist user')
		}
	})

}

function JoinChallenge(req, res) {		// user의 ch_list부분에 새로운 challengeId 추가.
    const { userId, challengeId } = req.body;

	var chArray;

	const join = () => User.findOneAndUpdate({ "user_id": userId }, {
        $set: {
            ch_list: chArray
        }
    }, { new: true, useFindAndModify: false }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("user에 challenge 추가")
            console.log(doc)
            res.send(doc)
        }
    })

	User.findOneByUsername(userId)
	.then((user)=> {
		chArray = user.ch_list;
		if(chArray.indexOf(challengeId)>=0){	// 이미 해당 Id의 challenge에 가입되어 있는지 확인.
			throw new Error('already join');
		}
		chArray.push(challengeId);
		
		Challenge.findById(challengeId)		// 해당 Id의 챌린지가 없다면 error 반환.
		.then((challenge) => {
			console.log(challenge)
			if(challenge===null){
				throw new Error('not exist challenge');
			}
		})

	}).then(join)
}

async function LogIn(req, res) {
    const id = req.body.user_id;
    const pw = req.body.user_pw;
    console.log("id, pw :"+id+" "+pw);
    // DB에서 user 정보 조회 
    const user = await User.loginCheck(id, pw);
    // 해당 user 정보 속 pw와 입력으로 들어온 pw가 같은지 확인
    console.log("----");
    console.log(user);
    //같으면 jwtToken 발급 
    
    if (user) {
        const jwtToken = await jwt.sign(user);
        const token = jwtToken.token;
        const msg = "login successfully";
        return res.json({
            message: msg,
            token    
        })
    }
    else 
        return res.json({
            message: "fail"
        })
    
}
module.exports = {
    createUser: CreateUser,
    deleteUser: DeleteUser,
    logIn : LogIn,
    getChallengeList: GetChallengeList,
    joinChallenge: JoinChallenge
};