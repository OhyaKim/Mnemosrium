import { useState, useEffect, useLayoutEffect, useRef, memo } from "react";
import "../styles/Feed.css";
import Pattern from "../components/pattern";
import { supabase } from "../utils/Database";

function FeedPage() {
    const [memories, setMemories] = useState([]);
    const [viewCount, setViewCount] = useState(0);
    const [pendingQueue, setPendingQueue] = useState([]); // 대기 중인 새 데이터 배열
    const [currentPending, setCurrentPending] = useState(null); // 현재 애니메이션 중인 데이터

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);

        const timer = setTimeout(() => {
            setFadeIn(false);
        }, 1600);

        return () => clearTimeout(timer);
    }, []);


    // ---------------- 초기 데이터 로드 ----------------
    useEffect(() => {
        const loadMemory = async () => {
            const { data, error } = await supabase
                .from("Mnemosrium:proto")
                .select("*")
                .order("time", { ascending: true });

            if (error) console.error("데이터 불러오기 실패:", error.message);
            else setMemories(data);
        };
        loadMemory();
    }, []);

    // ---------------- 실시간 구독 ----------------
    useEffect(() => {
        const channel = supabase
            .channel("memories-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "Mnemosrium:proto" },
                (payload) => {
                    setPendingQueue(prev => [...prev, payload.new]); // 큐에 추가
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, []);

    // ---------------- 애니메이션 큐 처리 ----------------
    const [appear, setAppear] = useState(false);
    const [fixed, setFixed] = useState(true);

    // 큐에 데이터가 있고 현재 애니메이션 중이 아니면 꺼내서 처리
    useEffect(() => {
        if (!currentPending && pendingQueue.length > 0) {
            const nextData = pendingQueue[0];
            setCurrentPending(nextData);
            setPendingQueue(prev => prev.slice(1));
            setAppear(true);
            setFixed(false);
        }
    }, [pendingQueue, currentPending]);

    const handleAnimationEnd = () => {
        if (currentPending) {
            setMemories(prev => [...prev, currentPending]);
            setCurrentPending(null); // 다음 데이터로 넘어감
            setAppear(false);
            setFixed(true);
        }
    };


    // 높이 측정용 ref와 보이는 영역 ref를 분리
    const measureRef = useRef(null);
    const newRef = useRef(null);

    // ---------------- visibleCount 계산 ----------------
    useLayoutEffect(() => {
        if (!measureRef.current) return;

        const MaxHeight = window.innerHeight * 0.68;
        let currentTotalHeight = 0;
        let calculatedCount = 0;

        const children = Array.from(measureRef.current.children);

        for (let i = children.length - 1; i >= 0; i--) {
            currentTotalHeight += children[i].offsetHeight;
            if (currentTotalHeight <= MaxHeight) {
                calculatedCount++;
            } else break;
        }

        const finalCount = calculatedCount === 0 ? memories.length : calculatedCount;
        setViewCount(finalCount);

        // 실제 누적 높이로 drop 지정
        document.documentElement.style.setProperty(`--Height`, `${window.innerHeight}px`);
        document.documentElement.style.setProperty(`--drop`, `${currentTotalHeight}px`);
    }, [memories]);


    useLayoutEffect(() => {
        if (!newRef.current) return;

        const measure = () => {
            const newH = newRef.current.offsetHeight || 0;
            document.documentElement.style.setProperty(`--newH`, `${newH}px`);
        };

        requestAnimationFrame(measure);
    }, [currentPending]);

    // ---------------- 렌더 ----------------
    return (
        <div className={`feeds ${fadeIn ? "fadeIn" : ""}`}>
            {/* 배경 */}
            <div className="feeds-bg">
                <div className="feeds-grd">
                    <div className="feeds-grd01"></div>
                    <div className="feeds-grd02"></div>
                </div>
                <Pattern />
            </div>

            {/* 콘텐츠 */}
            <div className="feeds-cont">
                <div className="feeds-title-bg"></div>
                <div className="feeds-title-text">
                    소중한 기억들이
                    <br />
                    모이고 있어요
                </div>

                <div className="feeds-feeds">
                    {/* 새로 들어오는 데이터 */}
                    {currentPending && (
                        <div
                            className={`feed-new ${appear ? "appear" : ""} ${fixed ? "fixed" : ""}`}
                            onAnimationEnd={handleAnimationEnd}
                            ref={newRef}
                        >
                            <div className={currentPending.style}>
                                {currentPending.memory}
                            </div>
                        </div>
                    )}


                    <div className={`feeds-prev ${appear ? "appear" : ""}`}>
                        {/* 실제 보이는 영역 */}
                        <div className="feeds-view">
                            {memories.slice(-viewCount).map((m, idx) => (
                                <div
                                    key={m.id ?? idx}
                                    className={m.style}

                                >
                                    {m.memory}
                                </div>
                            ))}
                        </div>


                        {/* 높이 측정용 숨겨진 컨테이너 */}
                        <div className="feeds-measure" ref={measureRef}>
                            {memories.map((m, idx) => (
                                <div key={m.id ?? idx} className={m.style}>
                                    {m.memory}
                                </div>
                            ))}
                        </div>

                        <div className="feeds-scroll">
                            {memories.slice(0, -viewCount).map((m) => (
                                <div key={m.id} className={m.style}>
                                    {m.memory}
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedPage;