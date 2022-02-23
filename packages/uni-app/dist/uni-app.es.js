import { shallowRef, ref, getCurrentInstance, isInSSRComponentSetup, injectHook } from 'vue';
import { hasOwn, isString } from '@vue/shared';
import { sanitise, UNI_SSR_DATA, UNI_SSR_GLOBAL_DATA, UNI_SSR, ON_SHOW, ON_HIDE, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, ON_LOAD, ON_READY, ON_UNLOAD, ON_RESIZE, ON_BACK_PRESS, ON_PAGE_SCROLL, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_SHARE_TIMELINE, ON_ADD_TO_FAVORITES, ON_SHARE_APP_MESSAGE, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED } from '@dcloudio/uni-shared';

function getSSRDataType() {
    return getCurrentInstance() ? UNI_SSR_DATA : UNI_SSR_GLOBAL_DATA;
}
function assertKey(key, shallow = false) {
    if (!key) {
        throw new Error(`${shallow ? 'shallowSsrRef' : 'ssrRef'}: You must provide a key.`);
    }
}
const ssrClientRef = (value, key, shallow = false) => {
    const valRef = shallow ? shallowRef(value) : ref(value);
    // 非 h5 平台
    if (typeof window === 'undefined') {
        return valRef;
    }
    const __uniSSR = window[UNI_SSR];
    if (!__uniSSR) {
        return valRef;
    }
    const type = getSSRDataType();
    assertKey(key, shallow);
    if (hasOwn(__uniSSR[type], key)) {
        valRef.value = __uniSSR[type][key];
        if (type === UNI_SSR_DATA) {
            delete __uniSSR[type][key]; // TODO 非全局数据仅使用一次？否则下次还会再次使用该数据
        }
    }
    return valRef;
};
const globalData = {};
const ssrRef = (value, key) => {
    return ssrClientRef(value, key);
};
const shallowSsrRef = (value, key) => {
    return ssrClientRef(value, key, true);
};
function getSsrGlobalData() {
    return sanitise(globalData);
}

function getCurrentSubNVue() {
    // @ts-ignore
    return uni.getSubNVueById(plus.webview.currentWebview().id);
}

function resolveEasycom(component, easycom) {
    return isString(component) ? easycom : component;
}

// @ts-ignore
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => 
// post-create lifecycle registrations are noops during SSR
!isInSSRComponentSetup && injectHook(lifecycle, hook, target);
const onShow = /*#__PURE__*/ createHook(ON_SHOW);
const onHide = /*#__PURE__*/ createHook(ON_HIDE);
const onLaunch = /*#__PURE__*/ createHook(ON_LAUNCH);
const onError = /*#__PURE__*/ createHook(ON_ERROR);
const onThemeChange = 
/*#__PURE__*/ createHook(ON_THEME_CHANGE);
const onPageNotFound = 
/*#__PURE__*/ createHook(ON_PAGE_NOT_FOUND);
const onUnhandledRejection = 
/*#__PURE__*/ createHook(ON_UNHANDLE_REJECTION);
// 小程序如果想在 setup 的 props 传递页面参数，需要定义 props，故同时暴露 onLoad 吧
const onLoad = /*#__PURE__*/ createHook(ON_LOAD);
const onReady = /*#__PURE__*/ createHook(ON_READY);
const onUnload = /*#__PURE__*/ createHook(ON_UNLOAD);
const onResize = /*#__PURE__*/ createHook(ON_RESIZE);
const onBackPress = 
/*#__PURE__*/ createHook(ON_BACK_PRESS);
const onPageScroll = 
/*#__PURE__*/ createHook(ON_PAGE_SCROLL);
const onTabItemTap = 
/*#__PURE__*/ createHook(ON_TAB_ITEM_TAP);
const onReachBottom = /*#__PURE__*/ createHook(ON_REACH_BOTTOM);
const onPullDownRefresh = /*#__PURE__*/ createHook(ON_PULL_DOWN_REFRESH);
const onShareTimeline = 
/*#__PURE__*/ createHook(ON_SHARE_TIMELINE);
const onAddToFavorites = 
/*#__PURE__*/ createHook(ON_ADD_TO_FAVORITES);
const onShareAppMessage = 
/*#__PURE__*/ createHook(ON_SHARE_APP_MESSAGE);
const onNavigationBarButtonTap = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_BUTTON_TAP);
const onNavigationBarSearchInputChanged = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED);
const onNavigationBarSearchInputClicked = /*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED);
const onNavigationBarSearchInputConfirmed = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED);
const onNavigationBarSearchInputFocusChanged = 
/*#__PURE__*/ createHook(ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED);

export { getCurrentSubNVue, getSsrGlobalData, onAddToFavorites, onBackPress, onError, onHide, onLaunch, onLoad, onNavigationBarButtonTap, onNavigationBarSearchInputChanged, onNavigationBarSearchInputClicked, onNavigationBarSearchInputConfirmed, onNavigationBarSearchInputFocusChanged, onPageNotFound, onPageScroll, onPullDownRefresh, onReachBottom, onReady, onResize, onShareAppMessage, onShareTimeline, onShow, onTabItemTap, onThemeChange, onUnhandledRejection, onUnload, resolveEasycom, shallowSsrRef, ssrRef };
