import React, {useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query"
import Cookies from 'js-cookie';
import {Link, useNavigate} from 'react-router-dom';


const queryClient = new QueryClient();

function InfoTest() {
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        const accessToken = Cookies.get('accessToken');

        await axios.get('/auth/accessTokenAuth', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .catch(error => {
            if (error.response.status === 401) {
                const refreshToken = localStorage.getItem('refreshToken');

                axios.post('/auth/reissue', {
                    accessToken: `${accessToken}`,
                    refreshToken: `${refreshToken}`
                })
                    .then(res => {
                        const accessToken = res.data.accessToken;
                        const refreshToken = res.data.refreshToken;
                        Cookies.set('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                    })
                    .catch(error => {
                        alert("로그인 필요");

                        navigate('/login');
                    })
            } else if (error.response.status === 403) {
                alert("권한 부족");

                navigate('/');
            }
        });
    };

    return (
        <div>
            <h1>
                <Link to="/">홈</Link>
            </h1>
            어드민 권한 보유자만 볼 수 있는 페이지
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