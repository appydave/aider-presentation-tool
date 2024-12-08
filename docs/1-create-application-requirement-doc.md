### Requirement Document for Reveal.js Slide Presentation

#### 1. General Slide Layout Requirements
- **Consistent Layout**: Each slide should maintain a consistent structure, either:
  - **Single Layout**: SVG with one or more headings.
  - **Multiple Layouts**: If needed, define different layouts (e.g., SVG on the left, heading on the right).
- **Positioning Elements**:
  - Headings should be at the top of each slide.
  - SVG should be centered below the headings to maintain a clear visual flow.
  - Consistent spacing and margin should be used to ensure no overlapping and proper alignment.

#### 2. Brand Guidelines
- **Color Scheme**:
  - **Background Color**: `#342d2d`.
  - **Foreground Text Color**: `#ccba9d`.
  - **Highlight Text Color**: `#ffde59`.
- **Font and Typography**:
  - Use `bebas-neue` from Google Fonts for all headings.
  - Ensure font sizes are consistent for headings and subheadings to maintain readability.
  - Apply padding/margins that are consistent across all slides to enhance aesthetics.

#### 3. SVG Visual Management
- **File Storage and Organization**:
  - Store all SVG files in a dedicated folder within the project structure, such as `/assets/svgs/`.
  - Use descriptive file names (e.g., `company_logo.svg`, `process_flow.svg`) to make file identification easy.
- **Embedding SVGs**:
  - Decide whether to embed SVGs directly in the HTML or use `<img>` tags for referencing.
  - Embedding allows more flexibility with styling and interaction, whereas linking makes the HTML cleaner.

#### 4. Navigation and Configuration Settings
- **Slide Transitions**:
  - Set slide type transition to `fade` for a smooth visual effect.
- **Navigation Options**:
  - Enable navigation arrows and keyboard controls for ease of navigation.
  - Include a progress bar at the bottom of the presentation to indicate current slide position.

#### Configuration Summary
- **Slide Type**: `fade`
- **Brand Colors**:
  - **Background**: `#342d2d`
  - **Foreground Text**: `#ccba9d`
  - **Highlight Text**: `#ffde59`
- **Font**: `bebas-neue` (Google Font)

#### Slide Structure in JSON Format
Define the structure of the presentation using a simple JSON format with the following attributes for each slide:

```json
[
  {
    "image": "name of image",  // Optional: Name of the image file
    "svg": "embedded",         // Optional: SVG embedded as a string, overrides the image name if provided
    "layout": "default",       // Slide layout type, can add more layouts later
    "h1": "Main Heading",      // Main heading for the slide
    "h2": "Subheading",        // Subheading for the slide
    "bullets": [                // List of bullet points for the slide
      "First bullet point",
      "Second bullet point",
      "Third bullet point"
    ]
  }
]
```
- **Attributes**:
  - **`image`**: Name of the image (optional).
  - **`svg`**: Embedded SVG as a string (optional, overrides the `image` attribute).
  - **`layout`**: Default is `default`. Additional layouts can be added later.
  - **`h1`**: Main heading of the slide.
  - **`h2`**: Subheading of the slide.
  - **`bullets`**: Array of bullet points.

#### Notes for Implementation
- The programmer should use Reveal.js configurations to ensure the brand guidelines are followed strictly for consistent theming.
- Prioritize responsiveness and content adaptability across devices.
- Test for common user navigation paths to ensure the presentation is intuitive and visually engaging.
