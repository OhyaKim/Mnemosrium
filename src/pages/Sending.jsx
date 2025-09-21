import { useEffect, useState } from "react";
import "../styles/Sending.css"

function SendingPage() {
    const loadingText = ["기록되는 중", "기록되는 중.", "기록되는 중..", "기록되는 중..."];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % loadingText.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sending">
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
