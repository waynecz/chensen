$(function () {

    // 事件及常量 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var timer = null;
    var timerB = null;
    var C = document.getElementById('msgBox');
    var COT = C.offsetTop;
    var clientWidth = document.documentElement.clientWidth;
    var actions = {
        generateSolutionPosition: function () {
            if ((clientWidth < 1808 && clientWidth >= 1200) || clientWidth <= 830) {
                var ml = (1808 - clientWidth) / 2;
                $('#solutionList')
                    .css('marginLeft', '-' + ml + 'px')
            } else if (clientWidth < 1200 && clientWidth > 830) {
                $('#solutionList')
                    .css('marginLeft', '-304px')
                    .addClass('middle');
            }
        },
        moveChoice: function () {
            var sT = document.body.scrollTop;
            var baz = 0;
            if (clientWidth > 1440) baz = 200;
            if (sT < (COT + baz) || sT > (COT + 250)) return;
            var mT = -60 + (sT - COT ) * 0.3;
            $(window.M).css('top', mT + 'px')
        }
    };
    // 事件初始化及绑定 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    AOS.init();

    $("#owl").owlCarousel({
        slideSpeed: 300,
        singleItem: true
    });

    window.addEventListener("resize", function () {
        clearTimeout(timer);
        timer = setTimeout(actions.generateSolutionPosition, 300)
    }, false);

    window.addEventListener('scroll', function () {
        actions.moveChoice()
    }, false);
    actions.generateSolutionPosition()


    $('.hamburger-menu').on('click', function () {
        $('.bar').toggleClass('animate');
        $('.nav-body').toggleClass('show')
    })
});