import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, Button, Box, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useLoginUser } from '../MVVM/ViewModel/UserViewModel';

function LogIn({ history }) {
	const [id, setId] = useState();
	const [pw, setPw] = useState();
	const userLogin = useLoginUser();
	const loginHandler = async () => {
		const status = await userLogin(id, pw);
		if (status) {
			history.push('/challenge/ing');
		} else {
			alert('로그인 실패');
			// alert(`${id} ${pw}`);
		}
	};
	const idHandler = (e) => {
		setId(e.target.value);
	};
	const pwHandler = (e) => {
		setPw(e.target.value);
	};
	return (
		<div className="login">
			<div className="form">
				<Grid>
					<Box mt={2}>
						<TextField variant="outlined" label="ID" placeholder="아이디를 입력하세요" value={id} onChange={idHandler} />
					</Box>
					<Box mt={2}>
						<TextField variant="outlined" label="PW" type="password" placeholder="비밀번호를 입력하세요" value={pw} onChange={pwHandler} />
					</Box>
				</Grid>
				<Button className="loginBtn" variant="contained" onClick={loginHandler}>LogIn</Button>
			</div>
			<div className="appendix">
				<a className="text" href="/findpw">비밀번호가 기억이 안나십니까?</a>
				<a className="text" href="/register">저희 사이트가 처음이시라구요?</a>
			</div>
		</div>
	);
}

export default withRouter(LogIn);
