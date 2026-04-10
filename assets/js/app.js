/* /assets/js/app.js
   Bel Cleaning – Form management
   (c) 2025 Don Digital
*/

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
      var container = document.createElement('div');
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
    var self = this;
    return new Promise(function (resolve) {
      var script = document.createElement('script');
      script.src = 'https://mail.belcleaning.com/js/form_embed.js';
      script.onload = function () {
        self.scriptLoaded = true;
        resolve();
      };
      document.body.appendChild(script);
    });
  }

  initializePopupForms() {
    this.createFormIframe('scheduleWalkthrough');
    this.createFormIframe('franchiseApplication');
    this.createFormIframe('jobApplication');
  }

  createFormIframe(formKey) {
    var form = this.forms[formKey];
    if (!form || document.getElementById('popup-' + form.id)) return;

    var iframe = document.createElement('iframe');
    iframe.src = 'https://mail.belcleaning.com/widget/form/' + form.id;
    iframe.id = form.type === 'popup' ? 'popup-' + form.id : 'inline-' + form.id;
    iframe.title = form.name;

    if (form.type === 'popup') {
      iframe.style.cssText = 'display:none;width:100%;height:100%;border:none;border-radius:3px';
    } else {
      iframe.style.cssText = 'width:100%;height:100%;border:none;border-radius:3px';
    }

    iframe.setAttribute('data-layout', "{'id':'" + form.type.toUpperCase() + "'}");
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
    var container = document.getElementById(containerId);
    if (!container) return;
    var form = this.forms[formKey];
    if (!form || form.type !== 'inline') return;

    this.createFormIframe(formKey);
    var iframe = document.getElementById('inline-' + form.id);
    if (iframe) {
      container.appendChild(iframe);
      container.style.minHeight = form.height + 'px';
    }
  }

  openPopupForm(formKey) {
    var form = this.forms[formKey];
    if (!form || form.type !== 'popup') return;

    if (!document.getElementById('popup-' + form.id)) {
      this.createFormIframe(formKey);
    }

    var iframe = document.getElementById('popup-' + form.id);
    if (iframe) {
      iframe.style.display = 'block';
    }
  }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', function () {
  var formManager = new BelCleaningFormManager();
  formManager.init();
  window.BelCleaningForms = formManager;

  // Handle data-form-type attributes
  document.querySelectorAll('[data-form-type]').forEach(function (container) {
    var formType = container.getAttribute('data-form-type');
    if (formType === 'quoteRequest') {
      formManager.insertInlineForm(formType, container.id);
    }
  });
});

// Global API
window.BelCleaning = {
  openForm: function (formKey) {
    if (window.BelCleaningForms) {
      window.BelCleaningForms.openPopupForm(formKey);
    }
  },
  insertForm: function (formKey, containerId) {
    if (window.BelCleaningForms) {
      window.BelCleaningForms.insertInlineForm(formKey, containerId);
    }
  }
};
