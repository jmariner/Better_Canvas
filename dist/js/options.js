/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SassVars {
    constructor() {
        this.prefix = "betterCanvas";
        this.cssClass = {
            active: "active",
            checkbox_parent: "checkbox-parent",
            checkbox_checked: "checkbox-checked",
            checkbox_td: "checkbox-td",
            flash: "anim-flash",
            course_link_text: "course-link-text",
            item_hidden: "hidden",
            hide_button: "btn-hide",
            hide_disabled: "hide-disabled",
            toc_ratio: "toc-ratio",
            toc_title: "toc-title",
            fixed: "fixed",
            item_icon: "icon-wrapper",
            download: "download-btn",
            external_url: "url-btn",
            popup_loaded: "done-loading",
            popup_connected: "page-connected",
            popup_require_page: "require-page"
        };
        this.dataAttr = {
            toc_module_id: "toc-module-id",
            toc_total: "toc-total",
            toc_checked_count: "toc-checked-count",
            toc_percentage: "toc-percentage",
            mod_item_id: "item-id",
            course_name: "course-name",
            course_code: "course-code",
            def_indent: "default-indent"
        };
        this.id = {
            toc: "toc",
            jump_button: "jump-to-top",
            popup_page_missing: "page-missing-error",
            popup_ex_name: "extension-name",
            popup_insertion_point: "insertion-point",
            popup_jump_button: "jump-to"
        };
        this.color = {
            toc_fill: "rgba(0, 255, 0, .75)",
            toc_border: "rgb(102, 120, 135)",
            toc_title: "var(--ic-brand-primary)",
            checkbox_check: "rgb(22, 160, 133)",
            checkbox_border: "rgb(102, 120, 135)",
            highlight_orange: "rgb(255, 152, 0)",
            highlight_red: "rgb(255, 0, 0)",
            jump_button: "rgb(57, 75, 88)"
        };
        this.ui = {
            top_inside_ratio: 0.05,
            scroll_top_offset: 5,
            jump_top_cutoff: 100,
            toc_top_margin: 32,
            scroll_time: 500,
            fade_time: 500,
            subheader_indent: 0,
            main_indent: 1
        };
        this.state = {
            show_hidden: {
                cssClass: "show-hidden",
                pages: ["modules"],
                desc: "Show hidden items"
            },
            hide_checked: {
                cssClass: "hide-checked",
                pages: ["modules", "grades"],
                desc: "Hide completed items"
            },
            highlight_unchecked: {
                cssClass: "mark-unchecked",
                pages: ["modules", "grades"],
                desc: "Mark unchecked items"
            },
            disable_indent_override: {
                pages: ["modules"],
                desc: "Disable indent overrides"
            }
        };
        const types = new Set(SassVars.meta.prefixTypes);
        const processObject = (obj, objName) => {
            for (const key in obj) {
                if (!obj.hasOwnProperty(key))
                    continue;
                let val = obj[key];
                if (typeof val === "object") {
                    processObject(val, key);
                }
                else if (typeof val === "string") {
                    const excluded = SassVars.meta.prefixExclude
                        .map(str => new RegExp("^" + str + "$"))
                        .some(regex => regex.test(key));
                    if (!excluded && (types.has(objName) || types.has(key)))
                        val = this.prefix + "-" + val;
                    if (objName === SassVars.meta.dataPrefixType)
                        val = "data-" + val;
                    obj[key] = val;
                }
            }
        };
        processObject(this, "root");
        this.sassExports = Object.assign({}, this);
    }
}
SassVars.meta = {
    dataPrefixType: "dataAttr",
    prefixTypes: ["cssClass", "dataAttr", "id"],
    prefixExclude: ["popup_.+"]
};
class Vars extends SassVars {
    constructor() {
        super(...arguments);
        this.tooltip = {
            mark_complete: "Mark as completed",
            mark_incomplete: "Mark as incomplete",
            hide: "Hide this item",
            unhide: "Unhide this item",
            hide_disabled: "Cannot hide graded item",
            jump_button: "Jump to top",
            waiting: "Waiting...",
            download: "Download file: \"{filename}\"",
            external_url: "Visit external URL",
            has_submission: "Assignment has submission",
            popup_no_unchecked: "No unchecked items to jump to"
        };
        this.misc = {
            toc_background: `-webkit-linear-gradient(left, ${this.color.toc_fill} {percent}%, transparent {percent}%)`,
            token_key: "accessToken"
        };
        this.element = {
            checkbox: `<div style='display:none' class='${this.cssClass.checkbox_parent}'>
					<input type='checkbox' ${this.dataAttr.mod_item_id}='{item_id}'>
				</div>`,
            download_button: `<div style='display:none' class='${this.cssClass.download}' title='${this.tooltip.download}'>
					<a href="{file_url}"></a>
				</div>`,
            url_button: `<div style='display:none' class='${this.cssClass.external_url}' title='${this.tooltip.external_url}'>
					<a href="{external_url}" class="not_external" target="_blank"></a>
				</div>`,
            hide_button: `<div style='display:none' class='${this.cssClass.hide_button}'>
					<i ${this.dataAttr.mod_item_id}='{item_id}'></i>
				</div>`,
            course_link: `<li style='background-color: {tabColor}' class='menu-item ic-app-header__menu-list-item'>
				<a href='/courses/{tabID}/modules' class='ic-app-header__menu-list-link'>
					<div class='menu-item-icon-container' aria-hidden='true'><i></i></div>
					<div style='background-color: {tabColor}; border-right-color: {tabColor}'
							${this.dataAttr.course_name}='{name}' ${this.dataAttr.course_code}='{code}'
							class='menu-item__text ${this.cssClass.course_link_text}'></div>
				</a>
			</li>`,
            toc: `<div id='${this.id.toc}' class='ic-app-course-menu list-view'>
				<div class='${this.cssClass.toc_title}'>Table of Contents</div>
				<nav><ul></ul></nav>
			</div>`,
            toc_item: `<li>
				<a href='#' title='{item_name}'>
					{item_name}
					<div class='${this.cssClass.toc_ratio}' ${this.dataAttr.toc_module_id}='{item_id}'></div>
				</a>
			</li>`,
            jump_button: `<div id='${this.id.jump_button}'>
				<i title='${this.tooltip.jump_button}'></i>
			</div>`,
            submission_icon: `<div title='${this.tooltip.has_submission}' class='${this.cssClass.item_icon}'>
				<i class='icon-publish'></i>
			</div>`,
            popup_state_switch: `<div class="switch ${this.cssClass.popup_require_page}">
				<label for="{name}" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<span class="mdl-switch__label">{desc}</span>
					<input id="{name}" type="checkbox" class="mdl-switch__input">
				</label>
			</div>`
        };
        this._canvasNamespace = `com.jmariner.${this.prefix}`;
        this.canvas = {
            selector: {
                module: "div.context_module",
                module_item: "li.context_module_item",
                module_items: "ul.context_module_items",
                subheader: "li.context_module_sub_header",
                not_subheader: "li.context_module_item:not(.context_module_sub_header)",
                nav_tabs: "ul#section-tabs"
            },
            api: {
                namespace: this._canvasNamespace,
                root_url: "/api/v1/",
                per_page: 100,
                urls: {
                    custom_data: `users/self/custom_data{dataPath}?ns=${this._canvasNamespace}`,
                    favorite_courses: "users/self/favorites/courses",
                    custom_colors: "users/self/colors",
                    assignments: "users/self/courses/{courseID}/assignments",
                    modules: "courses/{courseID}/modules",
                    module_items: "courses/{courseID}/modules/{moduleID}/items",
                    file_direct: "courses/{courseID}/files/{fileID}",
                    navigation_tabs: "courses/{courseID}/tabs"
                },
                data_urls: {
                    active_states: "active_states",
                    completed_assignments: "completed_assignments",
                    hidden_assignments: "hidden_assignments",
                    tab_positions: "tab_positions"
                }
            }
        };
    }
}
const VARS = new Vars();
const V = VARS;
/* harmony export (immutable) */ __webpack_exports__["a"] = V;

/* unused harmony default export */ var _unused_webpack_default_export = (VARS.sassExports);


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vars__ = __webpack_require__(0);

$(function () {
    const tokenEl = $("#token");
    const statusEl = $("#status");
    const saveEl = $("#save");
    chrome.storage.sync.get(__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key, data => {
        if (data[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key])
            tokenEl.val(data[__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key]);
    });
    saveEl.click(() => {
        const token = tokenEl.val();
        chrome.storage.sync.set({
            [__WEBPACK_IMPORTED_MODULE_0__vars__["a" /* V */].misc.token_key]: token
        }, () => {
            if (chrome.runtime.lastError === undefined) {
                statusEl.text("Access token saved");
                setTimeout(window.close, 500);
            }
        });
    });
});


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWFmMTU4MmRjMTljOGQ0OWMwNWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtJQW1HQztRQWpHQSxXQUFNLEdBQUcsY0FBYyxDQUFDO1FBRXhCLGFBQVEsR0FBRztZQUNWLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxhQUFhO1lBQzFCLEtBQUssRUFBRSxZQUFZO1lBQ25CLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsUUFBUTtZQUNyQixXQUFXLEVBQUUsVUFBVTtZQUN2QixhQUFhLEVBQUUsZUFBZTtZQUM5QixTQUFTLEVBQUUsV0FBVztZQUN0QixTQUFTLEVBQUUsV0FBVztZQUN0QixLQUFLLEVBQUUsT0FBTztZQUNkLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFlBQVksRUFBRSxTQUFTO1lBRXZCLFlBQVksRUFBRSxjQUFjO1lBQzVCLGVBQWUsRUFBRSxnQkFB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QUFDLENBQUMsQ0FBQztBQUVKLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im9wdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxYWYxNTgyZGMxOWM4ZDQ5YzA1YiIsImNsYXNzIFNhc3NWYXJzIHtcclxuXHJcblx0cHJlZml4ID0gXCJiZXR0ZXJDYW52YXNcIjtcclxuXHJcblx0Y3NzQ2xhc3MgPSB7XHJcblx0XHRhY3RpdmU6IFwiYWN0aXZlXCIsXHJcblx0XHRjaGVja2JveF9wYXJlbnQ6IFwiY2hlY2tib3gtcGFyZW50XCIsXHJcblx0XHRjaGVja2JveF9jaGVja2VkOiBcImNoZWNrYm94LWNoZWNrZWRcIixcclxuXHRcdGNoZWNrYm94X3RkOiBcImNoZWNrYm94LXRkXCIsXHJcblx0XHRmbGFzaDogXCJhbmltLWZsYXNoXCIsXHJcblx0XHRjb3Vyc2VfbGlua190ZXh0OiBcImNvdXJzZS1saW5rLXRleHRcIixcclxuXHRcdGl0ZW1faGlkZGVuOiBcImhpZGRlblwiLFxyXG5cdFx0aGlkZV9idXR0b246IFwiYnRuLWhpZGVcIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiaGlkZS1kaXNhYmxlZFwiLFxyXG5cdFx0dG9jX3JhdGlvOiBcInRvYy1yYXRpb1wiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInRvYy10aXRsZVwiLFxyXG5cdFx0Zml4ZWQ6IFwiZml4ZWRcIixcclxuXHRcdGl0ZW1faWNvbjogXCJpY29uLXdyYXBwZXJcIixcclxuXHRcdGRvd25sb2FkOiBcImRvd25sb2FkLWJ0blwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcInVybC1idG5cIixcclxuXHJcblx0XHRwb3B1cF9sb2FkZWQ6IFwiZG9uZS1sb2FkaW5nXCIsXHJcblx0XHRwb3B1cF9jb25uZWN0ZWQ6IFwicGFnZS1jb25uZWN0ZWRcIixcclxuXHRcdHBvcHVwX3JlcXVpcmVfcGFnZTogXCJyZXF1aXJlLXBhZ2VcIlxyXG5cdH07XHJcblxyXG5cdGRhdGFBdHRyID0ge1xyXG5cdFx0dG9jX21vZHVsZV9pZDogXCJ0b2MtbW9kdWxlLWlkXCIsXHJcblx0XHR0b2NfdG90YWw6IFwidG9jLXRvdGFsXCIsXHJcblx0XHR0b2NfY2hlY2tlZF9jb3VudDogXCJ0b2MtY2hlY2tlZC1jb3VudFwiLFxyXG5cdFx0dG9jX3BlcmNlbnRhZ2U6IFwidG9jLXBlcmNlbnRhZ2VcIixcclxuXHRcdG1vZF9pdGVtX2lkOiBcIml0ZW0taWRcIixcclxuXHRcdGNvdXJzZV9uYW1lOiBcImNvdXJzZS1uYW1lXCIsXHJcblx0XHRjb3Vyc2VfY29kZTogXCJjb3Vyc2UtY29kZVwiLFxyXG5cdFx0ZGVmX2luZGVudDogXCJkZWZhdWx0LWluZGVudFwiXHJcblx0fTtcclxuXHJcblx0aWQgPSB7XHJcblx0XHR0b2M6IFwidG9jXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJqdW1wLXRvLXRvcFwiLFxyXG5cclxuXHRcdHBvcHVwX3BhZ2VfbWlzc2luZzogXCJwYWdlLW1pc3NpbmctZXJyb3JcIixcclxuXHRcdHBvcHVwX2V4X25hbWU6IFwiZXh0ZW5zaW9uLW5hbWVcIixcclxuXHRcdHBvcHVwX2luc2VydGlvbl9wb2ludDogXCJpbnNlcnRpb24tcG9pbnRcIixcclxuXHRcdHBvcHVwX2p1bXBfYnV0dG9uOiBcImp1bXAtdG9cIlxyXG5cdH07XHJcblxyXG5cdGNvbG9yID0ge1xyXG5cdFx0dG9jX2ZpbGw6IFwicmdiYSgwLCAyNTUsIDAsIC43NSlcIixcclxuXHRcdHRvY19ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidmFyKC0taWMtYnJhbmQtcHJpbWFyeSlcIiwgLy8gd2FzIFwicmdiKDU3LCA3NSwgODgpXCIsXHJcblx0XHRjaGVja2JveF9jaGVjazogXCJyZ2IoMjIsIDE2MCwgMTMzKVwiLFxyXG5cdFx0Y2hlY2tib3hfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0aGlnaGxpZ2h0X29yYW5nZTogXCJyZ2IoMjU1LCAxNTIsIDApXCIsXHJcblx0XHRoaWdobGlnaHRfcmVkOiBcInJnYigyNTUsIDAsIDApXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJyZ2IoNTcsIDc1LCA4OClcIlxyXG5cdH07XHJcblxyXG5cdHVpID0ge1xyXG5cdFx0dG9wX2luc2lkZV9yYXRpbzogMC4wNSxcclxuXHRcdHNjcm9sbF90b3Bfb2Zmc2V0OiA1LFxyXG5cdFx0anVtcF90b3BfY3V0b2ZmOiAxMDAsXHJcblx0XHR0b2NfdG9wX21hcmdpbjogMzIsXHJcblx0XHRzY3JvbGxfdGltZTogNTAwLFxyXG5cdFx0ZmFkZV90aW1lOiA1MDAsXHJcblx0XHRzdWJoZWFkZXJfaW5kZW50OiAwLFxyXG5cdFx0bWFpbl9pbmRlbnQ6IDFcclxuXHR9O1xyXG5cclxuXHRzdGF0ZSA9IHtcclxuXHRcdHNob3dfaGlkZGVuOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcInNob3ctaGlkZGVuXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIlNob3cgaGlkZGVuIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWRlX2NoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwiaGlkZS1jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkhpZGUgY29tcGxldGVkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRoaWdobGlnaHRfdW5jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcIm1hcmstdW5jaGVja2VkXCIsXHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCIsIFwiZ3JhZGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIk1hcmsgdW5jaGVja2VkIGl0ZW1zXCJcclxuXHRcdH0sXHJcblx0XHRkaXNhYmxlX2luZGVudF9vdmVycmlkZToge1xyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJEaXNhYmxlIGluZGVudCBvdmVycmlkZXNcIlxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNhc3NFeHBvcnRzOiBTYXNzVmFycztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbWV0YSA9IHtcclxuXHRcdGRhdGFQcmVmaXhUeXBlOiBcImRhdGFBdHRyXCIsXHJcblx0XHRwcmVmaXhUeXBlczogW1wiY3NzQ2xhc3NcIiwgXCJkYXRhQXR0clwiLCBcImlkXCJdLFxyXG5cdFx0cHJlZml4RXhjbHVkZTogW1wicG9wdXBfLitcIl1cclxuXHR9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRjb25zdCB0eXBlcyA9IG5ldyBTZXQoU2Fzc1ZhcnMubWV0YS5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmo6IG9iamVjdCwgb2JqTmFtZTogc3RyaW5nKSA9PiB7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IHZhbDogb2JqZWN0IHwgc3RyaW5nIHwgbnVtYmVyID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG5cdFx0XHRcdFx0cHJvY2Vzc09iamVjdCh2YWwsIGtleSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZXhjbHVkZWQgPSBTYXNzVmFycy5tZXRhLnByZWZpeEV4Y2x1ZGVcclxuXHRcdFx0XHRcdFx0Lm1hcChzdHIgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHN0ciArIFwiJFwiKSlcclxuXHRcdFx0XHRcdFx0LnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChrZXkpKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVkICYmICh0eXBlcy5oYXMob2JqTmFtZSkgfHwgdHlwZXMuaGFzKGtleSkpKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSB0aGlzLnByZWZpeCArIFwiLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvYmpOYW1lID09PSBTYXNzVmFycy5tZXRhLmRhdGFQcmVmaXhUeXBlKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSBcImRhdGEtXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NFeHBvcnRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXNOYW1lc3BhY2UgPSBgY29tLmptYXJpbmVyLiR7dGhpcy5wcmVmaXh9YDtcclxuXHJcblx0Y2FudmFzID0ge1xyXG5cdFx0c2VsZWN0b3I6IHtcclxuXHRcdFx0bW9kdWxlOiBcImRpdi5jb250ZXh0X21vZHVsZVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbTogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtczogXCJ1bC5jb250ZXh0X21vZHVsZV9pdGVtc1wiLFxyXG5cdFx0XHRzdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlclwiLFxyXG5cdFx0XHRub3Rfc3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW06bm90KC5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyKVwiLFxyXG5cdFx0XHRuYXZfdGFiczogXCJ1bCNzZWN0aW9uLXRhYnNcIlxyXG5cdFx0fSxcclxuXHRcdGFwaToge1xyXG5cdFx0XHRuYW1lc3BhY2U6IHRoaXMuX2NhbnZhc05hbWVzcGFjZSxcclxuXHRcdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIixcclxuXHRcdFx0cGVyX3BhZ2U6IDEwMCxcclxuXHRcdFx0dXJsczoge1xyXG5cdFx0XHRcdGN1c3RvbV9kYXRhOiBgdXNlcnMvc2VsZi9jdXN0b21fZGF0YXtkYXRhUGF0aH0/bnM9JHt0aGlzLl9jYW52YXNOYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5jb25zdCBWQVJTID0gbmV3IFZhcnMoKTtcclxuZXhwb3J0IGNvbnN0IFYgPSBWQVJTO1xyXG5leHBvcnQgZGVmYXVsdCBWQVJTLnNhc3NFeHBvcnRzO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdmFycy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRjb25zdCB0b2tlbkVsID0gJChcIiN0b2tlblwiKTtcclxuXHRjb25zdCBzdGF0dXNFbCA9ICQoXCIjc3RhdHVzXCIpO1xyXG5cdGNvbnN0IHNhdmVFbCA9ICQoXCIjc2F2ZVwiKTtcclxuXHJcblx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoVi5taXNjLnRva2VuX2tleSwgZGF0YSA9PiB7XHJcblx0XHRpZiAoZGF0YVtWLm1pc2MudG9rZW5fa2V5XSlcclxuXHRcdFx0dG9rZW5FbC52YWwoZGF0YVtWLm1pc2MudG9rZW5fa2V5XSk7XHJcblx0fSk7XHJcblxyXG5cdHNhdmVFbC5jbGljaygoKSA9PiB7XHJcblx0XHRjb25zdCB0b2tlbiA9IHRva2VuRWwudmFsKCk7XHJcblxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG5cdFx0XHRbVi5taXNjLnRva2VuX2tleV06IHRva2VuXHJcblx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHN0YXR1c0VsLnRleHQoXCJBY2Nlc3MgdG9rZW4gc2F2ZWRcIik7XHJcblx0XHRcdFx0c2V0VGltZW91dCh3aW5kb3cuY2xvc2UsIDUwMCk7XHJcblxyXG5cdFx0XHRcdC8vIFRPRE8gdXBkYXRlIHRoZSBjdXJyZW50IGNhbnZhcyBwYWdlcyB3aXRoIHRoZSBhY2Nlc3MgdG9rZW5cclxuXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy9vcHRpb25zLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==