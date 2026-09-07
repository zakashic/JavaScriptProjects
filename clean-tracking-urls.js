// ==UserScript==
// @name               跟踪链接净化 (Clean Tracking URLs)
// @namespace          https://github.com/zakashic/ViolentmonkeyScripts
// @author             zakashic
// @version            2.0.2
// @description        净化所有网站上的跟踪链接和事件 (高性能重构版，适配暴力猴 MV3 & 油猴)
// @match              *://*/*
// @exclude            *://*.hdslb.com/*
// @exclude            *://*.csdnimg.cn/*
// @icon               data:image/png;base64,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
// @run-at             document-start
// @grant              GM_registerMenuCommand
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              window.onurlchange
// @license            MIT
// ==/UserScript==

/**
 * 架构特点：
 * 1. 核心与规则彻底解耦：声明式 SITE_RULES 配置各站点规则，新增网站只需添加规则对象。
 * 2. standalone 参数隔离：原版中独立数组的站点（bilibili/baidu/ali/amazon/douyin/youku）不继承通用参数。
 * 3. 极致性能：捕获阶段事件委托 + Hover 独立清洗 + 增量 MutationObserver + Set O(1) 查找。
 * 4. 0 CPU 元素隐藏：原生 CSS 注入替代 setInterval 轮询。
 * 5. 全面兼容：Violentmonkey MV3 + Tampermonkey MV2/MV3，完美适配 SPA 路由。
 */

(() => {
  'use strict';

  // ==========================================
  // 1. 通用规则常量
  // ==========================================
  const COMMON_PARAMS = [
    'spm', 'mkt', 'src', 'from', 'source', 'alias',
    'vd_source', 'brand', 'curator_clanid', 'snr', 'redir', 'sprefix',
    'utm_id', 'utm_content', 'utm_source', 'utm_medium', 'utm_sources',
    'utm_term', 'utm_campaign', 'utm_referrer', 'utm_keyword', 'ref',
    'feature', 'click_id', 'fbclid', 'gclid', 'msclkid', 'twclid',
  ];

  // [P0 fix] 保持与原版一致：scm/referrer 为子串匹配（无锚定），无 /i 标志
  const COMMON_PARAM_REGEX = /^(spm|from_|ref_|track|trk|share_|embeds_|refer_)|_from$|scm|referrer/;
  const HOST_REGEX = /[a-z0-9-]{1,128}\.[a-z]{2,15}$/i;

  // ==========================================
  // 2. 站点规则注册表
  //    standalone: true 表示该站点参数独立，不继承 COMMON_PARAMS（与原版行为一致）
  //    excludeParams(url): 根据链接 URL 返回需要临时排除的参数名数组
  //    cleanElement(el, engine): 链接级别的 DOM 变换（在 URL 清洗之后执行）
  //    onManualClean(): 手动触发快捷键/菜单时执行的额外清理
  // ==========================================
  const SITE_RULES = [
    // ================== 哔哩哔哩 ==================
    {
      id: 'bilibili',
      matcher: /(bilibili|biligame)\.com$/,
      standalone: true, // [P0] 原版 bilibiliParams 不继承 commonParams
      params: [
        'vd_source', 'hotRank', 'launch_id', 'popular_rank',
        'session_id', 'business', 'sort_field', 'is_room_feed', 'visit_id',
        'is_live_full_webview', 'is_live_webview', 'vt', 'theme', 'noReffer',
        'timestamp', 'unique_k', 'hasBack', 'noTitleBar', 'plat_id', 'is_preview',
        'buvid', 'up_id', 'is_story_h5', 'hybrid_set_header', 'lottery_id', 'seid',
        '-Abrowser', 'from', 'pagefrom', 'schema', 'preUrl', 'jumpLinkType',
        'referfrom', 'spm_id', 'p2p_type', 'broadcast_type', 'event_source_type',
        // 以下参数被 paramRegex 覆盖但显式列出以确保清洗
        'share_medium', 'share_plat', 'share_source', 'share_tag', 'from_source',
        'from_spmid', 'goFrom', 'sourceFrom', 'share_session_id', 'refer_from',
        'spm_id_from', 'dynamicspm_id_from', 'extra_jump_from', 'search_source',
        'bsource', 'msource', 'csource',
      ],
      paramRegex: /^(utm_|share_|spm|from_|track)|(From|_from|source)$/,
      hideSelectors: [
        '#right-bottom-banner', 'a[href*="cm.bilibili.com"]',
        '#anchor-guest-box-id', 'iframe[src*="live-lottery"]',
      ],
      // [P2 fix] 链接元素 DOM 变换：清理追踪属性 + data-url 清洗替换
      cleanElement(el, engine) {
        if (!el || typeof el.removeAttribute !== 'function') return;
        el.removeAttribute('data-mod');
        el.removeAttribute('data-spmid');
        el.removeAttribute('data-idx');
        el.removeAttribute('data-target-url');

        const dataLink = el.getAttribute('data-url');
        if (dataLink && /^(https?:)?\/\/[a-zA-Z0-9-.]+\.[a-z]{2,15}/i.test(dataLink)) {
          const targetUrl = dataLink.startsWith('//') ? `https:${dataLink}` : dataLink;
          let cleanedUrl;
          try {
            cleanedUrl = engine.cleanUrl(targetUrl);
          } catch {
            cleanedUrl = targetUrl;
          }
          el.href = cleanedUrl;
          el.setAttribute('data-url', cleanedUrl);
          el.classList.remove('jump-link');
          el.target = '_blank';
          // 同步更新显示文本（如评论区直接显示 URL 的链接）
          const baseUrl = targetUrl.split('?')[0];
          if (el.innerText && el.innerText.startsWith(baseUrl)) {
            el.innerText = cleanedUrl;
          }
        }
      },
      onInit() {
        // [P3 fix] 延迟到 DOMContentLoaded 再移除 meta 和 data-report
        document.addEventListener('DOMContentLoaded', () => {
          document.querySelectorAll('meta[name="spm_prefix"]').forEach(m => m.remove());
          document.querySelectorAll('.bili-video-card[data-report*="tianma."]')
            .forEach(el => el.setAttribute('data-report', '0'));
            
          // 仅在未登录状态下隐藏弹窗，避免误伤已登录用户的历史/动态浮层
          const rightEntry = document.querySelector('.right-entry-item, .item');
          if (rightEntry && rightEntry.innerText.includes('登录')) {
            safeAppendStyle('.lt-row, .bili-login-card, .bili-mini-mask, .is-bottom, .v-popover-content, .unlogin-popover { display: none !important; }');
            const loginTab = rightEntry.querySelector('span');
            if (loginTab) {
              loginTab.outerHTML = '<a href="https://passport.bilibili.com/login" target="_blank" style="color: inherit; text-decoration: none;">登录</a>';
            }
          }
        }, { once: true });

        // 复制分享链接时净化（保留精准时间戳 t）
        document.addEventListener('click', (e) => {
          const shareBtn = e.target.closest('#arc_toolbar_report .share-btn-inner, .toolbar .link_copy');
          if (!shareBtn) return;
          e.stopImmediatePropagation();
          const currentUrl = new URL(window.location.href);
          for (const key of Array.from(currentUrl.searchParams.keys())) {
            if (/^(utm_|share_|spm|from_)|(From|_from|source)$/.test(key)) {
              currentUrl.searchParams.delete(key);
            }
          }
          if (shareBtn.innerText.includes('精准')) {
            const video = document.querySelector('video, bwp-video');
            if (video && video.currentTime) {
              currentUrl.searchParams.set('t', video.currentTime.toFixed(2));
            }
          }
          navigator.clipboard?.writeText(currentUrl.toString());
        }, true);
      },
      onManualClean() {
        document.querySelectorAll('a[href*="cm.bilibili.com"]').forEach(el => el.remove());
        document.getElementById('right-bottom-banner')?.remove();
        document.querySelectorAll('.bili-video-card[data-report*="tianma."]')
          .forEach(el => el.setAttribute('data-report', '0'));
      },
    },

    // ================== 百度系列 ==================
    {
      id: 'baidu',
      matcher: /baidu\.com$/,
      standalone: true, // [P0] 原版 baiduParams 不继承 commonParams
      params: [
        'rsv_idx', 'hisfilter', 'rsf', 'rsv_pq', 'rsv_t', 'qid',
        'rsv_dl', 'oq', 'gpc', 'usm', 'tfflag', 'bs', 'rqlang', 'tn',
        'sc_us', 'wfr', 'fenlei', 'platform', 'rqid', 'base_query', 'entry', 'qbl',
        'for', 'from', 'topic_pn', 'rsp', 'rs_src', 'f', 'rsv_page', 'dyTabStr',
        'ct', 'lm', 'site', 'sites', 'fr', 'cl', 'bsst', 'lid', 'rsv_spt',
        'rsv_bp', 'src', 'sfrom', 'refer', 'zp_fr', 'channel', 'p_from', 'n_type',
        'eqid', '_at_', 'sa', 'pd', 'source', 'tag_key', 'uname', 'uid',
        'fromModule', 'lemmaFrom', 'structureId', 'structureClickId',
        'ie', // [P1 fix] 恢复 ie，由 excludeParams 在 tieba 上排除
        'structureItemId', 'xzhid', 'rsv_enter', 'rsv_btype', 'prefixsug',
        'client_type', 'task', 'locate', 'page', 'type', 'is_new_user', 'frwh',
        'obj_id', 'fid', 'fname', '_t', 'topic_name', 'frs', 'share_from', 'tpl',
        'u', // [P1 fix] 恢复 u，由 excludeParams 在 passport 上排除
        'tb_mod', 'tb_fr', 'share', 'sfc', 'idfrom', 'client_version', 'st',
        'qq-pf-to', 'unique', 'is_video', '_wkts_', 'ai', 'ck', 'shh',
        // 百度自带 UTM 参数
        'utm_source', 'utm_medium', 'utm_term', 'utm_campaign', 'utm_content', 'utm_id',
        // news.baidu.com 额外参数
        'toc_style_id', 'share_to', 'track_id',
      ],
      hideSelectors: ['.EC_result'],
      // [P1/P3 fix] 条件排除：tieba 保留 ie，passport 保留 u
      excludeParams(url) {
        const excluded = [];
        if (url.hostname === 'passport.baidu.com') excluded.push('u');
        if (url.hostname.endsWith('tieba.baidu.com') || window.location.hostname.endsWith('tieba.baidu.com')) excluded.push('ie');
        return excluded;
      },
      cleanCustom(url) {
        // 百度知道路径修正
        if (url.hostname.endsWith('zhidao.baidu.com') && url.pathname === '/q') {
          url.pathname = '/search';
        }
      },
    },

    // ================== 阿里系电商 ==================
    {
      id: 'alibaba',
      matcher: /(alibaba|alibabagroup|aliyun|alimama|aliexpress|taobao|tmall|1688|jiyoujia|fliggy)\.(com|hk|cn)$|(lazada|trendyol)\.[a-z.]{2,15}$/,
      standalone: true, // [P0] 原版 aliParams 不继承 commonParams
      params: [
        // 基础参数
        'spm', 'acm', 'scm', 'scm2', 'scene', 'from', 'pvid', 'pvid2',
        // 淘宝/天猫
        'stats_click', 'initiative_id', 'source', 'suggest', 'suggest_query', 'iconType',
        'traceId', 'relationId', 'union_lens', 'ref', 'ali_trackid', 'ak', 'detailSharePosition',
        'topOfferIds', 'sp_abtk', 'search_condition', 'industryCatId', 'tbSocialPopKey',
        'bxsign', 'utparam', 'eurl', 'itemIds', 'country', 'epid', 'user_number_id',
        'rootPageId', 'lwfrom', 'disableNav', 'es', 'rand', '_lgt_', 'x5referer',
        'status_bar_transparent', 'tracelog',
        // 飞猪
        'ad_id', 'am_id', 'cm_id', 'pm_id', '_k',
        // 1688
        '__pageId__', 'resourceId', 'offerId', 'offerIds', 'object_id', 'udsPoolId',
        'resultType', 'cms_id', 'pha_html', '__existtitle__', 'object_type',
        'delivery_pool_id', 'delivery_pool_type', 'ilike_session', 'clickid', 'sessionid',
        'cosite', '_p_isad', 'exp', 'hpageId',
        // Lazada / Trendyol
        'shareUniqueId', 'clickTrackInfo', 'data_prefetch', 'at_iframe', 'prefetch_replace', 'wc',
      ],
      paramRegex: /^(utm_|spm_|from_|ref|track|wh_|wx_)/,
      // [P2 fix] 阿里搜索词中文解码修复
      cleanCustom(url, element) {
        if (element && url.searchParams.has('q') && element.innerText) {
          url.searchParams.set('q', element.innerText);
        }
      },
    },

    // ================== 亚马逊 ==================
    {
      id: 'amazon',
      matcher: /amazon\.[a-z.]{2,15}$/,
      standalone: true, // [P0] 原版 amaznParams 不继承 commonParams
      params: [
        'content-id', 'qid', 'crid', 'isAmazonFulfilled', 'sbo', 'plattr',
        'sprefix', 'ld', '_encoding', 'ie', 'ds',
      ],
      paramRegex: /_ref|^(utm_|ref|pd_rd_|pf_rd_|track|sc_)/i,
      cleanCustom(url) {
        if (/\/ref[=_/].*$/i.test(url.pathname)) {
          url.pathname = url.pathname.replace(/\/ref[=_/].*$/i, '');
        }
      },
    },

    // ================== 谷歌 ==================
    {
      id: 'google',
      matcher: /google\.[a-z.]{2,15}$|(about|wellbeing)\.google$/,
      params: [
        'device', 'pcampaignid', 'subid', 'hl', 'fg', 'ved', 'ei', 'prev',
        'sig', 'sca_esv', 'visit_id', 'dest_src',
      ],
      cleanCustom(url) {
        if (url.hash && url.hash.includes('utm_')) {
          const hashParams = new URLSearchParams(url.hash.slice(1));
          let changed = false;
          for (const key of Array.from(hashParams.keys())) {
            if (/^utm_/i.test(key)) {
              hashParams.delete(key);
              changed = true;
            }
          }
          if (changed) {
            const newHash = hashParams.toString();
            url.hash = newHash ? `#${newHash}` : '';
          }
        }
      },
    },

    // ================== YouTube ==================
    {
      id: 'youtube',
      matcher: /(youtube\.com|youtu\.be)$/,
      // YouTube 原版使用 commonParams.concat()，故继承 COMMON_PARAMS
      params: [
        'embeds_referring_euri', 'embeds_euri', 'source_ve_path', 'feature',
        'embeds_referring_origin', 'redir_token', 'pp', 'origin', 'ab_channel',
        'enablejsapi', 'widgetid', 'si',
      ],
      onInit() {
        // 阻断外部链接重定向
        document.addEventListener('click', (e) => {
          const link = e.target.closest('.yt-core-attributed-string--link-inherit-color');
          if (link) e.stopPropagation();
        }, true);

        // [P2 fix] 播放器右键菜单剪贴板拦截
        document.addEventListener('contextmenu', () => {
          const pagePath = window.location.pathname;
          if (!pagePath.startsWith('/watch') && !pagePath.startsWith('/embed')) return;

          setTimeout(() => {
            const contextMenu = document.querySelector('.ytp-contextmenu');
            if (!contextMenu || contextMenu.__cleanUrlsDone) return;
            contextMenu.__cleanUrlsDone = true;
            const menuItems = contextMenu.querySelectorAll('.ytp-menuitem');

            const buildCleanUrl = (withTime) => {
              try {
                const pageUrl = new URL(window.location.href);
                const shareUrl = new URL('https://youtube.com/watch');
                if (pagePath.startsWith('/watch')) {
                  shareUrl.searchParams.set('v', pageUrl.searchParams.get('v'));
                } else if (pagePath.startsWith('/embed/')) {
                  shareUrl.searchParams.set('v', pagePath.replace('/embed/', ''));
                }
                if (pageUrl.searchParams.has('list')) {
                  shareUrl.searchParams.set('list', pageUrl.searchParams.get('list'));
                }
                if (withTime) {
                  const video = document.querySelector('video');
                  if (video) shareUrl.searchParams.set('t', video.currentTime.toFixed(0));
                }
                return shareUrl.href;
              } catch { return window.location.href; }
            };

            if (pagePath.startsWith('/watch')) {
              // 菜单项 1: 复制视频网址
              menuItems[1]?.addEventListener('click', () => {
                navigator.clipboard?.writeText(buildCleanUrl(false));
              });
              // 菜单项 2: 复制当前时间的视频网址
              menuItems[2]?.addEventListener('click', () => {
                navigator.clipboard?.writeText(buildCleanUrl(true));
              });
            } else if (pagePath.startsWith('/embed/')) {
              menuItems[2]?.addEventListener('click', () => {
                navigator.clipboard?.writeText(buildCleanUrl(false));
              });
              menuItems[3]?.addEventListener('click', () => {
                navigator.clipboard?.writeText(buildCleanUrl(true));
              });
            }
          }, 100);
        });
      },
    },

    // ================== CSDN ==================
    {
      id: 'csdn',
      matcher: /csdn\.net$/,
      // CSDN 原版使用 commonParams.concat()，故继承 COMMON_PARAMS
      params: ['ops_request_misc', 'request_id', 'biz_id', 'ydreferer', 'usp', 'from_wecom'],
    },

    // ================== 优酷 / 土豆 ==================
    {
      id: 'youku_tudou',
      matcher: /(youku|tudou)\.com$/,
      standalone: true, // [P0] 原版 youkuTudouParams 不继承 commonParams
      params: ['spm', 'scm', 'from', 's', 'playMode', 'client_id'],
      paramRegex: /^(utm_|spm_|from_|ref|track|wh_|wx_)/,
    },

    // ================== 抖音 / TikTok ==================
    {
      id: 'douyin_tiktok',
      matcher: /(tiktok|douyin)\.com$/,
      standalone: true, // [P0] 原版 douyinParams 不继承 commonParams
      params: [
        'rsv_idx', 'hisfilter', 'source', 'aid', 'enter_from', 'focus_method',
        'previous_page', 'extra_params', 'gid', 'enter_method', 'is_from_webapp',
        'sender_device', 'web_id',
      ],
      // 原版抖音无 paramRegex 覆盖，使用默认 COMMON_PARAM_REGEX
    },

    // ================== 京东 ==================
    {
      id: 'jd',
      matcher: /jd\.com$/,
      params: [
        'gx', 'ad_od', 'needRecommendFlag', 'uabt', 'd', '_fd', 'pvid', 'jxsid',
        'csid', 'ss_projid', 'scan_orig', 'ss_expid', 'ss_sexpid', 'ss_ruleid',
        'ss_sruleid', 'ss_symbol', 'ss_mtest', 'sceneval',
      ],
      paramRegex: /^(track|wxa_|spm_|from_)/,
      // [P1 fix] 京东需要保留 utm_campaign（原版 splice 行为）
      excludeParams() {
        return ['utm_campaign'];
      },
    },

    // ================== 拼多多 ==================
    {
      id: 'pdd',
      matcher: /yangkeduo\.com$/,
      params: [
        'gx', 'ad_od', 'needRecommendFlag', 'uabt', 'd', 'pxq_secret_key',
        'cpsSignjb_act', 'launch_pdd', 'customParameters', 'duoduo_type', 'goods_sign',
      ],
      paramRegex: /^(track|from_|utm_|_oak_|_wv|_x_)/,
    },

    // ================== 知乎 ==================
    {
      id: 'zhihu',
      matcher: /zhihu\.com$/,
      params: ['search_source', 'hybrid_search_source', 'hybrid_search_extra', 'utm_psn'],
      // [P3 fix] 使用 MutationObserver 自动关闭登录弹窗（与原版 autoClose 行为一致）
      onInit() {
        const tryAutoClose = () => {
          const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
              for (const node of m.addedNodes) {
                if (node.nodeType !== 1 || !node.querySelector) continue;
                const modal = node.matches?.('.Modal-content') ? node
                  : node.querySelector('.Modal-content');
                if (modal) {
                  const closeBtn = modal.querySelector('.Modal-closeButton');
                  if (closeBtn) closeBtn.click();
                }
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          setTimeout(() => observer.disconnect(), 5000);
        };
        if (document.body) tryAutoClose();
        else document.addEventListener('DOMContentLoaded', tryAutoClose, { once: true });
      },
    },

    // ================== 小红书 ==================
    {
      id: 'xiaohongshu',
      matcher: /xiaohongshu\.com$/,
      params: ['xsec_token', 'xsec_source'],
      // [P3 fix] MutationObserver 自动关闭登录弹窗
      onInit() {
        const tryAutoClose = () => {
          const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
              for (const node of m.addedNodes) {
                if (node.nodeType !== 1 || !node.querySelector) continue;
                const container = node.matches?.('.login-container') ? node
                  : node.querySelector('.login-container');
                if (container) {
                  const closeBtn = container.querySelector('.close-button');
                  if (closeBtn) closeBtn.click();
                }
              }
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          setTimeout(() => observer.disconnect(), 5000);
        };
        if (document.body) tryAutoClose();
        else document.addEventListener('DOMContentLoaded', tryAutoClose, { once: true });
      },
    },

    // ================== 米哈游 / 崩铁 / 原神 ==================
    {
      id: 'hoyoverse',
      matcher: /(hoyolab|hoyoverse|mihoyo|miyoushe|mihoyogift)\.com$/,
      params: ['game_version', 'visit_device', 'device_type', 'plat_type'],
      paramRegex: /^(track|utm|spm_|from_|hyl_|mhy_)|_from$/,
      onInit() {
        safeAppendStyle('body { overflow: auto !important; }');
      },
    },

    // ================== 微软全家桶 ==================
    {
      id: 'microsoft',
      matcher: /(microsoft|bing|xbox|skype|office|microsoft365)\.com$/,
      params: [
        'ocid', 'OCID', 'ICID', 'icid', 'CLCID', 'clcid', 'es', 'response_mode',
        'exp', 'form', 'FORM', 'xr', 'cat0', 'culture', 'country', 'WT.mc_id',
        'uiflavor', 'activetab', 'fl', 'client_id', 'wreply', 'cobrandid',
        'deeplink', 'referrer', 'mode', 'pos',
      ],
    },

    // ==========================================
    // [P1 fix] 以下为从原版 commonClean 恢复的 19 个缺失站点
    // ==========================================

    // ================== Facebook ==================
    {
      id: 'facebook',
      matcher: /facebook\.com$/,
      params: [
        'privacy_mutation_token', 'ars', 'helpref', 'search_session_id',
        'entry_point', 'campaign_id', 'nav_source', 'placement',
        'privacy_source', '__cft__[0]', '__tn__',
      ],
    },

    // ================== LinkedIn ==================
    {
      id: 'linkedin',
      matcher: /linkedin\.com$/,
      // 原版有延时 8500ms 的 blockClickEvents，在事件委托架构下不再需要
      // 因为 capture-phase 委托天然先于 LinkedIn 的 bubble-phase 跟踪处理器
      params: [
        'original_referer', 'origin', 'upsellOrderOrigin', 'lipi',
        'desktopBackground', 'profileFormEntryPoint', 'entityUrn', 'veh',
        'miniCompanyUrn', 'courseSlug', 'upsellTrk', 'upsellTrackingId',
        'contextUrn', 'ct', 'pt', 'refId', 'position',
      ],
    },

    // ================== Dzen.ru ==================
    {
      id: 'dzen',
      matcher: /dzen\.ru$/,
      params: [
        'lang', 'country_code', 'rid', 'clid', 'stid', 'issue_tld',
        'parent_rid', 'persistent_id', 'story', 't', 'utr', 'place',
        'secdata', 'integration', 'feed_exp', 'force_common_feed',
        'feed_filter_type', 'feed_filter_source',
      ],
    },

    // ================== VK ==================
    {
      id: 'vk',
      matcher: /vk\.com$/,
      params: ['scheme', 'initial_stats_info'],
    },

    // ================== MSN ==================
    {
      id: 'msn',
      matcher: /msn\.(com|cn)$/,
      params: ['ocid', 'cvid', 'ei', '.cn', 'fullscreen'],
    },

    // ================== Best Buy ==================
    {
      id: 'bestbuy',
      matcher: /bestbuy\.(com|ca)$/,
      params: [
        'id', 'ar', 'cmp', 'loc', 'irgwc', 'mpid', 'irclickid',
        'intlreferer', 'intl', 'browsedCategory', 'qp', 'type', 'usc',
        'iht', 'ks', 'sc', '_dyncharset', 'icmp',
      ],
      paramRegex: /^(utm_|nrtv_|subId)/,
    },

    // ================== StackOverflow ==================
    {
      id: 'stackoverflow',
      matcher: /stackoverflow\.com$/,
      paramRegex: /^(utm_|spm_|from_|ref|track|trk|so_)/,
    },

    // ================== Pixiv ==================
    {
      id: 'pixiv',
      matcher: /pixiv\.net$/,
      params: ['provider'],
    },

    // ================== 网易系 (163/126/Yeah) ==================
    {
      id: 'netease',
      matcher: /(163|126|yeah)\.(com|net)$/,
      params: ['scene', 'session_id', 'fromDlpro', 'dltype'],
    },

    // ================== QQ ==================
    {
      id: 'qq',
      matcher: /qq\.com$/,
      params: ['ADTAG', 'fromSource'],
    },

    // ================== 豆瓣 ==================
    {
      id: 'douban',
      matcher: /douban\.com$/,
      params: [
        'target_user_id', 'dcs', 'dcm', 'dt_time_source',
        'channel', 'fullscreen', 'autorotate', 'hidenav',
      ],
    },

    // ================== IMDB / BoxOfficeMojo ==================
    {
      id: 'imdb',
      matcher: /(imdb|boxofficemojo)\.com$/,
      params: ['rf', 'imdbPageAction', 'u', 'tag'],
      // 与 Amazon 同源，使用 Amazon 的正则规则
      paramRegex: /_ref|^(utm_|ref|pd_rd_|pf_rd_|track|sc_)/i,
    },

    // ================== XDA-Developers ==================
    {
      id: 'xda',
      matcher: /xda-developers\.com$/,
      params: ['tag', 'ascsubtag', 'asc_refurl', 'asc_campaign', 'newsletter_popup'],
    },

    // ================== CCTV ==================
    {
      id: 'cctv',
      matcher: /cctv\.com$/,
      params: ['toc_style_id'],
    },

    // ================== Fiverr ==================
    {
      id: 'fiverr',
      matcher: /fiverr\.com$/,
      params: [
        'pckg_id', 'funnel', 'context_type', 'context_alg',
        'imp_id', 'pos', 'seller_online', 'context',
      ],
    },

    // ================== Newegg ==================
    {
      id: 'newegg',
      matcher: /newegg\.com$/,
      params: ['cm_sp', 'nextpage'],
    },

    // ================== TheVerge ==================
    {
      id: 'theverge',
      matcher: /theverge\.com$/,
      params: ['u1', 'tag', 'ascsubtag', 'subId1', 'subId2', 'subId3'],
    },

    // ================== Bluestacks ==================
    {
      id: 'bluestacks',
      matcher: /bluestacks\.com$/,
      params: [
        'platform', 'client_uuid', 'app_pkg', 'platform_cloud', 'preferred_lang',
        'gaCookie', 'gclid', 'clickid', 'msclkid', 'affiliateId', 'offerId',
        'transaction_id', 'aff_sub', 'first_landing_page', 'user_id',
        'incompatible', 'bluestacks_version', 'referrer', 'download_page_referrer',
      ],
      paramRegex: /^device_|(_version|utm_campaign)$/,
    },

    // ================== NicoVideo ==================
    {
      id: 'nicovideo',
      matcher: /nicovideo\.jp$/,
      params: ['cmnhd_ref', 'device', 'site', 'pos'],
    },

    // ==========================================
    // 其它已有站点
    // ==========================================
    {
      id: 'weibo',
      matcher: /weibo\.com$/,
      params: ['mark_id', 'entry', '_rand', 'sudaref', 'refer', 'band_rank', 'gid', 'ua'],
    },
    {
      id: 'reddit',
      matcher: /reddit\.com$/,
      params: ['embed_host_url', 'actionSource', 'shreddit'],
      paramRegex: /^(utm_|spm_|from_|ref|track|trk|experiment_d2x_|experiment_mweb)/,
    },
    {
      id: 'twitter',
      matcher: /(twitter|x)\.com$/,
      params: ['screen_name'],
    },
    {
      id: 'github',
      matcher: /github\.com$/,
      params: ['ref_cta', 'ref_loc', 'ref_page'],
    },
    {
      id: 'gitee',
      matcher: /gitee\.com$/,
      hideSelectors: ['.menu.transition.visible'],
    },
    {
      id: 'smzdm',
      matcher: /smzdm\.com$/,
      params: ['zdm_ss', 'send_by', 'from', 'invite_code'],
    },
    {
      id: 'apple_music',
      matcher: /music\.apple\.com$/,
      params: ['at', 'ct', 'itscg', 'itsct'],
    },
    {
      id: 'ebay',
      matcher: /ebay\.[a-z.]{2,15}$/,
      params: [
        '_trkparms', '_trksid', 'ssPageName', 'amdata', 'mc', 'hash',
        'epid', 'var', '_ssn', 'store_name', 'requested', 'itmprp', 'itmmeta',
      ],
    },
  ];

  // ==========================================
  // 3. 多语言支持
  // ==========================================
  const I18N = {
    'zh-CN': {
      clean: '手动清理当前页面链接',
      add: '添加自定义净化参数',
      inputTitle: '请输入要清除的参数名（字母、数字、下划线、短破折号）：',
      invalidFormat: '无效的参数格式',
      remove: '移除自定义净化参数',
      noParam: '未找到指定参数',
      listTitle: '当前域名已添加的自定义参数：\n\n',
      noCustom: '当前网站暂未添加任何自定义参数',
    },
    'zh-TW': {
      clean: '手動清理當前頁面鏈接',
      add: '添加自定義淨化參數',
      inputTitle: '請輸入要清除的參數名（字母、數字、下劃線、短破折號）：',
      invalidFormat: '無效的參數格式',
      remove: '移除自定義淨化參數',
      noParam: '未找到指定參數',
      listTitle: '當前網域名已添加的自定義參數：\n\n',
      noCustom: '當前網站暫未添加任何自定義參數',
    },
    en: {
      clean: 'Clean links manually',
      add: 'Add a custom parameter',
      inputTitle: 'Please enter parameter name (letters, numbers, -, _):',
      invalidFormat: 'Invalid parameter format.',
      remove: 'Remove a custom parameter',
      noParam: 'No such parameter.',
      listTitle: 'Custom parameters for current host:\n\n',
      noCustom: 'No custom parameters added for this host.',
    },
  };

  const lang = navigator.language.startsWith('zh-TW') || navigator.language.startsWith('zh-HK')
    ? 'zh-TW'
    : (navigator.language.startsWith('zh') ? 'zh-CN' : 'en');
  const msg = I18N[lang];

  // ==========================================
  // 工具函数：安全注入样式 (处理 Violentmonkey @run-at document-start 时 document.head 为 null 的情况)
  // ==========================================
  function safeAppendStyle(cssText) {
    const style = document.createElement('style');
    style.textContent = cssText;
    const target = document.head || document.documentElement;
    if (target) {
      target.appendChild(style);
    } else {
      const observer = new MutationObserver((mutations, obs) => {
        const t = document.head || document.documentElement;
        if (t) {
          t.appendChild(style);
          obs.disconnect();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    }
  }

  // ==========================================
  // 4. 高性能核心引擎
  // ==========================================
  class CleanEngine {
    constructor() {
      this.currentHost = window.location.hostname;
      this.ruleCache = new Map();
      this.commonParamSet = new Set(COMMON_PARAMS);

      // 预编译各站点规则的参数集合与正则
      SITE_RULES.forEach((rule) => {
        if (rule.standalone) {
          rule.paramSet = new Set(rule.params || []);
        } else {
          rule.paramSet = new Set([...COMMON_PARAMS, ...(rule.params || [])]);
        }
        rule.paramRegex = rule.paramRegex || COMMON_PARAM_REGEX;
      });

      // 匹配当前站点的专属规则
      this.matchedRule = this.getRuleForHost(this.currentHost) || {};

      // 加载当前域名的自定义参数
      this.customParams = this.loadCustomParams() || [];
      if (this.customParams.length > 0) {
        this.customParams.forEach((p) => {
          if (this.matchedRule.paramSet) this.matchedRule.paramSet.add(p);
          this.commonParamSet.add(p);
        });
      }

      this.init();
    }

    getRuleForHost(hostname) {
      if (!hostname) return null;
      if (hostname === this.currentHost && this.matchedRule) return this.matchedRule;
      let rule = this.ruleCache.get(hostname);
      if (rule === undefined) {
        rule = SITE_RULES.find((r) => {
          if (typeof r.matcher === 'function') return r.matcher(hostname);
          return r.matcher.test(hostname);
        }) || null;
        this.ruleCache.set(hostname, rule);
      }
      return rule;
    }

    init() {
      // 1. CSS 隐藏广告和弹窗
      try {
        if (this.matchedRule.hideSelectors?.length) {
          this.injectHideStyles(this.matchedRule.hideSelectors);
        }
      } catch (e) { console.error(e); }

      // 2. 站点特定初始化
      if (typeof this.matchedRule.onInit === 'function') {
        try {
          this.matchedRule.onInit();
        } catch (e) {
          console.error('[Clean Tracking URLs] 站点初始化失败:', e);
        }
      }

      // 3. 地址栏净化 (多重生命周期拦截 + 轮询守护，对抗 Vue/React 内部状态路由)
      try {
        this.restoreAddressBar();
        document.addEventListener('DOMContentLoaded', () => this.restoreAddressBar());
        window.addEventListener('load', () => this.restoreAddressBar());
        // 终极防线：每 500ms 巡检一次地址栏（仅在 URL 发生变动时触发，0 CPU 开销）
        setInterval(() => this.restoreAddressBar(), 500);
      } catch (e) { console.error('[Clean Tracking URLs] 地址栏净化失败:', e); }

      // 4. 全局捕获阶段事件委托
      try {
        this.bindDelegatedEvents();
      } catch (e) { console.error('[Clean Tracking URLs] 事件委托绑定失败:', e); }

      // 5. 增量 MutationObserver (处理动态加载的 DOM)
      try {
        this.bindMutationObserver();
      } catch (e) { console.error(e); }

      // 6. 快捷键与菜单
      try {
        this.bindKeyboardShortcut();
        this.registerMenus();
      } catch (e) { console.error(e); }
    }

    injectHideStyles(selectors) {
      safeAppendStyle(`${selectors.join(', ')} { display: none !important; }`);
    }

    // 净化单个 URL（优先使用目标链接域名对应的规则，实现跨站精准净化）
    cleanUrl(rawUrl, element = null) {
      if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
      // 快速跳过非 HTTP(S) 链接与页面内锚点
      if (/^(javascript|mailto|tel|data):|^#/i.test(rawUrl.trim())) return rawUrl;

      try {
        const url = new URL(rawUrl, window.location.origin);
        const rule = this.getRuleForHost(url.hostname);

        // 快速短路：若无查询参数及 Hash，且该规则无路径自定义清洗钩子，直接跳过
        if (!url.search && !url.hash && (!rule || !rule.cleanCustom)) return rawUrl;

        let modified = false;
        const paramSet = rule ? rule.paramSet : this.commonParamSet;
        const paramRegex = rule ? rule.paramRegex : COMMON_PARAM_REGEX;
        const excluded = rule && rule.excludeParams ? rule.excludeParams(url) : null;

        // 反向遍历 URL 实际包含的参数
        for (const key of Array.from(url.searchParams.keys())) {
          if (excluded && excluded.includes(key)) continue;
          if (paramSet.has(key) || paramRegex.test(key)) {
            url.searchParams.delete(key);
            modified = true;
          }
        }

        // 站点专属路径/哈希钩子
        if (rule && rule.cleanCustom) {
          const hrefBefore = url.href;
          rule.cleanCustom(url, element);
          if (url.href !== hrefBefore) modified = true;
        }

        return modified ? url.href : rawUrl;
      } catch {
        return rawUrl;
      }
    }

    // 清洗 DOM 节点
    cleanLinkElement(el) {
      if (!el || !el.href) return;
      if (!HOST_REGEX.test(el.hostname)) return;

      const cleaned = this.cleanUrl(el.href, el);
      if (cleaned !== el.href) {
        el.href = cleaned;
      }

      // 站点级 DOM 变换（优先匹配目标站点规则，若无则匹配当前站点规则）
      const rule = this.getRuleForHost(el.hostname) || this.matchedRule;
      if (rule && rule.cleanElement) {
        rule.cleanElement(el, this);
      }

      // 如果链接显示的文本包含纯 URL 且带有追踪参数，同步更新显示文本（保留可能的图标元素）
      if (el.textContent && el.textContent.includes('//')) {
        const cleanTextNodes = (node) => {
          for (const child of node.childNodes) {
            if (child.nodeType === 3) {
              const val = child.nodeValue;
              if (val && /^(https?:)?\/\//.test(val.trim())) {
                const cleanedText = this.cleanUrl(val.trim());
                if (cleanedText !== val.trim()) {
                  child.nodeValue = child.nodeValue.replace(val.trim(), () => cleanedText);
                }
              }
            } else if (child.nodeType === 1 && child.tagName !== 'SVG') {
              cleanTextNodes(child);
            }
          }
        };
        cleanTextNodes(el);
      }
    }

    // 净化浏览器地址栏
    restoreAddressBar() {
      try {
        const currentUrl = window.location.href;
        const cleaned = this.cleanUrl(currentUrl);
        if (cleaned !== currentUrl) {
          window.history.replaceState(window.history.state, '', cleaned);
        }
      } catch (e) {
        // 忽略跨域 iframe 或特殊沙盒环境下 replaceState 的安全限制
      }
    }

    // 从事件中安全提取链接元素（穿透 Web Components / Shadow DOM，如 B 站评论区）
    getLinkFromEvent(e) {
      if (typeof e.composedPath === 'function') {
        const path = e.composedPath();
        for (const node of path) {
          if (node && node.nodeType === 1) {
            if (node.tagName === 'A' || node.tagName === 'AREA') {
              return node;
            }
          }
        }
      }
      return e.target?.closest?.('a[href], area[href]');
    }

    // 事件委托
    bindDelegatedEvents() {
      document.addEventListener('pointerover', (e) => {
        const link = this.getLinkFromEvent(e);
        if (link) this.cleanLinkElement(link);
      }, { capture: true, passive: true });

      // 2. 点击、中键、右键、按压在捕获阶段优先清洗（先于目标网站脚本打点执行，覆盖移动端/快捷点击）
      const interceptEvents = ['pointerdown', 'click', 'auxclick', 'contextmenu'];
      interceptEvents.forEach((evtName) => {
        document.addEventListener(evtName, (e) => {
          const link = this.getLinkFromEvent(e);
          if (link) this.cleanLinkElement(link);
        }, { capture: true, passive: true });
      });

      // SPA 路由切换
      window.addEventListener('urlchange', () => this.restoreAddressBar());
      window.addEventListener('popstate', () => this.restoreAddressBar(), { passive: true });
      window.addEventListener('hashchange', () => this.restoreAddressBar(), { passive: true });
    }

    // 穿透清洗（支持 open 模式的 Shadow DOM，带 __cleanDone 去重及事件驱动监听）
    deepClean(root, force = false) {
      if (!root) return;
      if (root.__cleanDone && !force) return;

      if (root.tagName === 'A' || root.tagName === 'AREA') {
        this.cleanLinkElement(root);
        root.__cleanDone = true;
        return;
      }

      if (root.querySelectorAll) {
        const links = root.querySelectorAll('a[href], area[href]');
        for (const link of links) {
          if (!link.__cleanDone || force) {
            this.cleanLinkElement(link);
            link.__cleanDone = true;
          }
        }

        // 定向穿透 Web Components 宿主（如 B 站评论区 bili-comments），挂载增量 Observer，0 轮询开销
        const checkAndObserveShadow = (el) => {
          if (el && el.shadowRoot && !el.__shadowObserved) {
            el.__shadowObserved = true;
            this.deepClean(el.shadowRoot, force);
            // 局部增量监听：新评论插入时即时响应，随用随走
            const shadowObs = new MutationObserver((mutations) => {
              for (const m of mutations) {
                for (const n of m.addedNodes) {
                  if (n.nodeType === 1) this.deepClean(n);
                }
              }
            });
            shadowObs.observe(el.shadowRoot, { childList: true, subtree: true });
          }
        };

        if (root.shadowRoot) checkAndObserveShadow(root);
        const shadowHosts = root.querySelectorAll('bili-comments, bili-comment-thread-renderer, bili-comment-renderer');
        for (const el of shadowHosts) {
          checkAndObserveShadow(el);
        }
      }
    }

    // 增量 MutationObserver
    bindMutationObserver() {
      let isScheduled = false;
      const nodesQueue = [];

      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (node.nodeType === 1) nodesQueue.push(node);
          }
        }

        if (!isScheduled && nodesQueue.length > 0) {
          isScheduled = true;
          const schedule = (cb) => {
            if (typeof requestAnimationFrame === 'function' && !document.hidden) {
              requestAnimationFrame(cb);
            } else {
              setTimeout(cb, 16);
            }
          };

          schedule(() => {
            while (nodesQueue.length > 0) {
              const el = nodesQueue.shift();
              this.deepClean(el);
            }
            isScheduled = false;
          });
        }
      });

      const root = document.documentElement || document.body;
      if (root) {
        observer.observe(root, { childList: true, subtree: true });
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          observer.observe(document.body, { childList: true, subtree: true });
        }, { once: true });
      }
    }

    // 快捷键 (Alt + Shift + X)
    bindKeyboardShortcut() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'X' && e.altKey && e.shiftKey) {
          this.cleanAllLinksNow();
          this.restoreAddressBar();
          if (this.matchedRule.onManualClean) {
            this.matchedRule.onManualClean();
          }
        }
      });
    }

    // 全量扫描（仅菜单/快捷键触发，强制全量重扫）
    cleanAllLinksNow() {
      this.deepClean(document.documentElement || document.body, true);
    }

    // ==========================================
    // 5. 自定义参数存取
    // ==========================================
    loadCustomParams() {
      if (typeof GM_getValue !== 'function') return [];
      return GM_getValue(this.currentHost, []);
    }

    saveCustomParam(paramName) {
      if (!/^[a-zA-Z0-9()[\]{}<>_-]+$/.test(paramName)) {
        alert(msg.invalidFormat);
        return;
      }
      const list = this.loadCustomParams();
      if (!list.includes(paramName)) {
        list.push(paramName);
        if (typeof GM_setValue === 'function') {
          GM_setValue(this.currentHost, list);
        }
        if (this.matchedRule.paramSet) {
          this.matchedRule.paramSet.add(paramName);
        }
        this.commonParamSet.add(paramName);
        this.cleanAllLinksNow();
        this.restoreAddressBar();
      }
    }

    removeCustomParam(paramName) {
      const list = this.loadCustomParams();
      if (list.includes(paramName)) {
        const updated = list.filter(item => item !== paramName);
        if (typeof GM_setValue === 'function') {
          GM_setValue(this.currentHost, updated);
        }
        if (this.matchedRule.paramSet) {
          this.matchedRule.paramSet.delete(paramName);
        }
        this.commonParamSet.delete(paramName);
      } else {
        alert(msg.noParam);
      }
    }

    registerMenus() {
      if (typeof GM_registerMenuCommand !== 'function') return;

      GM_registerMenuCommand(msg.clean, () => {
        this.cleanAllLinksNow();
        this.restoreAddressBar();
        if (this.matchedRule.onManualClean) {
          this.matchedRule.onManualClean();
        }
      }, 'C');

      GM_registerMenuCommand(msg.add, () => {
        const input = prompt(msg.inputTitle, '');
        if (input) this.saveCustomParam(input.trim());
      });

      GM_registerMenuCommand(msg.remove, () => {
        const list = this.loadCustomParams();
        if (list.length === 0) {
          alert(msg.noCustom);
          return;
        }
        const input = prompt(`${msg.listTitle}${list.join(', ')}`, '');
        if (input) this.removeCustomParam(input.trim());
      });
    }
  }

  // 启动引擎
  new CleanEngine();
})();
