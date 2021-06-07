
var isMobile = (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2));

window.addEventListener("orientationchange", function() {
	if (isMobile) {

		var screenW = $( window ).width();

		if( screenW >= 980 ){ 
			$('.mainmenu ul ul .expandable').after('<div class="dropdown-arrow"></div>');
		} else{
			$('.expandable').after('<div class="dropdown-arrow dropdown-arrow-open"></div>');
		}

	}
});

$(window).on('load', function(){

	function getQueryStringValue (key) {
		return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
	}

    function scrollToForm()
    {
        var m = getQueryStringValue("receipt");
        var id = "form-" + m;
        if (m != "")
        	{
				setTimeout(function() {
	                $('html, body').stop().animate({
	                    scrollTop: $(document.getElementById(id)).offset().top -200
	                    }, 0);	
	            }, 0);
        	}
            
    }

	if(document.location.search.length) {
		scrollToForm();
	}

    var screenW = $( window ).width();

    /* Add arrow to expandable menu-options */ 
    if( screenW >= 980 ){ 
        $('.mainmenu ul ul .expandable').after('<div class="dropdown-arrow"></div>');
    } else{
        $('.expandable').after('<div class="dropdown-arrow dropdown-arrow-open"></div>');
    }

	if (isMobile) {
		$('body').addClass("isMobile");
	}

    /* Add class to expandable li */
    var expandable = $('.mainmenu .expandable');
    $(expandable).parent('li').addClass('expandable-li');

    /* Open menu in mobile */
    $('.openmenu').click( function() {
        openMenu();
        $('.closemenu').css('display', 'block');
    });

    /* Close menu */
    $('.closemenu').click( function() {        
        var trigger = $(this);
        closeMenu(trigger);
        closeSubMenu();
    }); 

    /* Close menu when click on .overlay */
    $(document).click(function(event) {
        var text = event.target.id;
        if(text == 'overlay'){
            var trigger = $(this);
            closeMenu(trigger);
            closeSubMenu();
        }
    });

     /* Add class to expandable ul */
    var expandable = $('.expandable');
    $(expandable).parent('li').addClass('level-closed');

    /* Open dropdown menu when click on .dropdown-arrow */
    $('.dropdown-arrow').click(function(event) {
        var siblingUl = $(this).siblings( 'ul' );
        var parentLi = $(this).parent( 'li' );
        if (parentLi.hasClass('level-closed')) {
            // It's Closed
            parentLi.removeClass('level-closed');
            parentLi.addClass('level-open');
            siblingUl.slideDown();
            $(this).addClass('dropdown-arrow-close');
            $(this).removeClass('dropdown-arrow-open');
        } else {
            // It's open
            parentLi.removeClass('level-open');
            parentLi.addClass('level-closed');
            siblingUl.hide();
            $(this).addClass('dropdown-arrow-open');
            $(this).removeClass('dropdown-arrow-close');
        }
    });

});

/* Open MenuContainer */
function openMenu(){
    $('nav.mainmenu').show('slide', { direction: 'left' });
    var overlay = jQuery('<div id="overlay"> </div>');
    overlay.appendTo(document.body);
    $('.openmenu').css('display','none');
}

/* Close MenuContiner */
function closeMenu(trigger){
    $('nav.mainmenu').hide('slide', { direction: 'left' }, function() {
		$(this).removeAttr('style');
	});
    $('#overlay').remove();
    $('.openmenu').css('display','block');
}

/* Close submenu */
function closeSubMenu(){
    if($( '.level-open' ).length){
        var expandableUl = $('.expandable').siblings( 'ul' );
        //var li = $(this);
        var li = $('.expandable-li');
        console.log(li);
        $(li).removeClass('level-open');
        $(li).addClass('level-closed');
        $(expandableUl).css('display', 'none');
    }
    var arrow = $('div.dropdown-arrow');

    if($(arrow).hasClass('dropdown-arrow-close')){
        $(arrow).removeClass('dropdown-arrow-close');
        $(arrow).addClass('dropdown-arrow-open');
    }
}
