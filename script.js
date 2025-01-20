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
