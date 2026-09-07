// ==UserScript==
// @name         Google Keep Auto Dark
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Sync Google Keep's built-in dark theme with your system color scheme
// @author       Andy L
// @match        https://keep.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const THEME_QUERY = '(prefers-color-scheme: dark)';
    const MENU_ITEM_SELECTOR = '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]';
    const SETTINGS_PATTERN = /(settings|设置|偏好设置|设定)/i;
    const DARK_PATTERN = /(dark|暗色|深色|夜间)/i;
    const LIGHT_PATTERN = /(light|浅色|明亮)/i;
    const ENABLE_PATTERN = /(enable|turn on|开启|启用|打开|切换到)/i;
    const DISABLE_PATTERN = /(disable|turn off|关闭|停用|禁用)/i;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const prefersDark = () => matchMedia(THEME_QUERY).matches;
    const visible = (element) => {
        if (!element) return false;
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null;
    };
    const labelOf = (element) =>
        [
            element?.getAttribute('aria-label'),
            element?.getAttribute('data-tooltip'),
            element?.textContent
        ]
            .filter(Boolean)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

    const waitFor = async (getValue, timeout = 10000, interval = 150) => {
        const deadline = Date.now() + timeout;
        while (Date.now() < deadline) {
            const value = getValue();
            if (value) return value;
            await sleep(interval);
        }
        return null;
    };

    const click = async (element) => {
        if (!element) return;
        element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        await sleep(60);
        element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    };

    const pageIsDark = () => {
        const color = getComputedStyle(document.body || document.documentElement).backgroundColor;
        const rgb = color.match(/\d+/g)?.slice(0, 3).map(Number);
        if (!rgb) return null;
        const [r, g, b] = rgb;
        return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
    };

    const findSettingsButton = () =>
        Array.from(document.querySelectorAll('button, [role="button"], [aria-label]')).find((element) =>
            visible(element) && SETTINGS_PATTERN.test(labelOf(element))
        ) || null;

    const findThemeItem = () =>
        Array.from(document.querySelectorAll(MENU_ITEM_SELECTOR)).find((element) => {
            if (!visible(element)) return false;
            const label = labelOf(element);
            return DARK_PATTERN.test(label) || LIGHT_PATTERN.test(label);
        }) || null;

    const menuItemMeansDarkEnabled = (item) => {
        const ariaChecked = item?.getAttribute('aria-checked');
        if (ariaChecked === 'true') return true;
        if (ariaChecked === 'false') return false;

        const label = labelOf(item);
        if (DARK_PATTERN.test(label) && ENABLE_PATTERN.test(label)) return false;
        if (DARK_PATTERN.test(label) && DISABLE_PATTERN.test(label)) return true;
        if (LIGHT_PATTERN.test(label) && ENABLE_PATTERN.test(label)) return true;
        if (LIGHT_PATTERN.test(label) && DISABLE_PATTERN.test(label)) return false;
        return null;
    };

    let syncing = false;

    const syncTheme = async () => {
        if (syncing) return;
        syncing = true;

        try {
            const wantDark = prefersDark();
            if (pageIsDark() === wantDark) return;

            const settingsButton = await waitFor(findSettingsButton, 15000);
            if (!settingsButton) return;

            await click(settingsButton);

            const themeItem = await waitFor(findThemeItem, 5000);
            if (!themeItem) return;

            const currentDark = menuItemMeansDarkEnabled(themeItem);
            if (currentDark === null || currentDark !== wantDark) {
                await click(themeItem);
                await waitFor(() => pageIsDark() === wantDark, 4000, 120);
            }
        } finally {
            syncing = false;
        }
    };

    const init = async () => {
        await waitFor(() => document.body, 15000);
        await syncTheme();
        matchMedia(THEME_QUERY).addEventListener('change', syncTheme);
    };

    init().catch((error) => {
        console.error('[Google Keep Auto Dark] Initialization failed.', error);
    });
})();
