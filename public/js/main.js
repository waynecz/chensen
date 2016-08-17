$(function () {

    // 事件及常量 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var T = null;
    var C = document.getElementById('msgBox');
    var SL = $('#solutionList');
    var SLW = SL.width();
    var A = {
        generateSolutionPosition: function () {
            var clientWidth = document.documentElement.clientWidth;
            if ((clientWidth < 1776 && clientWidth >= 1200)) {
                var ml = (1776 - clientWidth) / 2;
                SL
                    .css('marginLeft', '-' + ml + 'px')
            } else if (clientWidth < 1200 && clientWidth >= 830) {
                SL
                    .css('marginLeft', '-304px')
                    .addClass('middle');
            } else if (clientWidth < 830) {
                var ml2 = ( 20 * (SLW / document.documentElement.clientWidth) - 20) / 2;
                SL
                    .css('marginLeft', '-' + ml2 + 'rem')
                    .addClass('small');
            }
        },
        moveChoice: function (sT, WH) {
            var mT = -80 + (sT + WH - $(C).offset().top) * 0.17;
            $(window.M).css('top', mT + 'px')
        },
        slideItem: function () {

        }
    };
    // 事件初始化及绑定 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    AOS.init();

    $("#owl").owlCarousel({
        slideSpeed: 300,
        singleItem: true
    });

    window.addEventListener("resize", function () {
        clearTimeout(T);
        T = setTimeout(A.generateSolutionPosition, 300)
    }, false);

    window.addEventListener('scroll', function () {
        var sT = $(this).scrollTop();
        var WH = $(this).height();
        if (( $(C).offset().top - $(this).scrollTop() ) > $(this).height()) return;
        A.moveChoice(sT, WH)
    }, false);
    A.generateSolutionPosition();


    $('.hamburger-menu').on('click', function () {
        $('.bar').toggleClass('animate');
        $(this).toggleClass('bg')
        $('.nav-body').toggleClass('show')
    })


    SL
        .on('click', '.solution-item', function () {
            var _this = $(this);
            var ACT = SL.find('.active');
            var AI = ACT.index();
            var I = _this.index();

            if (AI == I) return;
            ACT.removeClass('active');
            _this.addClass('active');

            var X = I - AI;
            var nml = +(/matrix\(1, 0, 0, 1, (-?\d+), 0\)/.exec(window.getComputedStyle(SL.get(0)).transform)[1]);
            var baz = Math.abs(X) * 244;
            var rst = X > 0 ? nml - baz : nml + baz;


            SL.css('transform','translateX('+rst + 'px)');

        })

});