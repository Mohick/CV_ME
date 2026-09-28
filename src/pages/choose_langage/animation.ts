import gsap from "gsap";

export const pageEnterAnimation = (
  myCvRef: HTMLElement,
  titleRef: HTMLElement,
  pickerRef: HTMLElement,
  buttonRef: HTMLElement
) => {
  const tl = gsap.timeline();

  // Đặt trạng thái ban đầu để tránh chớp giật
  gsap.set([myCvRef, titleRef, buttonRef], { opacity: 0 });
  gsap.set(pickerRef, { opacity: 0, height: 0 }); // Khởi tạo height = 0 cho Picker

  // Lấy danh sách từng ký tự (chữ cái) trong 2 tiêu đề
  const myCvChars = myCvRef.querySelectorAll(".my-cv-char");
  const titleChars = titleRef.querySelectorAll(".title-char");

  // 1. Tiêu đề MY CV hiển thị, từng chữ cái nảy lên
  tl.to(myCvRef, { opacity: 1, duration: 0 }) // Bật container
    .fromTo(
      myCvChars,
      { y: 100, opacity: 0, scale: 0.5 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.1 }
    )
  // 2. Tiêu đề CHOOSE LANGUAGE lướt từng chữ lên
    .to(titleRef, { opacity: 1, duration: 0 }, "-=0.4")
    .fromTo(
      titleChars,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.03 },
      "-=0.6"
    )
  // 3. Khung Picker nở ra từ height 0 -> 260px và hiện lên
    .to(
      pickerRef,
      { opacity: 1, height: 260, duration: 1, ease: "elastic.out(1, 0.7)" },
      "-=0.2"
    )
  // 4. Nút Start lướt từ bên phải sang với hiệu ứng cao su
    .fromTo(
      buttonRef,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.7"
    );

  return tl;
};

export const pageExitAnimation = (
  myCvRef: HTMLElement,
  titleRef: HTMLElement,
  pickerRef: HTMLElement,
  buttonRef: HTMLElement,
  onComplete: () => void
) => {
  const tl = gsap.timeline({ onComplete });

  // Thu hồi nút Start
  tl.to(buttonRef, { x: 100, opacity: 0, duration: 0.5, ease: "back.in(1.5)" })
  // Xẹp khung Picker
    .to(pickerRef, { height: 0, opacity: 0, duration: 0.6, ease: "power3.inOut" }, "-=0.3")
  // Tiêu đề nhỏ mờ dần bay lên
    .to(titleRef, { y: -20, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.4")
  // Chữ MY CV to biến mất
    .to(myCvRef, { y: -100, opacity: 0, scale: 0.8, duration: 0.5, ease: "back.in(1.2)" }, "-=0.2");

  return tl;
};
