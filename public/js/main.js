$(function () {

    // 事件及常量 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var timer = null;
    var C = document.getElementById('msgBox');
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
        moveChoice: function (sT, WH) {
            var mT = -80 + (sT + WH - $(C).offset().top) * 0.17;
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
        var sT = $(this).scrollTop();
        var WH = $(this).height();
        if (( $(C).offset().top - $(this).scrollTop() ) > $(this).height()) return;
        actions.moveChoice(sT, WH)
    }, false);
    actions.generateSolutionPosition();


    $('.hamburger-menu').on('click', function () {
        $('.bar').toggleClass('animate');
        $('.nav-body').toggleClass('show')
    })
});