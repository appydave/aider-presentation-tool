class PresentationBuilder {
    constructor(container) {
        this.container = container;
    }

    createSlide(slideData) {
        const section = document.createElement('section');
        const content = document.createElement('div');
        content.className = 'slide-content';

        // Add headings
        if (slideData.h1) {
            const h1 = document.createElement('h1');
            h1.textContent = slideData.h1;
            content.appendChild(h1);
        }

        if (slideData.h2) {
            const h2 = document.createElement('h2');
            h2.textContent = slideData.h2;
            content.appendChild(h2);
        }

        // Add SVG content
        if (slideData.svg || slideData.image) {
            const svgContainer = document.createElement('div');
            svgContainer.className = 'svg-container';
            
            if (slideData.svg) {
                svgContainer.innerHTML = slideData.svg;
            } else if (slideData.image) {
                const img = document.createElement('img');
                img.src = `assets/svgs/${slideData.image}`;
                svgContainer.appendChild(img);
            }
            
            content.appendChild(svgContainer);
        }

        // Add bullet points
        if (slideData.bullets && slideData.bullets.length > 0) {
            const ul = document.createElement('ul');
            slideData.bullets.forEach(bullet => {
                const li = document.createElement('li');
                li.textContent = bullet;
                ul.appendChild(li);
            });
            content.appendChild(ul);
        }

        section.appendChild(content);
        return section;
    }

    async loadPresentation() {
        try {
            const response = await fetch('data/slides.json');
            const slides = await response.json();
            
            slides.forEach(slideData => {
                const slide = this.createSlide(slideData);
                this.container.appendChild(slide);
            });

            // Initialize Reveal.js
            Reveal.initialize(revealConfig);
        } catch (error) {
            console.error('Error loading presentation:', error);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('presentation-container');
    const presentation = new PresentationBuilder(container);
    presentation.loadPresentation();
});
