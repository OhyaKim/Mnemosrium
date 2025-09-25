import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Sending.css"

function SendingPage() {
    const navigate = useNavigate();
    const [fadeIn, setFadeIn] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const loadingText = ["기록되는 중", "기록되는 중.", "기록되는 중..", "기록되는 중..."];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setFadeIn(true);

        const timer = setTimeout(() => {
            setFadeIn(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % loadingText.length);
        }, 500);

        setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                GoToFeed();
                setFadeOut(false);
            }, 1200)
        }, 2000);

        return () => clearInterval(interval);
    }, []);


    //페이지 이동 함수
    const GoToFeed = () => {
        navigate("/Feeds");
    }

    return (
        <div className={`sending ${fadeIn ? "fadeIn" : ""} ${fadeOut ? "fadeOut" : ""}`}>
            <div className="sending-bg">
                <div className="sending-ptns">
                    <div className="sending-ptn"></div>
                    <div className="sending-ptn"></div>
                </div>

            </div>

            <div className="sending-con">
                <div className="sending-logo"></div>
                <div className="sending-text">
                    진솔한 기억이 <br /> {loadingText[index]}
                </div>
            </div>

        </div>
    );
}

export default SendingPage;
