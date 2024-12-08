# Modular Presentation System

This document outlines the requirements for a modular presentation system. The system should support dynamic slide creation using a JSON-based data structure. Templates will render HTML using a string-interpolated approach encapsulated within composable classes.

---

## Requirements

### 1. General Notes for Developers
- The provided code examples are not mandatory to use. Developers are encouraged to create their own implementations as long as they adhere to the principles and structure outlined in this document.
- All templates should have a dedicated CSS file or class definitions to ensure proper styling. Developers should organize styles for each template clearly and maintain reusability.
- Each template class must be placed in its own file for better modularity and maintainability.

### 2. General Requirements
- Each template should be encapsulated in its own class, inheriting from a base `Template` class.
- The `Template` class must define a `render` method to return an HTML string for the slide.
- The `Presentation` class will manage multiple slides and render them into a specified HTML container.

### 3. Slide Data Requirements
- Data for slides will be passed in a JSON structure.
- Each slide object must include:
  - A `template` property specifying the template type (e.g., `template1`, `template2`).
  - A `data` property containing slide-specific content.

### 4. Template Requirements

#### Template 1:
- Accepts `main-heading` and `sub-heading`.
- Renders an `<h1>` and `<h2>`.

#### Template 2:
- Accepts `h1`, `h2`, `h3`, and `bullets`.
- Renders a heading hierarchy and an unordered list.

#### Template 3:
- Accepts `top-left`, `top-right`, `bottom-left`, and `bottom-right`.
- Each quadrant renders an SVG string in a grid layout.

#### Template 4:
- Accepts `title`, `subtitle`, `date`, and `footer`.
- Renders a title, subtitle, date, and footer in a structured layout.

#### Template 5:
- Accepts `title`, `topics`, and `image`.
- Renders a title, a list of topics, and an image.

#### Template 6:
- Accepts `name`, `title`, `roles`, and `image`.
- Renders a name, title, list of roles with descriptions, and an image.

### 5. Rendering Rules
- Each template class will explicitly map data attributes to HTML elements.
- The `Presentation` class will handle instantiation of templates and inject rendered HTML into a DOM container.
- The `Presentation` class must use a `templateMap` object for mapping template names to their respective classes.

---

## Updated JSON Structure

```json
{
  "slides": [
    {
      "template": "template1",
      "data": {
        "main-heading": "Welcome to Our Presentation",
        "sub-heading": "A Journey into Reveal.js"
      }
    },
    {
      "template": "template2",
      "data": {
        "h1": "Why Choose Us?",
        "h2": "Our Unique Value Proposition",
        "h3": "Key Benefits",
        "bullets": [
          "Innovative Solutions",
          "Customer-Centric Approach",
          "Proven Track Record"
        ]
      }
    },
    {
      "template": "template3",
      "data": {
        "top-left": "<svg xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='40' fill='red'/></svg>",
        "top-right": "<svg xmlns='http://www.w3.org/2000/svg'><polygon points='50,15 90,85 10,85' fill='blue'/></svg>",
        "bottom-left": "<svg xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='80' height='80' fill='green'/></svg>",
        "bottom-right": "<svg xmlns='http://www.w3.org/2000/svg'><polygon points='50,10 90,50 50,90 10,50' fill='yellow'/></svg>"
      }
    },
    {
      "template": "template4",
      "data": {
        "title": "SOCIAL MEDIA",
        "subtitle": "STRATEGY",
        "date": "MARCH 20, 2020",
        "footer": "A Pitch Deck by McDowell Digital Media, Inc."
      }
    },
    {
      "template": "template5",
      "data": {
        "title": "TODAY'S PRESENTATION",
        "topics": [
          "About our company",
          "Social media services",
          "Problem/opportunity",
          "Our solution",
          "Plan execution",
          "Our team"
        ],
        "image": "docs/template-example-appydave/2.jpg"
      }
    },
    {
      "template": "template6",
      "data": {
        "name": "BYRON OLTARIA",
        "title": "CEO OF MCDOWELL DIGITAL MEDIA, INC.",
        "roles": [
          {
            "position": "Social Media Strategist",
            "description": "Presentations are communication tools that can be used as lectures."
          },
          {
            "position": "Marketing Expert",
            "description": "Presentations are communication tools that can be used as lectures."
          }
        ],
        "image": "docs/template-example-appydave/3.jpg"
      }
    }
  ]
}
```

---

## Implementation Rules

### Base Template Class
```javascript
class Template {
  constructor(data) {
    this.data = data;
  }

  render() {
    throw new Error('Render method must be implemented by subclasses');
  }
}
```

### Template Implementation with String Interpolation

#### Template 1:
```javascript
class Template1 extends Template {
  render() {
    return `
      <div class="slide">
        <h1>${this.data['main-heading']}</h1>
        <h2>${this.data['sub-heading']}</h2>
      </div>
    `;
  }
}
```

#### Template 2:
```javascript
class Template2 extends Template {
  render() {
    return `
      <div class="slide">
        <h1>${this.data.h1}</h1>
        <h2>${this.data.h2}</h2>
        <h3>${this.data.h3}</h3>
        <ul>
          ${this.data.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}
```

#### Template 3:
```javascript
class Template3 extends Template {
  render() {
    return `
      <div class="slide grid">
        <div class="top-left">${this.data['top-left']}</div>
        <div class="top-right">${this.data['top-right']}</div>
        <div class="bottom-left">${this.data['bottom-left']}</div>
        <div class="bottom-right">${this.data['bottom-right']}</div>
      </div>
    `;
  }
}
```

#### Template 4:
```javascript
class Template4 extends Template {
  render() {
    return `
      <div class="slide">
        <h1>${this.data.title}</h1>
        <h2>${this.data.subtitle}</h2>
        <p>${this.data.date}</p>
        <footer>${this.data.footer}</footer>
      </div>
    `;
  }
}
```

#### Template 5:
```javascript
class Template5 extends Template {
  render() {
    return `
      <div class="slide">
        <h1>${this.data.title}</h1>
        <ul>
          ${this.data.topics.map(topic => `<li>${topic}</li>`).join('')}
        </ul>
        <img src="${this.data.image}" alt="Presentation Image">
      </div>
    `;
  }
}
```

#### Template 6:
```javascript
class Template6 extends Template {
  render() {
    return `
      <div class="slide">
        <h1>${this.data.name}</h1>
        <h2>${this.data.title}</h2>
        ${this.data.roles.map(role => `
          <div>
            <h3>${role.position}</h3>
            <p>${role.description}</p>
          </div>
        `).join('')}
        <img src="${this.data.image}" alt="Speaker Image">
      </div>
    `;
  }
}
```

### Presentation Class
```javascript
class Presentation {
  constructor(slides) {
    this.slides = slides;
    this.templateMap = {
      'template1': Template1,
      'template2': Template2,
      'template3': Template3,
      'template4': Template4,
      'template5': Template5,
      'template6': Template6,
    };
  }

  renderSlide(slide) {
    const TemplateClass = this.templateMap[slide.template];
    if (!TemplateClass) {
      throw new Error(`Unknown template: ${slide.template}`);
    }
    const templateInstance = new TemplateClass(slide.data);
    return templateInstance.render();
  }

  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with ID "${containerId}" not found`);
    }
    this.slides.forEach(slide => {
      const slideHTML = this.renderSlide(slide);
      container.innerHTML += slideHTML;
    });
  }
}
```

