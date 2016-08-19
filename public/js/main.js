$(function () {
    var page = $('#PG').data('pg');
    var C = document.getElementById('msgBox');
    var CW = document.documentElement.clientWidth;
    var Act = {
        moveChoice: function (sT, WH) {
            var mT = '';
            if (CW < 830) {
                mT = -1.33333 + ((sT + WH - $(C).offset().top) * 20 / 750) * 0.8;
                $(window.M).css('top', mT + 'rem')
            } else {
                mT = -80 + (sT + WH - $(C).offset().top) * 0.17;
                $(window.M).css('top', mT + 'px')
            }
        },
    };

    window.addEventListener('scroll', function () {
        var sT = $(this).scrollTop();
        var WH = $(this).height();
        if (( $(C).offset().top - $(this).scrollTop() ) > $(this).height()) return;
        Act.moveChoice(sT, WH)
    }, false);

    if (page = 'index') {
        // 事件及常量 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        var T = null;

        var SL = $('#solutionList');
        var SLW = SL.width();

        var ml = 0;
        var ml2 = 0;
        var A = {
            generateSolutionPosition: function () {
                var clientWidth = document.documentElement.clientWidth;
                if ((clientWidth < 1776 && clientWidth >= 1200)) {
                    ml = (1776 - clientWidth) / 2;
                    SL
                        .css('marginLeft', '-' + ml + 'px')
                } else if (clientWidth < 1200 && clientWidth >= 830) {
                    ml = '304px';
                    SL
                        .css('marginLeft', '-304px')
                } else if (clientWidth < 830) {
                    ml2 = ( 20 * (SLW / document.documentElement.clientWidth) - 20) / 2;
                    SL
                        .css('marginLeft', '-' + ml2 + 'rem')

                    var DH = $(window).height() - document.querySelector('.nav-box').offsetHeight + 'px';

                    $('#nav').css('height', DH)
                }
            },

            mobNavHeight: function () {

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


        A.generateSolutionPosition();

        $('.hamburger-menu').on('click', function () {
            $('.bar').toggleClass('animate');
            $(this).toggleClass('bg');
            $('.nav-body').toggleClass('show');
            $('body').toggleClass('no-flow');
        });

        $('.nav-body').on('click', function (e) {
            e = e || window.event;
            if (e.target == e.currentTarget && CW < 831) {
                $('.hamburger-menu').trigger('click')
            }
        });

        SL.on('click', '.solution-item', function () {
            var _this = $(this);
            var ACT = SL.find('.active');
            var AI = ACT.index();
            var I = _this.index();

            if (AI == I) return;
            ACT.removeClass('active');
            _this.addClass('active');

            var X = I - AI;
            var nml, baz, rst, unit;

            if (CW > 830) {
                nml = +window.getComputedStyle(SL.get(0)).marginLeft.slice(0, -2);
                baz = Math.abs(X) * 244;
                rst = X > 0 ? nml - baz : nml + baz;
                unit = 'px';
            } else {
                nml = (+window.getComputedStyle(SL.get(0)).marginLeft.slice(0, -3)) * 20 / 412;
                baz = Math.abs(X) * 10.56;
                rst = X > 0 ? nml - baz : nml + baz;
                unit = 'rem';
            }

            SL.velocity({'marginLeft': rst + unit}, {
                duration: 400,
                complete: function () {
                    var bazz = 0;
                    if (CW >= 1200 && CW < 1776) {
                        bazz = ml
                    } else if (CW < 1200 && CW > 830) {
                        bazz = 304
                    } else if (CW <= 830){
                        bazz = ml2
                    } else {
                        bazz = 0
                    }
                    SL.css('marginLeft', '-' + bazz + unit);
                    if (X > 0) {
                        $('.solution-item:lt(' + X + ')').insertAfter('.solution-item:last');
                    } else {
                        $('.solution-item:gt(' + (6 + X) + ')').insertBefore('.solution-item:first');
                    }
                }
            })

        })
    }

    if (page = 'news') {
        $('#page').pagination({
            items: 5,
            itemsOnPage: 5,
            cssStyle: 'light-theme'
        });
    }

});