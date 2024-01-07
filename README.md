# FreeCell (DOM version)

After creating `<canvas>`-based versions of Klondike and FreeCell, I decided that they didn't provide enough
player feedback. Double-clicking a card to play on a foundation immediately displayed the card at the target location,
with no animation indicating the action. Similarly when turning cards from a talon -> waste pile. The lack of animation wasn't quite so bad when dropping cards, since the cards were usually so close to the target location, it was more obvious when they "snapped" into place. However, more animation directing the player's attention is always nice. Since I didn't use a pre-existing game framework for the `<canvas>`-rendering, I would have had to write an animation engine, which I am too lazy to do. I also have a strong case of "NIH" when working on personal projects, so decided to try the challenge of rewriting the card game engine using the DOM, such that I could use 3D transforms and transitions (for "free").

## TODO

- [ ] Method to add a child card to a cascade, which animates moving the card to its correct position, and sets the z-index on all the child cards such that they overlap correctly.
- [x] Set z-index on grabbed cards (including children) to be a high value, so they are displayed on top of other cards
- [ ] Use `filter: invert(1);` on grabbed cards? Not sure this is a necessary affordance, as the original Windows version used this to show which cards you had selected; in this version, you move them with click/tap
- [ ] Add status bar with timer/allowed cards you can grab
- [ ] Add menu bar
- [ ] Copy resizing code
- [ ] Add transparent canvas background which is resized same as tableau
- [ ] Don't grab until the card is actually moved?
- [ ] BUG: sometimes when dropping grabbed cards, the children don't finish animating to place; the transform is correctly set, but the x,y values are wrong; perhaps a race condition
