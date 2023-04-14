import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query"
import Cookies from 'js-cookie';
import {Link, useNavigate} from 'react-router-dom';


const queryClient = new QueryClient();

function InfoTest() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        axios.get('/auth/accessTokenAuth', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .catch(error => {
                console.log(error);
                // 권한이 없으면 홈 페이지로 이동
                navigate('/');
            });
        }, [navigate]);

    return (
        <div>
            <h1>
                <Link to="/">홈</Link>
            </h1>
            <br />
            <br />
            <br />
            유저 권한 보유자만 볼 수 있는 페이지
        </div>
    );
}

export default function InfoTestWrapped() {
    return(
        <QueryClientProvider client={queryClient}>
            <InfoTest />
        </QueryClientProvider>
    );
};