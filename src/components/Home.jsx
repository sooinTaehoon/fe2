import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="home-container">
            <h1>연동 연습용 홈</h1>
            <nav>
                <Link to="/signup">회원가입</Link>
                <br />
                <Link to="/login">로그인</Link>
                <br />
                <Link to="/infoTest">테스트 페이지</Link>
            </nav>
        </div>
    );
}

export default Home;