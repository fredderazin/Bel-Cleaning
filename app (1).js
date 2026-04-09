// js/app.js - Complete JavaScript for all components and forms

// Form Manager Class
class BelCleaningFormManager {
    constructor() {
        this.forms = {
            scheduleWalkthrough: {
                id: 'kxixVtmbln5mL8LnGzjH',
                type: 'popup',
                height: 1107,
                name: 'Schedule Walkthrough'
            },
            franchiseApplication: {
                id: '1LsZUjRREQFrytVkW4eg',
                type: 'popup',
                height: 1049,
                name: 'Franchise Applications'
            },
            quoteRequest: {
                id: 'Lir3T0jW15k4i4aEeveH',
                type: 'inline',
                height: 908,
                name: 'Quote Request'
            },
            jobApplication: {
                id: 'YCQgYOTuUGewaT3HQI4N',
                type: 'popup',
                height: 946,
                name: 'Job Application'
            }
        };
        
        this.scriptLoaded = false;
        this.popupContainer = null;
    }
    
    init() {
        this.createPopupContainer();
        this.loadFormScript();
        this.initializePopupForms();
    }
    
    createPopupContainer() {
        if (!document.getElementById('popup-forms-container')) {
            const container = document.createElement('div');
            container.id = 'popup-forms-container';
            container.style.display = 'none';
            document.body.appendChild(container);
            this.popupContainer = container;
        }
    }
    
    loadFormScript() {
        if (this.scriptLoaded || document.querySelector('script[src*="form_embed.js"]')) {
            this.scriptLoaded = true;
            return Promise.resolve();
        }
        
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://mail.belcleaning.com/js/form_embed.js';
            script.onload = () => {
                this.scriptLoaded = true;
                resolve();
            };
            document.body.appendChild(script);
        });
    }
    
    initializePopupForms() {
        // Schedule Walkthrough
        this.createFormIframe('scheduleWalkthrough');
        // Franchise Application
        this.createFormIframe('franchiseApplication');
        // Job Application
        this.createFormIframe('jobApplication');
    }
    
    createFormIframe(formKey) {
        const form = this.forms[formKey];
        if (!form || document.getElementById(`popup-${form.id}`)) return;
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://mail.belcleaning.com/widget/form/${form.id}`;
        iframe.id = form.type === 'popup' ? `popup-${form.id}` : `inline-${form.id}`;
        iframe.title = form.name;
        
        if (form.type === 'popup') {
            iframe.style.cssText = 'display:none;width:100%;height:100%;border:none;border-radius:3px';
        } else {
            iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:3px';
        }
        
        iframe.setAttribute('data-layout', `{'id':'${form.type.toUpperCase()}'}`);
        iframe.setAttribute('data-trigger-type', 'alwaysShow');
        iframe.setAttribute('data-trigger-value', '');
        iframe.setAttribute('data-activation-type', 'alwaysActivated');
        iframe.setAttribute('data-activation-value', '');
        iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
        iframe.setAttribute('data-deactivation-value', '');
        iframe.setAttribute('data-form-name', form.name);
        iframe.setAttribute('data-height', form.height.toString());
        iframe.setAttribute('data-layout-iframe-id', iframe.id);
        iframe.setAttribute('data-form-id', form.id);
        
        if (this.popupContainer) {
            this.popupContainer.appendChild(iframe);
        }
    }
    
    insertInlineForm(formKey, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const form = this.forms[formKey];
        if (!form || form.type !== 'inline') return;
        
        this.createFormIframe(formKey);
        const iframe = document.getElementById(`inline-${form.id}`);
        if (iframe) {
            container.appendChild(iframe);
            container.style.minHeight = `${form.height}px`;
        }
    }
    
    openPopupForm(formKey) {
        const form = this.forms[formKey];
        if (!form || form.type !== 'popup') return;
        
        // If iframe doesn't exist, create it
        if (!document.getElementById(`popup-${form.id}`)) {
            this.createFormIframe(formKey);
        }
        
        // Trigger the popup
        const iframe = document.getElementById(`popup-${form.id}`);
        if (iframe && window.LazyLoad) {
            window.LazyLoad.trigger(iframe);
        }
    }
}

// Component Loader Class
class ComponentLoader {
    constructor() {
        this.components = {};
        this.loaded = false;
    }
    
    async loadComponent(elementId, componentPath) {
        try {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            // Check if component is already loaded
            if (this.components[elementId]) {
                element.innerHTML = this.components[elementId];
                return;
            }
            
            const response = await fetch(componentPath);
            const html = await response.text();
            this.components[elementId] = html;
            element.innerHTML = html;
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }
    
    async loadAllComponents() {
        const componentMap = {
            'header': '/components/header.html',
            'footer': '/components/footer.html',
            'cta-section': '/components/cta-section.html',
            'blog-section': '/components/blog-section.html',
            'social-section': '/components/social-media-section.html',
            'testimonials-section': '/components/testimonials-section.html'
        };
        
        const promises = [];
        for (const [id, path] of Object.entries(componentMap)) {
            if (document.getElementById(id)) {
                promises.push(this.loadComponent(id, path));
            }
        }
        
        await Promise.all(promises);
        this.loaded = true;
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.toggle = null;
        this.menu = null;
        this.isOpen = false;
    }
    
    init() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        
        if (this.toggle && this.menu) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                    this.closeMenu();
                }
            });
            
            // Close menu when clicking on a link
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
    }
    
    closeMenu() {
        this.isOpen = false;
        this.menu.classList.remove('active');
        this.toggle.classList.remove('active');
    }
}

// Smooth Scroll Handler
class SmoothScroll {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize forms
    const formManager = new BelCleaningFormManager();
    formManager.init();
    window.BelCleaningForms = formManager;
    
    // Initialize component loader
    const componentLoader = new ComponentLoader();
    await componentLoader.loadAllComponents();
    
    // Initialize mobile menu after components are loaded
    setTimeout(() => {
        const mobileMenu = new MobileMenu();
        mobileMenu.init();
    }, 100);
    
    // Initialize smooth scroll
    const smoothScroll = new SmoothScroll();
    smoothScroll.init();
    
    // Handle data-form-type attributes for automatic form insertion
    document.querySelectorAll('[data-form-type]').forEach(container => {
        const formType = container.getAttribute('data-form-type');
        if (formType === 'quoteRequest') {
            formManager.insertInlineForm(formType, container.id);
        }
    });
});

// Export for global use
window.BelCleaning = {
    openForm: (formKey) => {
        if (window.BelCleaningForms) {
            window.BelCleaningForms.openPopupForm(formKey);
        }
    },
    insertForm: (formKey, containerId) => {
        if (window.BelCleaningForms) {
            window.BelCleaningForms.insertInlineForm(formKey, containerId);
        }
    }
};