const audio = document.getElementById("song");
const lyricsContainer = document.getElementById("lyrics");

// Lyrics with timing converted from YouTube timestamps
const lyrics = [
    { time: 0, text: "Mountain River Starlight", pinyin: "" },
    { time: 10, text: "云海万里放飞远行的白鸽", pinyin: "The white dove spreads its wings and flies far in the sea of clouds" },
    { time: 15, text: "朝阳在瞳孔里染出一抹红", pinyin: "The sky dyed a red color in the pupils" },
    { time: 20, text: "微风收集满街花香的欢歌", pinyin: "The autumn wind carries the scent of flowers through the streets" },
    { time: 25, text: "把天地的美传给万家灯火", pinyin: "Bringing the beauty of heaven and earth to light up every home" },
    { time: 35, text: "风华千秋映照伟业的辽阔", pinyin: "The glory of the ages reflects the vastness of the great cause" },
    { time: 40, text: "追梦人在历史长河里求索", pinyin: "The dream-seeker searches in the long river of history" },
    { time: 45, text: "流金岁月绘出英雄的轮廓", pinyin: "Golden years draw the lines of a hero" },
    { time: 50, text: "将时代号子吹入街头巷陌", pinyin: "Breathe the songs of the times into the streets and alleys" },
    { time: 60, text: "世间万顷山河点亮家国星光", pinyin: "Mountains and rivers for thousands of years light up the stars of the country's homeland" },
    { time: 66, text: "奋斗的人勇敢前行在路上", pinyin: "Brave fighters march on the streets" },
    { time: 71, text: "遥忆先辈的理想无畏绽放", pinyin: "Recalling the ideals of our ancestors and smiling fearlessly" },
    { time: 76, text: "青春热血的流淌温暖悠长", pinyin: "Long-lasting warm youthful blood" },
    { time: 81, text: "世间万顷山河你我家国星光", pinyin: "There are thousands of mountains and rivers in the world, you and the starlight of my homeland" },
    { time: 86, text: "年轻的心永远逐梦在远方", pinyin: "Immature heart always pursues distant dreams" },
    { time: 91, text: "走在复兴大道上人来人往", pinyin: "People come and go on Revival Avenue" },
    { time: 95, text: "盛世的歌在新的百年传唱", pinyin: "The song of the prosperous times will be sung in the new century" },
    { time: 102, text: "云海万里放飞远行的白鸽", pinyin: "The white dove spreads its wings and flies far in the sea of clouds" },
    { time: 107, text: "朝阳在瞳孔里染出一抹红", pinyin: "The sky dyed a red color in the pupils" },
    { time: 112, text: "微风收集满街花香的欢歌", pinyin: "The autumn wind carries the scent of flowers through the streets" },
    { time: 117, text: "把天地的美传给万家灯火", pinyin: "Bringing the beauty of heaven and earth to light up every home" },
    { time: 137, text: "云海万里放飞远行的白鸽", pinyin: "The white dove spreads its wings and flies far in the sea of clouds" },
    { time: 142, text: "朝阳在瞳孔里染出一抹红", pinyin: "The sky dyed a red color in the pupils" },
    { time: 147, text: "微风收集满街花香的欢歌", pinyin: "The autumn wind carries the scent of flowers through the streets" },
    { time: 152, text: "把天地的美传给万家灯火", pinyin: "Bringing the beauty of heaven and earth to light up every home" },
    { time: 161, text: "风华千秋映照伟业的辽阔", pinyin: "The glory of the ages reflects the vastness of the great cause" },
    { time: 166, text: "追梦人在历史长河里求索", pinyin: "The dream-seeker searches in the long river of history" },
    { time: 172, text: "流金岁月绘出英雄的轮廓", pinyin: "Golden years draw the lines of a hero" },
    { time: 177, text: "将时代号子吹入街头巷陌", pinyin: "Breathe the songs of the times into the streets and alleys" },
    { time: 186, text: "世间万顷山河点亮家国星光", pinyin: "Mountains and rivers for thousands of years light up the stars of the country's homeland" },
    { time: 192, text: "奋斗的人勇敢前行在路上", pinyin: "Brave fighters march on the streets" },
    { time: 197, text: "遥忆先辈的理想无畏绽放", pinyin: "Recalling the ideals of our ancestors and smiling fearlessly" },
    { time: 202, text: "青春热血的流淌温暖悠长", pinyin: "Long-lasting warm youthful blood" },
    { time: 207, text: "世间万顷山河你我家国星光", pinyin: "There are thousands of mountains and rivers in the world, you and the starlight of my homeland" },
    { time: 212, text: "年轻的心永远逐梦在远方", pinyin: "Immature heart always pursues distant dreams" },
    { time: 217, text: "走在复兴大道上人来人往", pinyin: "People come and go on Revival Avenue" },
    { time: 222, text: "盛世的歌在新的百年传唱", pinyin: "The song of the prosperous times will be sung in the new century" },
    { time: 228, text: "云海万里放飞远行的白鸽", pinyin: "The white dove spreads its wings and flies far in the sea of clouds" },
    { time: 233, text: "朝阳在瞳孔里染出一抹红", pinyin: "The sky dyed a red color in the pupils" },
    { time: 238, text: "微风收集满街花香的欢歌", pinyin: "The autumn wind carries the scent of flowers through the streets" },
    { time: 243, text: "把天地的美传给万家灯火", pinyin: "Bringing the beauty of heaven and earth to light up every home" }
];

let hasStarted = false;
let currentLyricIndex = -1;

// Improved function to find the right lyric based on time
function findLyricByTime(currentTime) {
    // Find the next lyric that should be displayed
    for (let i = 0; i < lyrics.length - 1; i++) {
        if (currentTime >= lyrics[i].time && currentTime < lyrics[i + 1].time) {
            return i;
        }
    }

    // For the last lyric
    if (currentTime >= lyrics[lyrics.length - 1].time) {
        return lyrics.length - 1;
    }

    return -1;
}

// Add display for both Chinese and translation
function updateLyricsDisplay(lyric) {
    lyricsContainer.innerHTML = `
        <div class="lyric-container">
            <div class="chinese highlight" style="opacity: 0; transition: opacity 0.8s ease-in-out;">${lyric.text}</div>
            <div class="english highlight" style="opacity: 0; transition: opacity 0.8s ease-in-out; margin-top: 10px; font-size: 0.9em;">${lyric.pinyin}</div>
        </div>
    `;

    // Fade in animation
    setTimeout(() => {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(el => {
            el.style.opacity = 1;
        });
    }, 10);
}

function startMusic() {
    if (!hasStarted) {
        audio.play();
        hasStarted = true;
        audio.addEventListener('timeupdate', syncLyrics);

        // Add UI button visibility
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('controls').style.display = 'flex';
    }
}

function pauseMusic() {
    audio.pause();
    document.getElementById('play-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'none';
}

function resumeMusic() {
    audio.play();
    document.getElementById('play-button').style.display = 'none';
    document.getElementById('pause-button').style.display = 'block';
}

function syncLyrics() {
    const currentTime = audio.currentTime;
    const newLyricIndex = findLyricByTime(currentTime);

    if (newLyricIndex !== -1 && newLyricIndex !== currentLyricIndex) {
        currentLyricIndex = newLyricIndex;
        updateLyricsDisplay(lyrics[currentLyricIndex]);
    }

    // Update progress bar
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    // Update time display
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);

    document.getElementById('time-display').textContent =
        `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / 
         ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

// Add event listener for the progress bar click
document.getElementById('progress-container').addEventListener('click', function(e) {
    const progressContainer = document.getElementById('progress-container');
    const rect = progressContainer.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;

    // Set the audio time based on click position
    audio.currentTime = clickPosition * audio.duration;
});

// Add CSS styles for better display
document.head.insertAdjacentHTML('beforeend', `
<style>
    #lyrics {
        text-align: center;
        margin: 20px 0;
        min-height: 100px;
        font-size: 1.5em;
        padding: 20px;
        background-color: rgba(0,0,0,0.03);
        border-radius: 10px;
    }
    
    .lyric-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .chinese {
        font-weight: bold;
        font-size: 1.8em;
    }
    
    .english {
        color: #555;
        font-size: 1.1em;
        margin-top: 10px;
    }
    
    #controls {
        display: none;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        flex-wrap: wrap;
    }
    
    #progress-container {
        width: 80%;
        height: 10px;
        background-color: #e0e0e0;
        border-radius: 5px;
        margin: 0 10px;
        cursor: pointer;
        position: relative;
    }
    
    #progress-bar {
        height: 100%;
        background-color: #4CAF50;
        border-radius: 5px;
        width: 0%;
        transition: width 0.1s;
    }
    
    #time-display {
        font-size: 0.9em;
        color: #666;
        margin-top: 5px;
        width: 100%;
        text-align: center;
    }
    
    button {
        padding: 10px 20px;
        margin: 10px 5px;
        border: none;
        border-radius: 5px;
        background-color: #4285F4;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1em;
    }
    
    button:hover {
        background-color: #3367D6;
    }
    
    #player-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 10px;
        background-color: white;
    }
    
    @media (max-width: 600px) {
        #progress-container {
            width: 100%;
            margin: 10px 0;
        }
        
        #controls {
            flex-direction: column;
        }
    }
</style>
`);

// Add player UI elements
document.body.insertAdjacentHTML('beforeend', `
<div id="player-container">
    <button id="start-button" onclick="startMusic()">Phát nhạc</button>
    
    <div id="controls">
        <button id="play-button" onclick="resumeMusic()" style="display:none">Phát</button>
        <button id="pause-button" onclick="pauseMusic()">Tạm dừng</button>
        
        <div id="progress-container">
            <div id="progress-bar"></div>
        </div>
        
        <div id="time-display">0:00 / 0:00</div>
    </div>
</div>
`);
