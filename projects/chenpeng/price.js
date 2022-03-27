// dom加载完就执行
document.addEventListener('DOMContentLoaded', function () {
    init();
});

function init() {
    let count = 0;
    const width = document.querySelector('.wrap').clientWidth;
    const wrapDom = document.querySelectorAll('.wrap');
    const length = wrapDom.length;
    // 点击
    // document.querySelector('.pre-arrow').addEventListener('click', function () {
    //     if (count === 0) {
    //         return;
    //     }
    //     count -= 1;
    //     wrapDom.forEach((item) => {
    //         item.style.transform = `translateX(${width * count}px)`;
    //     })
    // });
    // document.querySelector('.next-arrow').addEventListener('click', function () {
    //     if (count > length - 2) {
    //         return;
    //     }
    //     count += 1;
    //     wrapDom.forEach((item) => {
    //         item.style.transform = `translateX(-${width * count}px)`;
    //     })
    // });

    // 滑动
    let startScreenX = 0, endScreenX = 0;
    document.querySelector('.swiper').addEventListener('touchstart', function (event){
        // 初始化
        startScreenX = 0;
        endScreenX = 0;
        startScreenX = event.changedTouches[0].screenX;
    })
    document.querySelector('.swiper').addEventListener('touchend', function (event){
        endScreenX = event.changedTouches[0].screenX;
        // 左滑，向右切换
        if (endScreenX < startScreenX - 20 ) {
            if (count > length - 2) {
                return;
            }
            count += 1;
            wrapDom.forEach((item) => {
                item.style.transform = `translateX(-${width * count}px)`;
            })
        }
        // 右滑，向左切换
        if (endScreenX > startScreenX + 20 ) {
            if (count === 0) {
                return;
            }
            count -= 1;
            wrapDom.forEach((item) => {
                item.style.transform = `translateX(-${width * count}px)`;
            })
        }
    })
}
