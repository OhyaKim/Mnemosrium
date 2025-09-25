import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Loading.css"

function Loading() {
    const navigate = useNavigate();
    const loadingText = ["날아가는 중", "날아가는 중.", "날아가는 중..", "날아가는 중..."];
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % loadingText.length);
        }, 500);

        setTimeout(() => {
            setFade(true);
            setTimeout(() => {
                GoToInput();
                setFade(false);
            },1000)
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    //페이지 이동 함수
    const GoToInput = () => {
        navigate("/Input");
    }

    return (
        <div className={`loading ${fade? "fadeout":""}`}>
            <div className="loading-bg">
                <div className="loading-gr01"></div>
                <div className="loading-gr02"></div>
                <div className="loading-gr03"></div>
            </div>

            <div className="loading-con">
                <div className="loading-logo"></div>
                <div className="loading-text">
                    므네모리움으로 <br /> {loadingText[index]}
                </div>
            </div>

        </div>
    );
}

export default Loading;
