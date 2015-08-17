if ( ! window.myapp ) {
    window.myapp = {};
}

(function ( $ ) {
    var $drumSelect = null;

    window.myapp.DrumSelect = (function() {
        var TOP_ITEM_ID = "aaareset";
        var TOP_CLONE_ID = "aaa";
        var BOTTOM_ITEM_ID = "zzzreset";
        var BOTTOM_CLONE_ID = "zzz";
        var itemCount = 0;
        var itemHeight = 0;
        var visibleItems = 0;
        var midPoint = 0;
        var timerID = null;
        var oldScrollTop = -1;
		var scrollInProgress = false;
		var $selTop;

        var $curItem = null;

        function _prepareList( objOrSelector, itemsToShow ) {
            var $obj = ( typeof objOrSelector === "string" )? $( objOrSelector ) : objOrSelector;
            if ( ! itemsToShow ) {
                var itemData = $obj.data( "size" );
                itemsToShow = itemData? parseInt( itemData, 10 ) : 7;
            }

            $obj.wrap( '<div class="drum"><div class="drum-scroller"></div></div>' );

            var $items = $obj.find( "li" );
            var $firstItem = $items.slice( 0, 1 );
            var $lastItem = $items.slice( $items.length - 1 );
            itemHeight = $firstItem.outerHeight();
            itemCount = $items.length;
            visibleItems = itemsToShow;
            midPoint = Math.round( itemsToShow / 2 );

			var frag = document.createDocumentFragment();
            $items.each( function() {
                frag.appendChild( this.cloneNode( true ) );
            } );
            $obj.append( frag );

			$firstItem.addClass( TOP_ITEM_ID );        
            $lastItem.addClass( BOTTOM_ITEM_ID );

            $obj.find( "li:first" ).removeClass( TOP_ITEM_ID ).addClass( TOP_CLONE_ID );
            $obj.find( "li:last" ).removeClass( BOTTOM_ITEM_ID ).addClass( BOTTOM_CLONE_ID );

            var $parent = $obj.parent();
            var cssAttrs = { "height": itemHeight * itemsToShow };
            var $grandParent = $parent.parent();
            $grandParent.prepend( '<a class="topbtn scrollbutton" data-dir="1" href="#"><div class="uparrow"></div></a>' )
                        .prepend( '<a class="bottombtn scrollbutton" data-dir="-1" href="#"><div class="downarrow"></div></a>' )
						.append( '<div class="sel-top"></div>' )
						.append( '<div class="sel-btm"></div>' )
                        .css( cssAttrs );
			$selTop = $grandParent.find( "div.sel-top" );

            return $parent;
        }

        function _init( objOrSelector ) {
            var $drum = ( typeof objOrSelector === "string" )? $( objOrSelector ) : objOrSelector;
            var drumTop = $drum.offset().top;
            var drumBtm = $drum.get( 0 ).offsetHeight;
            var wasReset = true;
            var oneShot = false;

            var $aaaReset = $drum.find( "." + TOP_ITEM_ID );
            
            var $aaa = $drum.find( "li." + TOP_CLONE_ID );
            var $zzz = $drum.find( "li." + BOTTOM_CLONE_ID );
            var $topItem = $drum.find( "." + BOTTOM_ITEM_ID );
            var $bottomItem = $drum.find( "." + BOTTOM_ITEM_ID );

            wasReset = true;
            $drum.scrollTop( $aaaReset.position().top - drumTop );
            wasReset = false;

            $drum.scroll( function(evt) {
                if ( ! evt.target.className.match( /drum-scroller/ ) ) {
                    return;
                }
                var $target = $( evt.target );
                if ( wasReset ) {
// console.log( "wasReset..." );
                    return;
                }
                if ( oneShot ) {
// console.log( "oneShot..." );
                    oneShot = false;
                    return;
                }
                clearTimeout( timerID );
// console.log( "*" );

//                if ( $curItem ) {
//                    $curItem.removeClass( "selected" );
//                }

				if ( ! scrollInProgress ) {
					$(document).trigger( "scroll-begin" );
					scrollInProgress = true;
				}
                var aaaBottom = $aaa.position().top + itemHeight;

                if ( aaaBottom > 0 ) {    // has first item peeked into the window?
                    doScrollSwap( $aaa, $topItem );
                } else {
                    var zzzTop = $zzz.position().top;
                    if ( zzzTop < drumBtm ) {
                        doScrollSwap( $zzz, $bottomItem );
                    }
                }

                timerID = setTimeout( _clickStop, 200 );
            } );

            $(document).keyup( function( evt ) {
                switch( evt.keyCode ) {
                case 40: doAdvance( -1, 150 );
                    break;
                case 38: doAdvance( 1, 150 );
                    break;
                case 39: doAdvance( -visibleItems, 250 );
                    break;
                case 37: doAdvance( visibleItems, 250 );
                    break;
                }
            } );
            $drum.parent().find( "a.scrollbutton" ).click( advance );
			$drum.click( _handleBodyClick );

            function doScrollSwap( $item, $placeHolder ) {
                var itemTop = $item.position().top;
                var placeHolderTop = $placeHolder.position().top;
                wasReset = true;
                var newScroll = $drum.scrollTop() + (placeHolderTop - itemTop);
                $drum.scrollTop( newScroll );
                wasReset = false;
// console.log( "Swapping item %s at %d to %s at %d --> scrolling to %d", $item.html(), itemTop, $placeHolder.html(), placeHolderTop, newScroll );
            }

            function advance( evt ) {
                var $target = $( evt.target );
                if ( $target.is( "a.scrollbutton div" ) ) {
                    $target = $target.parent();
                } else if ( ! $target.is( "a.scrollbutton" ) ) {
                    return;
                }
                evt.preventDefault();
                
                doAdvance( $target.data( "dir" ), 150 );
            }

			function _handleBodyClick( evt ) {
				_selectItem( $( evt.target ));
			}

			function _selectItem( $target ) {
				var targOffset = $target.offset();
				var selTopOffset = $selTop.offset();

				var delta = ( selTopOffset.top - targOffset.top ) + 7;
                $drum.animate( {"scrollTop": $drum.scrollTop() - delta}, 250, _endScrollAnimation );
			}

            function doAdvance( dir, speed ) {
                var newTop = $drum.scrollTop() + ( dir * itemHeight );
//                oneShot = true;
                $drum.animate( {"scrollTop": newTop}, speed, _endScrollAnimation );
            }

            function _clickStop() {
                var newTop = $drum.scrollTop();
                if ( newTop != oldScrollTop ) {
                    var topPos = Math.round( newTop / itemHeight );
					var selPos = topPos + midPoint;
// console.log( "Time to fix the selector: top was %d, (%d) --> %d", newTop, topPos, topPos * itemHeight );
                    wasReset = true;
                    oneShot = true;
					_selectItem( $drum.find( "li:nth-child(" + selPos + ")" ) );
                    // newTop = topPos * itemHeight;
                    // $drum.animate( {"scrollTop": newTop}, 150, _endScrollAnimation );
                }
            }

            function _endScrollAnimation() {
                oldScrollTop = $drum.scrollTop();
                var topPos = Math.round( oldScrollTop / itemHeight );

                var curSel = topPos + midPoint;
                $curItem = $drum.find( "li:nth-child(" + curSel + ")" );
//                $curItem.addClass( "selected" );

                $(document).trigger( "scroll-select", [ $curItem ] );
				scrollInProgress = false;
                wasReset = false;
            }
        }

        return {
            init: _init,
            ready: _prepareList
        };
    })();
    
    $( window ).load( function() {
        window.myapp.DrumSelect.init( $drumSelect );
        $(document).bind( "scroll-begin", function( evt ) {
            console.log( "Beginning to scroll..." );
        } );
        $(document).bind( "scroll-select", function( evt, $item ) {
            console.log( $item.find( "a" ).html() );
        } );
    } );

    $( window ).ready( function() {
        $drumSelect = window.myapp.DrumSelect.ready( "ul.drum-select" );
    } );

})( jQuery );