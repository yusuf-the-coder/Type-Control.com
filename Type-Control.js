function myfunc(event) {
    event.preventDefault();

    var email = document.getElementById("Email").value;
    var name = document.getElementById("name").value;

    if (email && name) {
        let data = JSON.parse(localStorage.getItem("referrals")) || [];
        data.push({ email, name });
        localStorage.setItem("referrals", JSON.stringify(data));

        // Redirect to viewer page
        window.location.href = "UserData.html";
    }
}
async function checkIP() {
    const bannedIPs = ["123.45.67.89", "111.222.333.444"]; // Add IPs to ban

    try {
        // Get user IP from an API
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        const userIP = data.ip;

        console.log("User IP:", userIP);

        // Check if the IP is banned
        if (bannedIPs.includes(userIP)) {
            document.getElementById("status").innerHTML = "🚫 Access Denied. Your IP is banned.";
            document.body.innerHTML = "<h1>🚫 Access Denied</h1><p>Your IP has been banned.</p>";
        } else {
            document.getElementById("status").innerHTML = "✅ Access Granted. Welcome!";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("status").innerHTML = "⚠ Error checking access.";
    }
}

checkIP();

const bannedIPs = ["123.45.67.89", "111.222.333.444"];