$(function () {

    // 事件及常量 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var actions = {
        generateSolutionPosition: function () {
            var clientWidth = document.documentElement.clientWidth;
            if (clientWidth < 1808) {
                var ml = (1808 - clientWidth) / 2;
                $('#solutionList')
                    .css('marginLeft', '-' + ml + 'px')
                    .addClass('small');
            }
        }
    };
    // 事件初始化及绑定 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    AOS.init();

    $("#owl").owlCarousel({
        slideSpeed: 300,
        singleItem: true
    });

    actions.generateSolutionPosition();

});