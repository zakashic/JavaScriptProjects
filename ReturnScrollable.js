// ==UserScript==
// @name         Return Scrollable
// @namespace    https://github.com/cilxe/JavaScriptProjects
// @version      0.2.0
// @description  Enable scroll functionality after blocking pop-ups on certain sites.
// @author       zakashic
// @match        *://*/*
// @icon         None
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-body
// @license      MIT
// ==/UserScript==

(() => {
  const css = document.createElement('style');
  css.textContent = 'html, body { overflow: auto !important; }';

  // Function to append the CSS to the document head
  function appendCSS() {
    const target = document.head || document.documentElement;
    if (target) {
      target.append(css);
    }
    console.log('CSS applied: html, body { overflow: auto !important; }');
  }

  // Get stored sites from GM_getValue
  // eslint-disable-next-line no-undef
  const sites = GM_getValue('scrollableSites', []);
  const currentSite = window.location.hostname;

  // Check if the current site is in the list and apply CSS
  if (sites.includes(currentSite)) {
    appendCSS();
  }

  // Add keyboard shortcut [Ctrl + Alt + Shift + X]
  window.addEventListener('keydown', (e) => {
    if (e.key === 'X' && e.altKey && e.shiftKey && e.ctrlKey) {
      appendCSS();
    }
  });

  // Function to add the current site to the list
  function addCurrentSite() {
    if (!sites.includes(currentSite)) {
      sites.push(currentSite); // eslint-disable-next-line no-undef
      GM_setValue('scrollableSites', sites);
      alert(`${currentSite} has been added to the list, effective after refresh.`);
    } else {
      alert('This site is already in the list.');
    }
  }

  // Add menu command to add the current site
  // eslint-disable-next-line no-undef
  GM_registerMenuCommand('Set current site to append CSS by default.', addCurrentSite);
})();
