import React, {useRef, useState} from 'react';
import axios from 'axios';
import {QueryClient, QueryClientProvider, useMutation} from "@tanstack/react-query"
import {Link, useNavigate} from 'react-router-dom';


const queryClient = new QueryClient();

function InfoTest() {
    const navigate = useNavigate();

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