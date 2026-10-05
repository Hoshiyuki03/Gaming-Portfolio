IMPORTANT:

Do NOT redesign the portfolio.
Do NOT change any text.
Do NOT change any content.
Do NOT change any colors.
Do NOT change typography.
Do NOT change spacing.
Do NOT change layout.
Do NOT change navigation.
Do NOT change responsiveness.
Do NOT change project cards.
Do NOT change sections.
Do NOT change background effects.
Do NOT change any existing functionality.

The portfolio is already complete.

ONLY improve the character animation system.

--------------------------------------------------
CURRENT STATE
--------------------------------------------------

The website currently swaps between static images:

Working.png
Left.png
Right.png
Greeting.png

This creates a slideshow effect.

The character does not feel alive.

--------------------------------------------------
NEW REQUIREMENT
--------------------------------------------------

Replace image swapping with video-based animation.

Available files:

Working video.mp4
Greeting video.mp4

Existing images should remain as fallbacks only.

--------------------------------------------------
WORKING STATE
--------------------------------------------------

By default:

Use "Working video.mp4"

Requirements:

- autoplay
- muted
- playsInline
- loop enabled
- no controls
- seamless looping

The video should occupy the exact same position,
size,
alignment,
crop,
framing,
and visual area currently used by Working.png.

No layout shift is allowed.

--------------------------------------------------
GREETING STATE
--------------------------------------------------

When user clicks:

"LET'S TALK"

OR

When user enters the Contact section

Then:

Pause Working video.

Play Greeting video once.

Requirements:

- play once
- no loop
- autoplay
- muted
- playsInline

After Greeting video ends:

Automatically return to Working video.

Working video should continue looping.

--------------------------------------------------
TRANSITION RULES
--------------------------------------------------

No fades.

No zooms.

No scaling.

No motion blur.

No position changes.

No camera movement.

Simply switch videos cleanly.

Maintain exact framing.

--------------------------------------------------
ASSET POSITIONING
--------------------------------------------------

Character placement must remain identical.

Do NOT move:

- desk
- laptop
- chair
- monitor
- background
- character

Everything must stay in the exact location it currently occupies.

--------------------------------------------------
PERFORMANCE
--------------------------------------------------

Lazy load videos.

Optimize for smooth playback.

Avoid layout shifts.

Keep existing performance optimizations.

--------------------------------------------------
FALLBACK
--------------------------------------------------

If video fails to load:

Use Working.png

For Greeting fallback:

Use Greeting.png

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

The portfolio should look exactly the same as it does now.

The ONLY difference should be:

Instead of static image swapping,
the character uses:

- Working video while idle
- Greeting video when user interacts

Everything else must remain untouched.