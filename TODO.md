# TODO

- [ ] Add box shadow to grabbed card
- [ ] Check for nearest object when detecting AABB collisions
- [x] Change tableau size; add more height so cards don't go off the bottom of the screen in desktop
- [x] Update card waterfall horizontal velocity on desktop; make it more like mobile
- [x] Get card overlap offsets and delayed animation working
- [x] Animate highlight when card is placed in foundation
- [x] Method to add a child card to a cascade, which animates moving the card to its correct position, and sets the z-index on all the child cards such that they overlap correctly.
- [x] Set z-index on grabbed cards (including children) to be a high value, so they are displayed on top of other cards
- [x] Copy resizing code
- [x] Add transparent canvas background which is resized same as tableau
  * canvas is there, need to size it properly
- [x] Don't grab until the card is actually moved?
- [x] Ensure lower z-index is set on cards placed in cells/foundations, such that dragged cards don't go "under"
- [x] Ensure that when grabbed cards have an invalid move, and are moved back to their parent, their z-indices are reset back _down_ as well
- [x] BUG: when double-clicking Ace from a cascade, it is played to a foundation, but not removed from the cascade; `cascade.lastCard` still points to it
- [x] double-click to play is jankity -- doesn't always work because you have to keep the mouse perfectly still
- [x] coming back after a while (after screensaver activates?) spreads placed cards in foundations/cells...
  * This might be a macOS-specific thing; multiple resize events are happening in the logs
  * ~~however, if I resize manually, the cards placed in foundations don't spread...~~ that's a lie, it totally does
- [x] change double-click to require clicks to be close to each other -- otherwise you get some weird double-clicks where they are actually farther apart and it seems unintentional
- [x] Get touch input
- [x] card waterfall
- [x] Add undo stack
- [x] Verify "size" objects & collision detection (!!!)
  -> this seems to be causing a bug where double-clicking a card drops it on a foundation, but the card doesn't move
  -> probably should add some tests for this
  -> **breakthru** I think this is actually happening only on first move, before the `grabbed` object updates its position. If a card is clicked but not moved enough, `grabbed` stays at (0, 0), which would naturally overlap the first foundation (if the window is narrow enough). The `grabbed.drop` behavior changes based on whether the `moved` flag is set or not. I think the solution might be to update the `grabbed` object's position?
- [x] Scrollbars appear on the page; figure out what is causing them
- [x] Make cards taller, for better play on mobile; also need larger numbers/suits
- [x] double-clicked cards moving to foundations still go "under" other cards; their z-indices aren't set high enough
- [x] fix undo to handle reverting multiple cards
- [x] rework the background graphics for cells/foundations
- [x] Add status bar with timer/allowed cards you can grab
- [x] Add menu bar
- [x] fix card waterfall on hidpi screens
- [x] make double-click "distance" more generous
- [x] add method to card to manually set to face up or face down
  * "reset" method should make everything face down
- [x] fix menu bar on mobile -- for some reason the event handlers don't work
- [x] Cards are still animating _under_ when double-click
- [x] Ensure that "movable cards" counter updates properly
- [x] Add delayed animation to moving `grabbed` object so cards swirl around as they are moved
  * this is problematic using delays, because each time the player moves the cursor, the delay is reset -- therefore the child cards don't actually move until the cursor _stops_
- [x] BUG: if clicking the canvas immediately after waterfall is fired and before a double-clicked card is animated, a TypeError gets generated because `resetZIndex` is called on the card after a 250ms delay, but `reset()` has already been called by the game, which removes all parent references. Solution: delay game win check by 250ms
- [x] Ensure status/menu bars look good on portrait/landscape desktop/mobile
  * can use orientation media queries for different height values
- [x] Add metadata/icon
- [x] service worker for offline access
  * ensure all relevant files are listed for cache
- [x] Add padding to status bar to prevent curved screen corners from cutting off content
- [x] Add "about" page with games played/won stats
- [x] Make collision detection slightly less aggressive and/or determine which target overlaps the most (lots of work)
- [x] Use `filter: invert(1);` when tapping on too many cards; ones you can't pick up are inverted? https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert
- [x] save stats on game over
- [x] ensure stats are reloaded when "about" dialog is displayed
- [x] change og image to just be the icon
