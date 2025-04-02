document.addEventListener("DOMContentLoaded", function () {
    // Attach click event to all toolbar buttons
    document.querySelectorAll(".toolbar button").forEach(button => {
        button.addEventListener("click", handleClick);
    });

    // Attach keyup event to send message on Enter
    document.getElementById("chat-input").addEventListener("keyup", sendMessage);
});

// Handle toolbar button clicks
function handleClick(event) {
    const buttonId = event.target.id;
    let message = "Feature coming soon!";

    switch (buttonId) {
        case "resume":
            message = "Resume Builder will help you create a professional resume!";
            break;
        case "coverLetter":
            message = "Cover Letter Generator will assist in writing tailored cover letters!";
            break;
        case "careerPath":
            message = "Career Path tool will suggest career options based on your skills!";
            break;
        case "skillGap":
            message = "Skill Gap Analysis will identify missing skills for your target job!";
            break;
        case "jobResearch":
            message = "Job Market Research tool will help you explore job trends!";
            break;
    }

    alert(message);
}

// Toggle chatbox visibility
function toggleChatbox() {
    const chatbox = document.getElementById("chatbox");
    const chatButton = document.querySelector('.chatbox-toggle');

    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex";
    } else {
        chatbox.style.display = "none";
    }

    chatButton.classList.toggle('active');
}

// Send message to backend and display response
async function sendMessage(event) {
    if (event && event.key !== "Enter") return;

    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message === "") return;

    const chatboxBody = document.getElementById("chatbox-body");

    // Display user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user-message");
    userMessage.textContent = message;
    chatboxBody.appendChild(userMessage);

    // Clear input
    input.value = "";
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    // Display "typing..." bot message
    const botMessage = document.createElement("div");
    botMessage.classList.add("chat-message", "bot-message");
    botMessage.innerHTML = `<img src="../Image/OIP.png" alt="Bot"> <span>Typing...</span>`;
    chatboxBody.appendChild(botMessage);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        botMessage.innerHTML = `<img src="../Image/OIP.png" alt="Bot"> ${data.reply}`;
        chatboxBody.scrollTop = chatboxBody.scrollHeight;
    } catch (error) {
        botMessage.innerHTML = `<img src="../Image/OIP.png" alt="Bot"> Oops! Something went wrong.`;
        console.error("Chat error:", error);
    }
}
