const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleButtonInteraction = async (button, loadingText, defaultText) => {
    button.disabled = true;
    button.innerHTML = loadingText;

    try {
        await delay(2000);
        button.innerHTML = defaultText;
    } catch (error) {
        button.innerHTML = "Error Occurred!";
        console.error(error);
    } finally {
        button.disabled = false;
    }
};

const addMobileSupport = (element, handler) => {
    element.addEventListener('click', handler);
    element.addEventListener('touchstart', handler, { passive: true });
};

document.addEventListener("DOMContentLoaded", function () {
    const getScriptBtn = document.getElementById('getScriptBtn');
    const joinDiscordBtn = document.getElementById('joinDiscordBtn');

    addMobileSupport(getScriptBtn, function () {
        handleButtonInteraction(this, "Getting", "Get Script");
    });

    addMobileSupport(joinDiscordBtn, function () {
        handleButtonInteraction(this, "Joining", "Join Discord");
    });

    const checkRepositoryStatus = async () => {
        const repoUrl = 'https://api.github.com/repos/vexgamedev/vexgamedev.github.io/contents';
        try {
            const response = await fetch(repoUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch repository data. Status: ${response.status}`);
            }
            const data = await response.json();
            return Array.isArray(data);  
        } catch (error) {
            console.error('Error fetching GitHub repository status:', error);
            return false;
        }
    };

    const updateStatus = async () => {
        const statusDot = document.getElementById("statusDot");
        const statusText = document.getElementById("statusText");

        try {
            const isOnline = await checkRepositoryStatus();
            if (isOnline) {
                statusDot.classList.add("online");
                statusDot.classList.remove("offline");
                statusText.textContent = "Online";
            } else {
                statusDot.classList.add("offline");
                statusDot.classList.remove("online");
                statusText.textContent = "Offline";
            }
        } catch (error) {
            statusText.textContent = "Error: " + error.message;
            console.error(error);
        }
    };

    const startStatusPolling = () => {
        updateStatus(); 
        setInterval(updateStatus, 6000); 
    };

    startStatusPolling();
});

const resizeUI = () => {
    const screenWidth = window.innerWidth;
    const title = document.querySelector('.title');
    const buttons = document.querySelectorAll('.btn-left, .btn-right');
    
    if (screenWidth <= 480) {
        title.style.fontSize = '2.4em';
        buttons.forEach(btn => {
            btn.style.fontSize = '15px';
            btn.style.width = '160px';
        });
    } else if (screenWidth <= 768) {
        title.style.fontSize = '2.8em';
        buttons.forEach(btn => {
            btn.style.fontSize = '17px';
            btn.style.width = '180px';
        });
    } else {
        title.style.fontSize = '3.2em';
        buttons.forEach(btn => {
            btn.style.fontSize = '18px';
            btn.style.width = '220px';
        });
    }
};

window.addEventListener('resize', resizeUI);
resizeUI(); 
