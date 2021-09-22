(function app() {
  const sound = document.querySelector(".sound"),
    play = document.querySelector(".play"),
    outline = document.querySelector(".moving_outline circle"),
    video = document.querySelector(".video_container video");
  const outlineLength = outline.getTotalLength();

  const soundPicker = document.querySelectorAll(".sound_picker button"),
    timeSelect = document.querySelectorAll(".time_select button"),
    timeDisplay = document.querySelector(".time_display");

  //============ duration=============
  let fakeDuration = 600;
  // 디폴트값

  // 파란색으로 감싸지는 길이
  outline.style.strokeDasharray = outlineLength;

  // 파란색이 걷어지고 흰색이 들어나는 범위
  outline.style.strokeDashoffset = outlineLength;

  //=============  재생시간 업데이트==============
  sound.ontimeupdate = () => {
    let currentTime = sound.currentTime,
      elapsed = fakeDuration - currentTime,
      sec = Math.floor(elapsed % 60),
      //  초는 60으로 나누고 그 나머지 값
      min = Math.floor(elapsed / 60);
    //  분은 60으로 나눠지는 값

    // animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    // ㅍㅓ센트 구하는 식 (현재시간 / 듀레이션 ) * 컨테이너 총길이
    outline.style.strokeDashoffset = progress;
    // 프로그레스 만큼만 파랑 걷어내기

    // timeDisplay
    timeDisplay.textContent = `${min}:${sec}`;

    // 만약 현재시간이 듀레이션보다 크면
    if(currentTime >= fakeDuration) {
         sound.pause();
        video.pause();
         currentTime = 0;
      play.src = "./svg/play.svg";



    }
  };

//   ============== 사운드 피커 ==================
soundPicker.forEach(s => {
    s.addEventListener("click", function() {
        sound.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");

playSound(sound);
    })
})



  //================  시간 고르기=============
  timeSelect.forEach((time) => {
    time.addEventListener("click", function(){
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(
          fakeDuration / 60
        )} : ${Math.floor(fakeDuration % 60)}`;

    });

  });
  //============================ play sound =================
  function playSound(sound) {
    if (sound.paused) {
      sound.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      sound.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  }

  play.addEventListener("click", () => {
    playSound(sound);
  });
})();
