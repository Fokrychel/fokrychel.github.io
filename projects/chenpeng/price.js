// dom加载完就执行
document.addEventListener('DOMContentLoaded', function () {
    init();
});

function init() {
    let count = 0;
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

    // 屏幕旋转
    window.addEventListener('deviceorientation', function (){
        alert('deviceorientation' + document.querySelector('.wrap').clientWidth)
        count = 0;
        wrapDom.forEach((item) => {
            item.style.transform = `translateX(0)`;
        })
    })
    window.addEventListener('resize', function (){
        alert('resize' + document.querySelector('.wrap').clientWidth)
        count = 0;
        wrapDom.forEach((item) => {
            item.style.transform = `translateX(0)`;
        })
    })

    // 滑动
    let startScreenX = 0, endScreenX = 0;
    document.querySelector('.swiper').addEventListener('mousedown', function (event){
        // 初始化
        startScreenX = 0;
        endScreenX = 0;
        startScreenX = event.screenX;
    })
    document.querySelector('.swiper').addEventListener('mouseup', function (event){
        endScreenX = event.screenX;
        // 左滑，向右切换
        if (endScreenX < startScreenX - 20 ) {
            moveLeft();
        }
        // 右滑，向左切换
        if (endScreenX > startScreenX + 20 ) {
            moveRight();
        }
    })

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
            moveLeft();
        }
        // 右滑，向左切换
        if (endScreenX > startScreenX + 20 ) {
            moveRight();
        }
    })

    function moveLeft(){
        if (count > length - 2) {
            return;
        }
        count += 1;
        // 在旋转，resize之后，保证宽度是最新值
        const width = document.querySelector('.wrap').clientWidth;
        wrapDom.forEach((item) => {
            item.style.transform = `translateX(-${width * count}px)`;
        })
    }

    function moveRight(){
        if (count === 0) {
            return;
        }
        count -= 1;
        // 在旋转，resize之后，保证宽度是最新值
        const width = document.querySelector('.wrap').clientWidth;
        wrapDom.forEach((item) => {
            item.style.transform = `translateX(-${width * count}px)`;
        })
    }
}
