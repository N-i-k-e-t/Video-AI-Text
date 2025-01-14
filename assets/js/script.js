const promptInput = document.getElementById('promptInput');
const enterButton = document.getElementById('enterButton');
const videoContainer = document.querySelector('.video-container');
const videoPlayer = document.getElementById('videoPlayer');

enterButton.addEventListener('click', () => {
    const prompt = promptInput.value.trim().toLowerCase();
    if (prompt === "") {
        alert("Please enter a prompt!");
        return;
    }
    const videoURL = getVideoURL(prompt);
    if (videoURL) {
        videoPlayer.src = videoURL;
        videoPlayer.onloadedmetadata = () => { // Wait for metadata to load
            videoContainer.classList.add('visible');
            videoPlayer.play().catch(error => {
                console.error("Autoplay failed:", error);
              // Handle autoplay failure gracefully (e.g., show a message or let the user play manually).
            });
        };
        videoPlayer.onerror = (error) => {
            console.error("Error loading video:", error);
            alert("Error loading video. Check file name and path.");
        };
    } else {
        alert("No video found for that prompt.");
    }
});

promptInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        enterButton.click();
    }
});

//This function now uses relative paths (adjust if your videos are in a subfolder)
function getVideoURL(prompt) {
    const videoUrls = {
        "lighting lamp": "..assets/Flame.mp4", // Relative path from your HTML
        "Lighting Lamp": "assets/Flame.mp4"
        "Startup Inguartion Lighting lamp": "assets/Flame.mp4"
        "Start-up day": "assets/Flame.mp4"
        // Add more prompts and video URLs as needed...
    };
    return videoUrls[prompt] || null;
}
