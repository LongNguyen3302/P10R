document.addEventListener("DOMContentLoaded", function () {
    // Function to handle button clicks
    function handleClick(event) {
        const buttonId = event.target.id;
        let message = "Feature coming soon!";

        switch (buttonId) {
            case "resume":
                message = "Resume Builder will help you create a professional resume! ";
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

// Function to toggle chatbox visibility
    function toggleChatbox() {
        var chatbox = document.getElementById("chatbox");
        if (chatbox.style.display === "none" || chatbox.style.display === "") {
            chatbox.style.display = "flex";
        } else {
            chatbox.style.display = "none";
        }
    }

// Function to send message
    function sendMessage(event) {
        if (event && event.key !== "Enter") return; // Only send on Enter key

        var input = document.getElementById("chat-input");
        var message = input.value.trim();
        if (message === "") return;

        var chatboxBody = document.getElementById("chatbox-body");
        var newMessage = document.createElement("p");
        newMessage.textContent = "You: " + message;
        chatboxBody.appendChild(newMessage);

        input.value = ""; // Clear input
        chatboxBody.scrollTop = chatboxBody.scrollHeight; // Auto-scroll
    }

    // Attach click event to all buttons
    document.querySelectorAll(".toolbar button").forEach(button => {
        button.addEventListener("click", handleClick);
    });
});

