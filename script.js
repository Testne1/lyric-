const audio = document.getElementById("song");
const lyricsContainer = document.getElementById("lyrics");

// Danh sách lời bài hát và thời gian xuất hiện (giây)
const lyrics = [
    { time: 26, text: "云深夜微凉" },
    { time: 31, text: "皎月清风拂心绕" },
    { time: 38, text: "一人对雪望" },
    { time: 42, text: "望尽前尘事过往" },
    { time: 49, text: "姑苏天子笑" },
    { time: 53, text: "埋雪独藏风华貌" },
    { time: 61, text: "静室琴声遥" },
    { time: 65, text: "弹一曲问灵空回响" },
    { time: 75, text: "你还在问吗" },
    { time: 79, text: "问尽古来世人的痴狂" },
    { time: 86, text: "谁又在远方" },
    { time: 90, text: "再问世间故人黑白毁誉几多量" },
    { time: 98, text: "还能忘记吗" },
    { time: 101, text: "云深共许一诺人茫茫" },
    { time: 109, text: "君又在何方" },
    { time: 113, text: "相望不忘" },
    { time: 119, text: " " },
    { time: 127, text: "泽世韵含光" },
    { time: 132, text: "逢乱必出声名扬" },
    { time: 139, text: "他却不肯忘" },
    { time: 143, text: "踏尽前尘事过往" },
    { time: 151, text: "避尘铮鸣响" },
    { time: 155, text: "难避恩怨是非狂" },
    { time: 162, text: "静室琴声遥" },
    { time: 166, text: "弹一曲问灵空回响" },
    { time: 176, text: "你还在问吗" },
    { time: 180, text: "问尽古来世人的痴狂" },
    { time: 186, text: "谁又在远方" },
    { time: 140, text: "再问世间故人黑白毁誉几多量" },
    { time: 192, text: "还能忘记吗" },
    { time: 199, text: "云深共许一诺人茫茫" },
    { time: 203, text: "君又在何方" },
    { time: 210, text: "相望不忘" },
    { time: 215, text: "你还在问吗" },
    { time: 255, text: "不问古今世人的痴狂" },
    { time: 260, text: "谁又在远方" },
    { time: 267, text: "难解世间故人黑白毁誉几多量" },
    { time: 271, text: "还能忘记吗" },
    { time: 284, text: "看客散去唯你我不忘" },
    { time: 290, text: "与君在身旁" }
];

let hasStarted = false;
let currentLyricIndex = -1;

function startMusic() {
    if (!hasStarted) {
        audio.play();
        hasStarted = true;
        audio.addEventListener('timeupdate', syncLyrics);
    }
}

function syncLyrics() {
    const currentTime = Math.floor(audio.currentTime);
    const newLyricIndex = lyrics.findIndex(lyric => lyric.time === currentTime);

    if (newLyricIndex !== -1 && newLyricIndex !== currentLyricIndex) {
        currentLyricIndex = newLyricIndex;
        const currentLyric = lyrics[currentLyricIndex];

        lyricsContainer.innerHTML = `<span class="highlight" style="opacity: 0; transition: opacity 1s ease-in-out;">${currentLyric.text}</span>`;
        setTimeout(() => {
            document.querySelector('.highlight').style.opacity = 1;
        }, 10);

        setTimeout(() => {
            if (document.querySelector('.highlight')) {
                document.querySelector('.highlight').style.opacity = 0;
            }
        }, 3000);
    }
}