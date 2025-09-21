import { useEffect, useState } from "react";
import "../styles/Loading.css"

function Loading() {
    const loadingText = ["날아가는 중","날아가는 중.", "날아가는 중..", "날아가는 중..."];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % loadingText.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading">
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
