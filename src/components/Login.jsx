import React, {useRef, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query"
import { useNavigate } from 'react-router-dom';


const queryClient = new QueryClient();

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailCheck() && !passwordCheck()) {
            sendUserDataMutation.mutate();
        }
    };

    const emailCheck = () => {
        if (email === '') {
            alert("이메일을 입력해주세요.");
            emailRef.current.focus();

            return true;
        }
    }

    const passwordCheck = () => {
        if (password === '') {
            alert("비밀번호를 입력해주세요.");
            passwordRef.current.focus();

            return true;
        }

        if (!(password.length >= 3 && password.length <= 16)) {
            alert("비밀번호는 3자리 이상 16자리 이하입니다.");
            passwordRef.current.focus();

            return true;
        }
    }

    const sendUserDataMutation = useMutation(() => {
        return axios.post('/auth/login', { email, password })
            .then(res=> {
                const accessToken = res.data.accessToken;
                const refreshToken = res.data.refreshToken;
                Cookies.set('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            });
    }, {
        onSuccess: (data) => {
            navigate('/');
        },
        onError: (data) => {
            alert("아이디와 비밀번호를 확인해주세요.");
            console.log("fail", data);
        },
    });

    return (
        <form onSubmit={handleSubmit}>
            <label> 이메일:
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
            </label>
            <br />
            <label> 비밀번호:
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} ref={passwordRef} />
            </label>
            <br />
            <button type="submit">로그인</button>
            {/*<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />*/}
        </form>
    );
}

export default function LoginWrapped() {
    return(
        <QueryClientProvider client={queryClient}>
            <Login />
        </QueryClientProvider>
    );
};