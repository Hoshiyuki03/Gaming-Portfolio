Do not modify any design, layout, typography, colors, spacing, animations, sections, content, images, videos, responsiveness, or existing functionality.

Only update the "Start a Conversation" / "Let's Talk" button behavior.

Requirements:

- Remove the current mailto implementation.
- When the button is clicked, open Gmail Compose directly in the browser.
- Pre-fill the recipient email address with: dheerajkumar862973@gmail.com
- Pre-fill the subject with: Portfolio Inquiry
- Open in a new browser tab.
- Keep the exact same button styling.
- Keep the exact same hover effects.
- Keep the exact same animations.
- Keep the exact same text.
- Keep the exact same icon.

Use this Gmail compose URL:

https://mail.google.com/mail/?view=cm&fs=1&to=dheerajkumar862973@gmail.com&su=Portfolio%20Inquiry

Example implementation:

<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=dheerajkumar862973@gmail.com&su=Portfolio%20Inquiry"
  target="_blank"
  rel="noopener noreferrer"
>
  Start a Conversation
</a>

Nothing else in the website should be changed.