import React, {useRef, useState} from 'react';
import axios from 'axios';
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query"
import validator from "validator";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function SignUp() {
    const [user, setUser] = useState({
        name: '',
        password: '',
        email: '',
        address: ''
    })
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(Boolean);
    const [runDuplicate, setRunDuplicate] = useState(Boolean);
    const [isValid, setIsValid] = useState(false);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((newUser) =>
            ({...newUser, [id]: value}));
        if (id === 'password') {
            setPasswordMatch(e.target.value === passwordConfirm);
        } else if (id === 'email') {
            setRunDuplicate(false);
            setIsValid(validator.isEmail(e.target.value));
        }
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        setPasswordMatch(e.target.value === user.password);
    };

    const duplicateCheck = (e) => {
        e.preventDefault();
        duplicateMutation.mutate();
    }

    const duplicateMutation = useMutation(() => {
        return axios.post('/members/duplicateCheck', user);
    }, {
        onSuccess: (data) => {
            alert(data.data);
            if (data.data === "가입 가능한 이메일입니다.") {
                setRunDuplicate(true);
            }
        },
        onError: () => {
            alert("네트워크 상태가 불안정합니다. 잠시 후 다시 시도해 주세요.");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nameCheck() && !passwordCheck() && !emailCheck() && !addressCheck()) {
            sendUserDataMutation.mutate();
        }
    };

    const nameCheck = () => {
        if (user.name === '') {
            alert("아이디를 입력해주세요.");
            nameRef.current.focus();

            return true;
        }
    }

    const passwordCheck = () => {
        if (user.password === '') {
            alert("비밀번호를 입력해주세요.");

            return true;
        }

        if (!(user.password.length >= 3 && user.password.length <= 16)) {
            alert("비밀번호는 3자리 이상 16자리 이하입니다.");

            return true;
        }

        if (!passwordMatch) {
            alert("비밀번호가 일치하지 않습니다");

            return true;
        }
    }

    const emailCheck = () => {
        if (user.email === '') {
            alert("이메일을 입력해 주세요");
            emailRef.current.focus();

            return true;
        }

        if (!isValid) {
            alert("이메일 형식을 체크해 주세요.");
            emailRef.current.focus();

            return true;
        }

        if (!runDuplicate) {
            alert("이메일 중복 체크를 실행해 주세요");
            emailRef.current.focus();

            return true;
        }
    }

    const addressCheck = () => {
        if (user.address === '') {
            alert("주소를 입력해주세요.");
            addressRef.current.focus();

            return true;
        }
    }

    const sendUserDataMutation = useMutation(() => {
        return axios.post('/members/new', user);
    }, {
        onSuccess: (data) => {
            alert(data.data);
        },
        onError: (data) => {
            alert(data.response.data);
        },
    });



    return (
        <div className="signup-container">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">아이디</label>
                    <input type="text" id="name" value={user.name} onChange={handleInputChange} ref={nameRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" value={user.password} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password-confirm">비밀번호 확인</label>
                    <input type="password" id="password-confirm" value={passwordConfirm} onChange={handlePasswordConfirmChange} />
                    { !passwordMatch && <p>비밀번호가 일치하지 않습니다.</p> }
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={user.email} onChange={handleInputChange} ref={emailRef} />
                    { !runDuplicate && <button onClick={duplicateCheck}>중복 체크</button> }
                    {!isValid && <p>이메일 형식을 맞춰주세요.</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">주소</label>
                    <input type="address" id="address" value={user.address} onChange={handleInputChange} ref={addressRef} />
                </div>
                <button type="submit">가입</button>
            </form>
        </div>
    );
}



export default function SignUpWrapped() {
    return(
        <QueryClientProvider client={queryClient}>
            <SignUp />
        </QueryClientProvider>
    );
};