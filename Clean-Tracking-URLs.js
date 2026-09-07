// ==UserScript==
// @name               跟踪链接净化 (Clean Tracking URLs)
// @name:zh-CN         跟踪链接净化
// @name:zh-TW         跟蹤鏈接凈化
// @name:en            Clean Tracking URLs
// @name:ja            トラッカーの浄化
// @name:ko            추적 URL 정리
// @name:ru            Очистить ссылки отслеживания
// @name:de            Tracking-URLs bereinigen
// @name:fr            Nettoyer les URLs de suivi
// @name:es            Limpiar URLs de seguimiento
// @namespace          https://github.com/cilxe/JavaScriptProjects
// @author             zakashic
// @version            2.0.0
// @description        净化所有网站上的跟踪链接和事件 (高性能重构版，适配暴力猴 MV3 & 油猴)
// @description:zh-CN  净化所有网站上的跟踪链接和事件 (高性能重构版，适配暴力猴 MV3 & 油猴)
// @description:zh-TW  凈化網際網路上的所有網站鏈接和事件
// @description:en     Clean all tracking URLs, block tracking events on all websites
// @description:ja     すべてのサイトの追跡リンクとイベントをサニタイズする
// @description:ko     모든 추적 URL 정리, 모든 웹사이트에서 추적 이벤트 차단
// @description:ru     Очистить все ссылки отслеживания, заблокировать события отслеживания на всех веб-сайтах
// @description:de     Alle Tracking-URLs bereinigen, Tracking-Ereignisse auf allen Websites blockieren
// @description:fr     Nettoyer toutes les URLs de suivi, bloquer les événements de suivi sur tous les sites
// @description:es     Limpiar todas las URLs de seguimiento, bloquear eventos de seguimiento en todos los sitios web
// @match              *://*/*
// @exclude            *://*.hdslb.com/*
// @exclude            *://*.csdnimg.cn/*
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
      paramRegex: /^(utm_|share_|spm|from_)|(From|_from|source)$/,
      hideSelectors: [
        '.lt-row', '.bili-login-card', '.bili-mini-mask',
        '.is-bottom', '.v-popover-content', '.unlogin-popover',
        '#right-bottom-banner', 'a[href*="cm.bilibili.com"]',
        '#anchor-guest-box-id', 'iframe[src*="live-lottery"]',
      ],
      // [P2 fix] 链接元素 DOM 变换：清理追踪属性 + data-url 清洗替换
      cleanElement(el, engine) {
        el.removeAttribute('data-mod');
        el.removeAttribute('data-spmid');
        el.removeAttribute('data-idx');
        el.removeAttribute('data-target-url');

        const dataLink = el.getAttribute('data-url');
        if (dataLink && /^(https?:)?\/\/[a-zA-Z0-9-.]+\.[a-z]{2,15}/i.test(dataLink)) {
          const targetUrl = dataLink.startsWith('//') ? `https:${dataLink}` : dataLink;
          let cleanedUrl;
          try {
            const parsed = new URL(targetUrl);
            if (parsed.hostname.endsWith('bilibili.com') || parsed.hostname.endsWith('biligame.com')) {
              cleanedUrl = engine.cleanUrl(targetUrl);
            } else {
              // 外部域名使用通用规则清洗
              cleanedUrl = engine.cleanUrlGeneric(targetUrl);
            }
          } catch {
            cleanedUrl = targetUrl;
          }
          el.href = cleanedUrl;
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
        if (window.location.hostname.endsWith('tieba.baidu.com')) excluded.push('ie');
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
        if (url.pathname.includes('/ref')) {
          url.pathname = url.pathname.substring(0, url.pathname.indexOf('/ref'));
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
        const style = document.createElement('style');
        style.textContent = 'body { overflow: auto !important; }';
        (document.head || document.documentElement).appendChild(style);
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
  // 4. 高性能核心引擎
  // ==========================================
  class CleanEngine {
    constructor() {
      this.currentHost = window.location.hostname;

      // 匹配当前站点的专属规则
      this.matchedRule = SITE_RULES.find((r) => {
        if (typeof r.matcher === 'function') return r.matcher(this.currentHost);
        return r.matcher.test(this.currentHost);
      }) || {};

      // [P0 fix] standalone 站点不继承 COMMON_PARAMS
      this.customParams = this.loadCustomParams();
      if (this.matchedRule.standalone) {
        this.paramSet = new Set([
          ...(this.matchedRule.params || []),
          ...this.customParams,
        ]);
      } else {
        this.paramSet = new Set([
          ...COMMON_PARAMS,
          ...(this.matchedRule.params || []),
          ...this.customParams,
        ]);
      }

      this.paramRegex = this.matchedRule.paramRegex || COMMON_PARAM_REGEX;

      this.init();
    }

    init() {
      // 1. CSS 隐藏广告和弹窗
      if (this.matchedRule.hideSelectors?.length) {
        this.injectHideStyles(this.matchedRule.hideSelectors);
      }

      // 2. 站点特定初始化
      if (typeof this.matchedRule.onInit === 'function') {
        try {
          this.matchedRule.onInit();
        } catch (err) {
          console.error('[Clean URLs] onInit error:', err);
        }
      }

      // 3. 地址栏净化
      this.restoreAddressBar();

      // 4. 全局捕获阶段事件委托
      this.bindDelegatedEvents();

      // 5. 增量 MutationObserver
      this.bindMutationObserver();

      // 6. 菜单和快捷键
      this.registerMenus();
      this.bindKeyboardShortcut();
    }

    injectHideStyles(selectors) {
      const style = document.createElement('style');
      style.textContent = `${selectors.join(', ')} { display: none !important; }`;
      (document.head || document.documentElement).appendChild(style);
    }

    // 净化单个 URL（使用当前站点规则）
    cleanUrl(rawUrl, element = null) {
      if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
      // 快速短路：若既无查询参数/Hash，当前站点又无自定义路径/URL处理钩子，直接跳过
      if (!rawUrl.includes('?') && !rawUrl.includes('#') && !this.matchedRule.cleanCustom) return rawUrl;

      try {
        const url = new URL(rawUrl, window.location.origin);
        let modified = false;

        // [P3 fix] 条件排除：安全检查，不污染内部 paramSet
        const excluded = this.matchedRule.excludeParams ? this.matchedRule.excludeParams(url) : null;

        // 反向遍历 URL 实际包含的参数
        for (const key of Array.from(url.searchParams.keys())) {
          if (excluded && excluded.includes(key)) continue;
          if (this.paramSet.has(key) || this.paramRegex.test(key)) {
            url.searchParams.delete(key);
            modified = true;
          }
        }

        // [P3 fix] 站点专属钩子：通过比较 href 判断是否真正修改
        if (this.matchedRule.cleanCustom) {
          const hrefBefore = url.href;
          this.matchedRule.cleanCustom(url, element);
          if (url.href !== hrefBefore) modified = true;
        }

        return modified ? url.href : rawUrl;
      } catch {
        return rawUrl;
      }
    }

    // [P2 fix] 通用规则清洗（用于 B 站 data-url 等外部域名链接）
    cleanUrlGeneric(rawUrl) {
      if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
      if (!rawUrl.includes('?') && !rawUrl.includes('#')) return rawUrl;
      try {
        const url = new URL(rawUrl);
        let modified = false;
        const commonSet = new Set(COMMON_PARAMS);
        for (const key of Array.from(url.searchParams.keys())) {
          if (commonSet.has(key) || COMMON_PARAM_REGEX.test(key)) {
            url.searchParams.delete(key);
            modified = true;
          }
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

      // [P2 fix] 站点级 DOM 变换（如 B 站 data-url、追踪属性清理）
      if (this.matchedRule.cleanElement) {
        this.matchedRule.cleanElement(el, this);
      }
    }

    // 净化浏览器地址栏
    restoreAddressBar() {
      const currentUrl = window.location.href;
      const cleaned = this.cleanUrl(currentUrl);
      if (cleaned !== currentUrl) {
        window.history.replaceState(window.history.state, '', cleaned);
      }
    }

    // 事件委托
    bindDelegatedEvents() {
      document.addEventListener('pointerover', (e) => {
        const link = e.target?.closest?.('a[href], area[href]');
        if (link) this.cleanLinkElement(link);
      }, { capture: true, passive: true });

      // 2. 点击、中键、右键、按压在捕获阶段优先清洗（先于目标网站脚本打点执行，覆盖移动端/快捷点击）
      const interceptEvents = ['pointerdown', 'click', 'auxclick', 'contextmenu'];
      interceptEvents.forEach((evtName) => {
        document.addEventListener(evtName, (e) => {
          const link = e.target?.closest?.('a[href], area[href]');
          if (link) this.cleanLinkElement(link);
        }, { capture: true, passive: true });
      });

      // SPA 路由切换
      window.addEventListener('urlchange', () => this.restoreAddressBar());
      window.addEventListener('popstate', () => this.restoreAddressBar(), { passive: true });
      window.addEventListener('hashchange', () => this.restoreAddressBar(), { passive: true });
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
          requestAnimationFrame(() => {
            while (nodesQueue.length > 0) {
              const el = nodesQueue.shift();
              if (el.tagName === 'A' || el.tagName === 'AREA') {
                this.cleanLinkElement(el);
              } else if (el.querySelectorAll) {
                el.querySelectorAll('a[href], area[href]').forEach(link => this.cleanLinkElement(link));
              }
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

    // 全量扫描（仅菜单/快捷键触发）
    cleanAllLinksNow() {
      document.querySelectorAll('a[href], area[href]').forEach(link => this.cleanLinkElement(link));
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
        this.paramSet.add(paramName);
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
        this.paramSet.delete(paramName);
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
