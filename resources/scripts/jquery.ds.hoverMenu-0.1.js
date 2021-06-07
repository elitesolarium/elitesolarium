(function ($) {
    $.fn.hoverMenu = function (options) {

        var settings = $.extend({
            openDelay: 300,         // Before show delay
            closeDelay: 300,        // Hide element effect delay
            menuDelay: 1000,        // Menu element hiding delay
            activeClass: "active"   // CSS class for active menu a-element
        }, options || []);
        var menu = this;
        var delay = null;

        function enterElem() {
            var elem = $(this);
            if (elem.data("navTimers")) {
                window.clearTimeout(elem.data("navTimers"));
                elem.data("navTimers", null);
            }

            delay = window.setTimeout(function () {
                elem.children("ul").show().end().
                    siblings().find("ul:not(:has(li.active))").hide(settings.closeDelay);
            }, settings.openDelay);
        }

        function exitElem() {
            var elem = $(this);
            if (delay) {
                window.clearTimeout(delay);
                delay = null;
            }
            elem.data("navTimers", window.setTimeout(function () {
                elem.children("ul:not(:has(li.active))").hide(settings.closeDelay);
                elem.data("navTimers", null);
            }, settings.menuDelay));
        }

        function openPath(elem) {
            if (elem.length == 0)
                return;

            var parent = elem.parent();
            if (parent[0] === menu[0])
                return;
            if (parent.is("ul"))
                parent.show();
            openPath(parent);
        }

        menu.find("li").hover(enterElem, exitElem);
        menu.find("a").click(function () {
            menu.find("a").removeClass(settings.activeClass);
            $(this).addClass(settings.activeClass);
            menu.find("ul:not(:has(li.active))").hide(settings.closeDelay);
        });
        openPath(menu.find("li.active:first"));

        return menu;
    }
})(jQuery);
