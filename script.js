document.getElementById('getScriptBtn').addEventListener('click', function() {
    this.innerHTML = "Getting";
    setTimeout(() => {
        this.innerHTML = "Get Script";  
    }, 2000);
});

document.getElementById('joinDiscordBtn').addEventListener('click', function() {
    this.innerHTML = "Joining";
    setTimeout(() => {
        this.innerHTML = "Join Discord";  
    }, 2000);
});

function checkScriptStatus() {
    const statusDot = document.getElementById("statusDot");
    const statusText = document.getElementById("statusText");

    setTimeout(() => {
        const isOnline = true; 

        if (isOnline) {
            statusDot.classList.add("online");
            statusDot.classList.remove("offline");
            statusText.textContent = "Online";
        } else {
            statusDot.classList.add("offline");
            statusDot.classList.remove("online");
            statusText.textContent = "Offline";
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    checkScriptStatus();
});
