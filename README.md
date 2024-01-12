# FreeCell (DOM version)

After creating `<canvas>`-based versions of Klondike and FreeCell, I decided that they didn't provide enough
player feedback. Double-clicking a card to play on a foundation immediately displayed the card at the target location,
with no animation indicating the action. Similarly when turning cards from a talon -> waste pile. The lack of animation wasn't quite so bad when dropping cards, since the cards were usually so close to the target location, it was more obvious when they "snapped" into place. However, more animation directing the player's attention is always nice. Since I didn't use a pre-existing game framework for the `<canvas>`-rendering, I would have had to write an animation engine, which I am too lazy to do. I also have a strong case of "NIH" when working on personal projects, so decided to try the challenge of rewriting the card game engine using the DOM, such that I could use 3D transforms and transitions (for "free").

## TODO

- [x] Get card overlap offsets and delayed animation working
- [ ] Animate highlight when card is placed in foundation
- [x] Method to add a child card to a cascade, which animates moving the card to its correct position, and sets the z-index on all the child cards such that they overlap correctly.
- [x] Set z-index on grabbed cards (including children) to be a high value, so they are displayed on top of other cards
- [ ] Use `filter: invert(1);` on grabbed cards? Not sure this is a necessary affordance, as the original Windows version used this to show which cards you had selected; in this version, you move them with click/tap
- [ ] Add status bar with timer/allowed cards you can grab
- [ ] Add menu bar
- [x] Copy resizing code
- [ ] Add transparent canvas background which is resized same as tableau
- [x] Don't grab until the card is actually moved?
- [x] Ensure lower z-index is set on cards placed in cells/foundations, such that dragged cards don't go "under"
- [x] Ensure that when grabbed cards have an invalid move, and are moved back to their parent, their z-indices are reset back _down_ as well
- [x] BUG: when double-clicking Ace from a cascade, it is played to a foundation, but not removed from the cascade; `cascade.lastCard` still points to it
- [ ] Verify "size" objects & collision detection (!!!)
- [ ] Add delayed animation to moving `grabbed` object so cards swirl around as they are moved
- [x] double-click to play is jankity -- doesn't always work because you have to keep the mouse perfectly still
- [x] coming back after a while (after screensaver activates?) spreads placed cards in foundations/cells...
  * This might be a macOS-specific thing; multiple resize events are happening in the logs
  * ~~however, if I resize manually, the cards placed in foundations don't spread...~~ that's a lie, it totally does
- [ ] change double-click to require clicks to be close to each other -- otherwise you get some weird double-clicks where they are actually farther apart and it seems unintentional

  game is now winnable!