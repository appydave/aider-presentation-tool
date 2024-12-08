// Base Template class
class Template {
    constructor(data) {
        this.data = data;
    }

    render() {
        throw new Error('Render method must be implemented by subclasses');
    }
}

// Can you make sure that the template HTML includes a template-{number} class on each section AI!

// Template implementations
class Template1 extends Template {
    render() {
        return `
            <section>
                <div class="slide">
                    <h1>${this.data['main-heading']}</h1>
                    <h2>${this.data['sub-heading']}</h2>
                </div>
            </section>
        `;
    }
}

class Template2 extends Template {
    render() {
        return `
            <section>
                <div class="slide">
                    <h1>${this.data.h1}</h1>
                    <h2>${this.data.h2}</h2>
                    <h3>${this.data.h3}</h3>
                    <ul>
                        ${this.data.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `;
    }
}

class Template3 extends Template {
    render() {
        return `
            <section>
                <div class="slide grid">
                    <div class="top-left">${this.data['top-left']}</div>
                    <div class="top-right">${this.data['top-right']}</div>
                    <div class="bottom-left">${this.data['bottom-left']}</div>
                    <div class="bottom-right">${this.data['bottom-right']}</div>
                </div>
            </section>
        `;
    }
}

class Template4 extends Template {
    render() {
        return `
            <section>
                <div class="slide">
                    <h1>${this.data.title}</h1>
                    <h2>${this.data.subtitle}</h2>
                    <p>${this.data.date}</p>
                    <footer>${this.data.footer}</footer>
                </div>
            </section>
        `;
    }
}

class Template5 extends Template {
    render() {
        return `
            <section>
                <div class="slide">
                    <h1>${this.data.title}</h1>
                    <ul>
                        ${this.data.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                    <img src="${this.data.image}" alt="Presentation Image">
                </div>
            </section>
        `;
    }
}

class Template6 extends Template {
    render() {
        return `
            <section>
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
            </section>
        `;
    }
}

// Main Presentation class
class Presentation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with ID "${containerId}" not found`);
        }

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

    async loadPresentation() {
        try {
            const response = await fetch('data/slides-new.json');
            const data = await response.json();
            
            data.slides.forEach(slide => {
                const slideHTML = this.renderSlide(slide);
                this.container.innerHTML += slideHTML;
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
    const presentation = new Presentation('presentation-container');
    presentation.loadPresentation();
});
