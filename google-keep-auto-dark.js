// ==UserScript==
// @name         Google Keep Auto Dark
// @namespace    https://github.com/zakashic/ViolentmonkeyScripts
// @version      1.3.1
// @description  Sync Google Keep's built-in dark theme with your system color scheme
// @author       zakashic
// @match        https://keep.google.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAL60lEQVR42u2de3BU1R3H5RGBQpLdvDab3WR3k33d3buPvAlEQsiDSOQNYkspKKEtj1oqb50x2rFiBarVQpBpwRZptWkQ0M5UeUWihdh2rDOinZahMlg7xZ22GaetM5fw6/ndPRtuyAY2e++599rumfnO7Oxfez/f83ucc2fPue221EiN1EiN1EiN1EiN1GA4vpBZ9LnS/wrwUVSjJRqjc0l/a+z3f+5m+SgJ7DSi24nGE00gmkg0SaeaSH/jePqb0ySmjNJ1dEjA4w8eSzSOPpSRKJ/ITuQh4onCOhVPf6Od/mYjfYZx9JnG6C4ibpjxaXQGGYis+EDPfDO77fTTho4LL2T09L2SHhFenwRRpYNw/EZlRHVCqkxRbYudYHaEwGwPxpctICo/nor4ITKhCv1DlGf1RXItXE+O2dNhzHO1UVOs9Jkm0GccrQsjKPzRdHaMpz/SvmquqfXdH2Z09h2bJAEu1cjgozq2FDKHPyCrD42IyuKL5BR4OzNzSlppZBjos46lz64ZfOmsxzAtWL3A1PLOvowu4bWJIEoh+Kgj3zWrD3+QERyQqOjKzCluwWelzzwQDVrBx0KVSeTsfMTYLs54BvCFk5nQu8+kKXyJIlkmVzs+M33221U14Qb4WKT4Px9K7x4AzwC+cNIgSgfwReVGo6Gb1gejaiZIcn4MfvjCwfQeNeCjykr9uoCfW+AVRUzood2T1ATm8NNo6PFqwke1LXLqBv4NJvCUSRozE2jqGUuLj1OttHNdxgED9AJ/wIR8MR05KZuxiqciyezH9qsAC67a8IVTRtIJFegOviizB4x5znbaHY1XNAokCy0MLwO2miy7neHgo44+aYHCkiDYXEGwu6lcAVE2ZwAKiwNgdZAUZVcXfk5UkYxssUU1UFbKLNSoAWPoKtDOqs+/FXzU5a4ccPmC4PaHwOMPgpcKP7vJ9y4uCMXeADjcPDGEB4sDo0EV+KJIe9pFF2sTKDNFc78BV7hawY8qC0LlYSirCEN5ZQgqqqLCz6UVIQiWhYAPEVP4ALi5AJR4eBIdPIkMagRD+DFlZDlaaRTIrwWS3I+bUVbcXtASPmrtMh/MbCqFWS1l0DorqjvJ52byXX19GGprQ1A1mRhSHgQ+GCDRQY1w+qHA7mcKPyffDVl5rk66dzROdi2Q7G5ideeV3NtJBj6qo52Ddauq4IG11bD5/qjw87pVlbByWQV8cXE5zLmrDBobSmHqVBIdFUHwEyNcHA8Ol59EA6YiNvCpIrQtnRTbPZVrABYUI+5qag1fOJ0FZw9xcOTANDjxUh30vDxdFH7G757/fi3serQGtq2vhq+uqIBF80lkNIahpiYIodIAqRc8FJNoKCIm5BcygS/KkFPSRhdnaXINiK1683FLWWv4V9+7F4SPdoFwcSb0fzhY+N2nHzTDpXONoikHiBmPbK6GVcsrYN7sUqirC5HaEQSO56HE7Scm+AaZoBR8FGlJO+j7BHF1rETvb8f9fE3gv8VD/+U9AJ/9BXBc+9eZIfDj6R/vNUHvq9Nh384psGldFdyzqAwaZoShojIAvpgJDkxFysLPxjpgcvXQbij5NYHEAGypPHJepiQLH2d8DLx0JGIA6irRx79rhCP774B2Eg3L7imDpoaQaALH+6GYmGAlJigJX5TJFaFv1ibINWAMfU/Kqw3/2t+OwHAjUQNi+vQPzXDixWnw2FZiwhKMBJKOykmH5POT7sgH5iJOSfiiaCGemPR6QGIAVvOwXuCLaejKYyM24d9/jJrQvqlaTEfTpgUhGObB6fGReoB1QDn41ICwpBNSwgB9wE/WgFgkYDrauK4S5raGYfJkrAd+cJAosNg4xeCzMUCtnJ/AuNbXlZQB/bQm7NsxBdq+Ug6NM4JQWsaDyyuJAgXgq2AAm24nXsGNa0CCndBwhbn3lenQvrEKFs7FNUIsCjgwF3oVgc/YADZ9vthqJjo+ez9pA2It6oGno1Ewo54s0sJ+cLo5KLR7FYGfnedkZQC7RVaisz/ZTuhGnTlcB1vvr4TZd5K2tMIPbi9H0pCXpCH58BkZwHaFO9LRf3mpLAMunWuAne2TYcmCMEyp4YHz+8BewkG+1SsbfhYzAxjAR127cmTEBiTbCQ10RB80w4GnpsC9S8ugbloA+IDveh2QCZ+NAYzgC6ezSVfzG9UNwL2jl39UC2vuKycLswAEQ2Rl7OLAUuSRDZ+xAcrCRyUz5HRCMR0nC7P1Xy+HmY1BCJf6ocTlBavNIxs+QwOUh6+lAWe66mDj2gpoaSbrgVIfOIkBhRIDkoWflVvCwgA28JM1AK5+opwBTYEhBsiBz94ABeEL3UkaoEArKqagr5EU1BCAcNg3kILkwmdrgMLwhe6cpIqwaMBf1ytQhMugoR6LsA+KnV4oKPLIhs/OAAbwRQOuHE2uDsjohLAN3Y9t6JdKoe4OHnieI+sAL1kHyIfPxgBG8FFXz9+XnAF/f07WQmzHw9WwZH4Iaib7wevjwFbsAZPFLRu+kY0BbODHNNKtCLmdEBbgLd+ogLtaglBe7gOXhxRguxtyzfLhq2CAsvCFN3Kh/3KHagbgZtz+p2qg7culUF/HQyDIkfzvIYswtyLwjTnFLA1QHr6oc6GkoiC57eg6eHhDJSyYHYLqapJ+OC/YHHHST5LwGRrACD7V1fdXMjfg4982wnNP1sBKMvsbpvMQCnGk/fSQ9pOkn3xl4DMygC184Y08USPtiEbSCeErSWw9N6ypgNmzglBV6YvOflJ8zdLuRyZ8NgaoAF9Ub5iZAW+/im/CKuFu0vnUTvUDH4jmfpz9OfnKwVfBAEbwz0R17ZPEoyDR98P/+VMzHNo9VUw9WHjDYU7sfIrsktyvEHzGBrCFL5wxkVrQpngn9OHZBtj+UBUsnBNNPR5vNPUUFCoP35jtYGUAe/gxJdwRJfh++ORLuO9TBs0N0cIbazvF1KMwfEYGqAcf1f/RXsU6oX+eb4J9O2pg2ZIw1E7xA+fz0lUvG/gGpgaoAF/oIWno962KvR8+f6peLL5zZgWiq143bjuT2W9iA5+dASrBF3ryB+nY7pmw9VvrhtWOZw7ADw7+apAe2PaguMjCdIOtJqYcLLiY81mlHQNTAzSCf/Go/6bwhzMANb2xRVxkYbrBVpNFtxMPPkMD1IWfyOxHPfrt78Q1YMXqLSJ4XGQp3effDD4jA9SHL/SY4YVd85I2YM2m7YpuLyQK35BlZ2yASvCFNxMz4KEtG+MasHrjdk3gszVARfiJGoC6qQEqw2dngMrwUcf2zEzIgO/t/dkQA5au2qIJfDYGaAAfdfEYn5AB8TqhcGWTJvAz2RigPnzhzQJRx/a03NKAJ3btGTz72zZrBl8dA1SCL7wVk0XUrTohrXK+FH6m0cbYAI3go7Y/uHJYAx5/9kVdwFfagOjfVHUAX9SvUdY4KtQNfGqAIn9Tvf5H7ddyI3qGL5wt1A18IsX+qH39qIKf5/XoGT5qxfxiPcCHDKNN/lEFQw7r2G3q0DP8IQZoBJ8aIP+wjiHH1Wwwt+kZPurZrQ7N4aPSDTbFjqsZfGDT63kRvcIXzhZB10675vAzDUWKHtg0+Miyn5g69QofdfZ5m9bwIcNQpNyRZUMO7VtgadUrfOFcVFrCR03KLFLu0L64x1b+2NSlV/gontMOfrqhiMmxlYMPbl1saek7boroEb5wziZ2QlrAJ6knQma/8ge3xj26+HFzux7ho5bHDFAXPs5+NkcXD3t49+H8br3BR2EnpDZ8IraHdw97fP0vzD16gi8asMuu9sxX5/j6YS9wGDBBe/hCrx0u/dKuNnx1LnC46RUmh83deoAfk4ppR90rTG56ic8Tlva+k+aI1vBRTbVsux1acLW5xOem11jdbW1556ClS0v4qOXzHMz6fNpqanuNVZyaMPgit4XW1nd/aunsO2WJqA1f6HXAtjZl93Zwe4GucPVzkVuchVr8qww3W9tO77V2XDhs6ek7bY2whi+87SCdkLyXKbifj1vKdFdTv1cZDmNE6jJPjU1IXWers4hIXeiss+hIXWmeGqmRGqmRGqmRGqnxfz/+CyvoGhqvCCWvAAAAAElFTkSuQmCC
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
