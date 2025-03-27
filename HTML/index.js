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

    });

// Function to toggle chatbox visibility
function toggleChatbox() {
    var chatbox = document.getElementById("chatbox");
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex";
    } else {
        chatbox.style.display = "none";
    }
    const chatButton = document.querySelector('.chatbox-toggle');
    chatButton.classList.toggle('active');
}
// Function to send message
function sendMessage(event) {
    if (event && event.key !== "Enter") return; // Only send on Enter key

    var input = document.getElementById("chat-input");
    var message = input.value.trim();
    if (message === "") return; // Don't send empty messages

    var chatboxBody = document.getElementById("chatbox-body");

    // Create new message element
    var newMessage = document.createElement("div");
    newMessage.classList.add("chat-message", "user-message"); // Add user message class
    newMessage.textContent = message;

    // Append user message to chatbox body
    chatboxBody.appendChild(newMessage);

    // Simulate bot response after a delay
    setTimeout(() => {
        var botMessage = document.createElement("div");
        botMessage.classList.add("chat-message", "bot-message"); // Add bot message class
        botMessage.innerHTML = `<img src="https://via.placeholder.com/35" alt="Bot"> Thank you for your message! We'll get back to you soon.`;
        chatboxBody.appendChild(botMessage);

        // Scroll to the bottom of the chat
        chatboxBody.scrollTop = chatboxBody.scrollHeight;
    }, 1000);

    // Clear the input field
    input.value = "";

    // Auto-scroll the chatbox to the latest message
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
}
// Attach keyup event to send message when Enter key is pressed
document.getElementById("chat-input").addEventListener("keyup", sendMessage);

// If you have a toolbar with buttons, attach events for any specific actions
function handleClick(event) {
    // Example of a button click action
    console.log("Button clicked: ", event.target);
    // You can handle specific button actions here (like opening the chatbox, etc.)
}

// Attach click event to all buttons (if you have buttons in your toolbar)
document.querySelectorAll(".toolbar button").forEach(button => {
    button.addEventListener("click", handleClick);
});

