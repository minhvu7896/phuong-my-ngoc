var boxgift = document.querySelector(".box-gift");
var Close = document.querySelector(".fa-xmark");
var boxContent = document.querySelector(".box-content");
var content = document.querySelector(".content");
var clickCount = 0;

boxgift.onclick = function () {
  clickCount++;

  if (clickCount === 1) {
    // Lần click đầu: mở hộp quà
    boxgift.classList.add("active");
  } else if (clickCount === 2) {
    // Lần click thứ hai: mở thiệp
    boxContent.classList.add("active");
  } else {
    // Lần click thứ ba: đóng hộp quà và reset
    boxgift.classList.remove("active");
    boxContent.classList.remove("active");
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
  clickCount = 2; // Giữ trạng thái đã mở thiệp, click tiếp sẽ đóng hộp quà
};
