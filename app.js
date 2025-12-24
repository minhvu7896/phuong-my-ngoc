// Track page visit
fetch("https://common.antstocks.com.vn/api/visit", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
}).catch((error) => {
  console.log("Visit tracking sent (or failed silently):", error);
});

var boxgift = document.querySelector(".box-gift");
var Close = document.querySelector(".fa-xmark");
var boxContent = document.querySelector(".box-content");
var content = document.querySelector(".content");
var clickCount = 0;
var isPasswordVerified = false;

boxgift.onclick = function () {
  clickCount++;

  if (clickCount === 1) {
    // Lần click đầu: mở hộp quà
    boxgift.classList.add("active");
  } else if (clickCount === 2) {
    // Lần click thứ hai: mở thiệp (hiển thị form mật khẩu)
    boxContent.classList.add("active");
  } else {
    // Lần click thứ ba: đóng hộp quà và reset
    boxgift.classList.remove("active");
    boxContent.classList.remove("active");
    fullTextElement.textContent = "";
    isPasswordVerified = false;
    document.querySelector(".password-section").style.display = "block";
    document.querySelector(".content-text").style.display = "none";
    document.getElementById("passwordInput").value = "";
    document.getElementById("passwordError").style.display = "none";
    clickCount = 0;
  }
};

// Giữ lại chức năng click trực tiếp vào thiệp (nếu ai đó muốn)
content.onclick = function (e) {
  e.stopPropagation(); // Ngăn sự kiện lan ra boxgift
  boxContent.classList.add("active");
};

Close.onclick = function () {
  boxContent.classList.remove("active");
  fullTextElement.textContent = "";
  isPasswordVerified = false;
  document.querySelector(".password-section").style.display = "block";
  document.querySelector(".content-text").style.display = "none";
  document.querySelector(".question-section").style.display = "none";
  document.querySelector(".message-section").style.display = "none";
  document.getElementById("continueBtn").style.display = "none";
  document.getElementById("passwordInput").value = "";
  document.getElementById("passwordError").style.display = "none";
  clickCount = 2; // Giữ trạng thái đã mở thiệp, click tiếp sẽ đóng hộp quà
};

// Password verification
function verifyPassword(input) {
  // Loại bỏ dấu tiếng Việt và chuyển về chữ thường để so sánh
  const normalized = input.toLowerCase().replace(/\s+/g, "");
  const validPasswords = [
    "phuongmyngoc",
    "phươngmỹngọc",
    "phương mỹ ngọc",
    "phuong my ngoc",
  ];

  // Kiểm tra cả trường hợp có và không có khoảng trắng
  const inputNoSpace = normalized;
  const inputWithSpace = input.toLowerCase().trim();

  return validPasswords.some((pwd) => {
    const pwdNoSpace = pwd.replace(/\s+/g, "");
    return inputNoSpace === pwdNoSpace || inputWithSpace === pwd;
  });
}

// Xử lý nút mở thư
document.getElementById("unlockBtn").onclick = function () {
  const passwordInput = document.getElementById("passwordInput");
  const passwordError = document.getElementById("passwordError");

  if (verifyPassword(passwordInput.value)) {
    isPasswordVerified = true;
    passwordError.style.display = "none";
    document.querySelector(".password-section").style.display = "none";
    document.querySelector(".content-text").style.display = "block";
    setTimeout(startTyping, 500);
  } else {
    passwordError.style.display = "block";
    passwordInput.value = "";
    passwordInput.focus();
  }
};

// Cho phép nhấn Enter để mở thư
document
  .getElementById("passwordInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("unlockBtn").click();
    }
  });

// Music Control
var bgMusic = document.getElementById("bgMusic");
var musicIcon = document.getElementById("musicIcon");
var isMusicPlaying = false;

musicIcon.onclick = function () {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicIcon.classList.remove("fa-volume-high");
    musicIcon.classList.add("fa-volume-xmark");
    isMusicPlaying = false;
  } else {
    bgMusic.play();
    musicIcon.classList.remove("fa-volume-xmark");
    musicIcon.classList.add("fa-volume-high");
    isMusicPlaying = true;
  }
};

// Typewriter effect
function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.textContent = "";
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }
  type();
}

const fullTextElement = document.getElementById("fullText");

const fullTextContent = `2025!

 Noel came to us, honey. I want to say that I love you so much and will stand by you forever. Wish you the sweetest things!

 I know I'm not your first love...but I'd love to be your last...

 From Minh Vu to My Ngoc`;

function startTyping() {
  document.getElementById("continueBtn").style.display = "none";
  typeWriter(fullTextElement, fullTextContent, 50, function () {
    // Hiển thị nút "Tiếp tục" sau khi text hiển thị xong
    document.getElementById("continueBtn").style.display = "block";
  });
}

// Xử lý nút "Tiếp tục"
document.getElementById("continueBtn").onclick = function () {
  document.querySelector(".content-text").style.display = "none";
  document.querySelector(".question-section").style.display = "block";
};

// Xử lý nút "No" - di chuyển random khi hover
const noBtn = document.getElementById("noBtn");
let noBtnMoved = false;

noBtn.addEventListener("mouseenter", function (event) {
  const content1 = document.querySelector(".content1");
  const questionText = document.querySelector(".question-text");
  const content1Rect = content1.getBoundingClientRect();
  const questionRect = questionText.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Lấy vị trí con trỏ chuột
  const mouseX = event.clientX - content1Rect.left;
  const mouseY = event.clientY - content1Rect.top;

  // Tính toán vùng có thể di chuyển (dưới câu hỏi, trong content1)
  const minY = questionRect.bottom - content1Rect.top + 20; // Dưới câu hỏi 20px
  const maxY = content1Rect.height - btnRect.height - 40; // Cách đáy 40px
  const maxX = content1Rect.width - btnRect.width - 40; // Cách mép 40px

  let randomX, randomY;
  let attempts = 0;
  const maxAttempts = 30;
  const minDistance = 150; // Tăng khoảng cách tối thiểu

  // Tìm vị trí không trùng với con trỏ chuột
  do {
    randomX = 40 + Math.random() * Math.max(0, maxX - 40);
    randomY = minY + Math.random() * Math.max(0, maxY - minY);

    // Tính khoảng cách từ tâm nút đến con trỏ chuột
    const btnCenterX = randomX + btnRect.width / 2;
    const btnCenterY = randomY + btnRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(btnCenterX - mouseX, 2) + Math.pow(btnCenterY - mouseY, 2)
    );

    // Nếu khoảng cách > minDistance thì chấp nhận
    if (distance > minDistance) {
      break;
    }

    attempts++;
  } while (attempts < maxAttempts);

  if (!noBtnMoved) {
    noBtn.style.position = "absolute";
    noBtnMoved = true;
  }

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});

// Xử lý nút "Yes"
document.getElementById("yesBtn").onclick = async function () {
  // Gửi API lần 1 khi nhấn Yes
  fetch("https://common.antstocks.com.vn/api/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
    },
    body: JSON.stringify({
      senderName: "My Ngoc",
      senderEmail: "myngocne",
      subject: "Accept",
      message: "She say Yes",
    }),
  }).catch((error) => {
    console.error("Error sending initial acceptance email:", error);
  });

  // Hiển thị màn hình nhập tin nhắn
  document.querySelector(".question-section").style.display = "none";
  document.querySelector(".message-section").style.display = "block";
};

// Xử lý gửi tin nhắn
document.getElementById("sendBtn").onclick = async function () {
  const message = document.getElementById("messageInput").value;

  if (!message.trim()) {
    alert("Vui lòng nhập tin nhắn!");
    return;
  }

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = true;
  sendBtn.textContent = "Đang gửi...";

  try {
    const response = await fetch(
      "https://common.antstocks.com.vn/api/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
        },
        body: JSON.stringify({
          senderName: "My Ngoc",
          senderEmail: "myngocne",
          subject: "Accept",
          message: message,
        }),
      }
    );

    if (response.ok) {
      alert("Tin nhắn đã được gửi thành công! ❤️");
      document.getElementById("messageInput").value = "";
      document.querySelector(".message-section").style.display = "none";
      document.querySelector(".content-text").style.display = "block";
      document.querySelector(".content-text p").textContent =
        "Anh nhận được rồi, hehehe! ❤️";
      document.getElementById("continueBtn").style.display = "none";
    } else {
      alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại!");
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Gửi";
  }
};
