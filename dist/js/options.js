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
        this.sassJson = JSON.stringify(this);
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

/* unused harmony default export */ var _unused_webpack_default_export = (VARS.sassJson);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzU3YzExZTBhMjAzY2NlYmZiMDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtJQW1HQztRQWpHQSxXQUFNLEdBQUcsY0FBYyxDQUFDO1FBRXhCLGFBQVEsR0FBRztZQUNWLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxhQUFhO1lBQzFCLEtBQUssRUFBRSxZQUFZO1lBQ25CLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsUUFBUTtZQUNyQixXQUFXLEVBQUUsVUFBVTtZQUN2QixhQUFhLEVBQUUsZUFBZTtZQUM5QixTQUFTLEVBQUUsV0FBVztZQUN0QixTQUFTLEVBQUUsV0FBVztZQUN0QixLQUFLLEVBQUUsT0FBTztZQUNkLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFlBQVksRUFBRSxTQUFTO1lBRXZCLFlBQVksRUFBRSxjQUFjO1lBQzVCLGVBQWUsRUFBRSxnQkFB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QUFDO0FBRUosQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDc1N2MxMWUwYTIwM2NjZWJmYjA3IiwiY2xhc3MgU2Fzc1ZhcnMge1xyXG5cclxuXHRwcmVmaXggPSBcImJldHRlckNhbnZhc1wiO1xyXG5cclxuXHRjc3NDbGFzcyA9IHtcclxuXHRcdGFjdGl2ZTogXCJhY3RpdmVcIixcclxuXHRcdGNoZWNrYm94X3BhcmVudDogXCJjaGVja2JveC1wYXJlbnRcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrZWQ6IFwiY2hlY2tib3gtY2hlY2tlZFwiLFxyXG5cdFx0Y2hlY2tib3hfdGQ6IFwiY2hlY2tib3gtdGRcIixcclxuXHRcdGZsYXNoOiBcImFuaW0tZmxhc2hcIixcclxuXHRcdGNvdXJzZV9saW5rX3RleHQ6IFwiY291cnNlLWxpbmstdGV4dFwiLFxyXG5cdFx0aXRlbV9oaWRkZW46IFwiaGlkZGVuXCIsXHJcblx0XHRoaWRlX2J1dHRvbjogXCJidG4taGlkZVwiLFxyXG5cdFx0aGlkZV9kaXNhYmxlZDogXCJoaWRlLWRpc2FibGVkXCIsXHJcblx0XHR0b2NfcmF0aW86IFwidG9jLXJhdGlvXCIsXHJcblx0XHR0b2NfdGl0bGU6IFwidG9jLXRpdGxlXCIsXHJcblx0XHRmaXhlZDogXCJmaXhlZFwiLFxyXG5cdFx0aXRlbV9pY29uOiBcImljb24td3JhcHBlclwiLFxyXG5cdFx0ZG93bmxvYWQ6IFwiZG93bmxvYWQtYnRuXCIsXHJcblx0XHRleHRlcm5hbF91cmw6IFwidXJsLWJ0blwiLFxyXG5cclxuXHRcdHBvcHVwX2xvYWRlZDogXCJkb25lLWxvYWRpbmdcIixcclxuXHRcdHBvcHVwX2Nvbm5lY3RlZDogXCJwYWdlLWNvbm5lY3RlZFwiLFxyXG5cdFx0cG9wdXBfcmVxdWlyZV9wYWdlOiBcInJlcXVpcmUtcGFnZVwiXHJcblx0fTtcclxuXHJcblx0ZGF0YUF0dHIgPSB7XHJcblx0XHR0b2NfbW9kdWxlX2lkOiBcInRvYy1tb2R1bGUtaWRcIixcclxuXHRcdHRvY190b3RhbDogXCJ0b2MtdG90YWxcIixcclxuXHRcdHRvY19jaGVja2VkX2NvdW50OiBcInRvYy1jaGVja2VkLWNvdW50XCIsXHJcblx0XHR0b2NfcGVyY2VudGFnZTogXCJ0b2MtcGVyY2VudGFnZVwiLFxyXG5cdFx0bW9kX2l0ZW1faWQ6IFwiaXRlbS1pZFwiLFxyXG5cdFx0Y291cnNlX25hbWU6IFwiY291cnNlLW5hbWVcIixcclxuXHRcdGNvdXJzZV9jb2RlOiBcImNvdXJzZS1jb2RlXCIsXHJcblx0XHRkZWZfaW5kZW50OiBcImRlZmF1bHQtaW5kZW50XCJcclxuXHR9O1xyXG5cclxuXHRpZCA9IHtcclxuXHRcdHRvYzogXCJ0b2NcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcImp1bXAtdG8tdG9wXCIsXHJcblxyXG5cdFx0cG9wdXBfcGFnZV9taXNzaW5nOiBcInBhZ2UtbWlzc2luZy1lcnJvclwiLFxyXG5cdFx0cG9wdXBfZXhfbmFtZTogXCJleHRlbnNpb24tbmFtZVwiLFxyXG5cdFx0cG9wdXBfaW5zZXJ0aW9uX3BvaW50OiBcImluc2VydGlvbi1wb2ludFwiLFxyXG5cdFx0cG9wdXBfanVtcF9idXR0b246IFwianVtcC10b1wiXHJcblx0fTtcclxuXHJcblx0Y29sb3IgPSB7XHJcblx0XHR0b2NfZmlsbDogXCJyZ2JhKDAsIDI1NSwgMCwgLjc1KVwiLFxyXG5cdFx0dG9jX2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdHRvY190aXRsZTogXCJ2YXIoLS1pYy1icmFuZC1wcmltYXJ5KVwiLCAvLyB3YXMgXCJyZ2IoNTcsIDc1LCA4OClcIixcclxuXHRcdGNoZWNrYm94X2NoZWNrOiBcInJnYigyMiwgMTYwLCAxMzMpXCIsXHJcblx0XHRjaGVja2JveF9ib3JkZXI6IFwicmdiKDEwMiwgMTIwLCAxMzUpXCIsXHJcblx0XHRoaWdobGlnaHRfb3JhbmdlOiBcInJnYigyNTUsIDE1MiwgMClcIixcclxuXHRcdGhpZ2hsaWdodF9yZWQ6IFwicmdiKDI1NSwgMCwgMClcIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcInJnYig1NywgNzUsIDg4KVwiXHJcblx0fTtcclxuXHJcblx0dWkgPSB7XHJcblx0XHR0b3BfaW5zaWRlX3JhdGlvOiAwLjA1LFxyXG5cdFx0c2Nyb2xsX3RvcF9vZmZzZXQ6IDUsXHJcblx0XHRqdW1wX3RvcF9jdXRvZmY6IDEwMCxcclxuXHRcdHRvY190b3BfbWFyZ2luOiAzMixcclxuXHRcdHNjcm9sbF90aW1lOiA1MDAsXHJcblx0XHRmYWRlX3RpbWU6IDUwMCxcclxuXHRcdHN1YmhlYWRlcl9pbmRlbnQ6IDAsXHJcblx0XHRtYWluX2luZGVudDogMVxyXG5cdH07XHJcblxyXG5cdHN0YXRlID0ge1xyXG5cdFx0c2hvd19oaWRkZW46IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwic2hvdy1oaWRkZW5cIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiU2hvdyBoaWRkZW4gaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZGVfY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJoaWRlLWNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiSGlkZSBjb21wbGV0ZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGhpZ2hsaWdodF91bmNoZWNrZWQ6IHtcclxuXHRcdFx0Y3NzQ2xhc3M6IFwibWFyay11bmNoZWNrZWRcIixcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIiwgXCJncmFkZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiTWFyayB1bmNoZWNrZWQgaXRlbXNcIlxyXG5cdFx0fSxcclxuXHRcdGRpc2FibGVfaW5kZW50X292ZXJyaWRlOiB7XHJcblx0XHRcdHBhZ2VzOiBbXCJtb2R1bGVzXCJdLFxyXG5cdFx0XHRkZXNjOiBcIkRpc2FibGUgaW5kZW50IG92ZXJyaWRlc1wiXHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2Fzc0pzb246IHN0cmluZztcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbWV0YSA9IHtcclxuXHRcdGRhdGFQcmVmaXhUeXBlOiBcImRhdGFBdHRyXCIsXHJcblx0XHRwcmVmaXhUeXBlczogW1wiY3NzQ2xhc3NcIiwgXCJkYXRhQXR0clwiLCBcImlkXCJdLFxyXG5cdFx0cHJlZml4RXhjbHVkZTogW1wicG9wdXBfLitcIl1cclxuXHR9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRjb25zdCB0eXBlcyA9IG5ldyBTZXQoU2Fzc1ZhcnMubWV0YS5wcmVmaXhUeXBlcyk7XHJcblxyXG5cdFx0Y29uc3QgcHJvY2Vzc09iamVjdCA9IChvYmo6IG9iamVjdCwgb2JqTmFtZTogc3RyaW5nKSA9PiB7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcclxuXHRcdFx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IHZhbDogb2JqZWN0IHwgc3RyaW5nIHwgbnVtYmVyID0gb2JqW2tleV07XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG5cdFx0XHRcdFx0cHJvY2Vzc09iamVjdCh2YWwsIGtleSk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc3QgZXhjbHVkZWQgPSBTYXNzVmFycy5tZXRhLnByZWZpeEV4Y2x1ZGVcclxuXHRcdFx0XHRcdFx0Lm1hcChzdHIgPT4gbmV3IFJlZ0V4cChcIl5cIiArIHN0ciArIFwiJFwiKSlcclxuXHRcdFx0XHRcdFx0LnNvbWUocmVnZXggPT4gcmVnZXgudGVzdChrZXkpKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVkICYmICh0eXBlcy5oYXMob2JqTmFtZSkgfHwgdHlwZXMuaGFzKGtleSkpKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSB0aGlzLnByZWZpeCArIFwiLVwiICsgdmFsO1xyXG5cclxuXHRcdFx0XHRcdGlmIChvYmpOYW1lID09PSBTYXNzVmFycy5tZXRhLmRhdGFQcmVmaXhUeXBlKVxyXG5cdFx0XHRcdFx0XHR2YWwgPSBcImRhdGEtXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0b2JqW2tleV0gPSB2YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRwcm9jZXNzT2JqZWN0KHRoaXMsIFwicm9vdFwiKTtcclxuXHJcblx0XHR0aGlzLnNhc3NKc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcyk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgVmFycyBleHRlbmRzIFNhc3NWYXJzIHtcclxuXHJcblx0dG9vbHRpcCA9IHtcclxuXHRcdG1hcmtfY29tcGxldGU6IFwiTWFyayBhcyBjb21wbGV0ZWRcIixcclxuXHRcdG1hcmtfaW5jb21wbGV0ZTogXCJNYXJrIGFzIGluY29tcGxldGVcIixcclxuXHRcdGhpZGU6IFwiSGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdHVuaGlkZTogXCJVbmhpZGUgdGhpcyBpdGVtXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcIkNhbm5vdCBoaWRlIGdyYWRlZCBpdGVtXCIsXHJcblx0XHRqdW1wX2J1dHRvbjogXCJKdW1wIHRvIHRvcFwiLFxyXG5cdFx0d2FpdGluZzogXCJXYWl0aW5nLi4uXCIsXHJcblx0XHRkb3dubG9hZDogXCJEb3dubG9hZCBmaWxlOiBcXFwie2ZpbGVuYW1lfVxcXCJcIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJWaXNpdCBleHRlcm5hbCBVUkxcIixcclxuXHRcdGhhc19zdWJtaXNzaW9uOiBcIkFzc2lnbm1lbnQgaGFzIHN1Ym1pc3Npb25cIixcclxuXHRcdHBvcHVwX25vX3VuY2hlY2tlZDogXCJObyB1bmNoZWNrZWQgaXRlbXMgdG8ganVtcCB0b1wiXHJcblx0fTtcclxuXHJcblx0bWlzYyA9IHtcclxuXHRcdHRvY19iYWNrZ3JvdW5kOiBgLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgJHt0aGlzLmNvbG9yLnRvY19maWxsfSB7cGVyY2VudH0lLCB0cmFuc3BhcmVudCB7cGVyY2VudH0lKWAsXHJcblx0XHR0b2tlbl9rZXk6IFwiYWNjZXNzVG9rZW5cIlxyXG5cdH07XHJcblxyXG5cdGVsZW1lbnQgPSB7XHJcblxyXG5cdFx0Y2hlY2tib3g6XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5jaGVja2JveF9wYXJlbnR9Jz5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPSdjaGVja2JveCcgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGRvd25sb2FkX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmRvd25sb2FkfScgdGl0bGU9JyR7dGhpcy50b29sdGlwLmRvd25sb2FkfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2ZpbGVfdXJsfVwiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHVybF9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5leHRlcm5hbF91cmx9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZXh0ZXJuYWxfdXJsfSc+XHJcblx0XHRcdFx0XHQ8YSBocmVmPVwie2V4dGVybmFsX3VybH1cIiBjbGFzcz1cIm5vdF9leHRlcm5hbFwiIHRhcmdldD1cIl9ibGFua1wiPjwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdGhpZGVfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaGlkZV9idXR0b259Jz5cclxuXHRcdFx0XHRcdDxpICR7dGhpcy5kYXRhQXR0ci5tb2RfaXRlbV9pZH09J3tpdGVtX2lkfSc+PC9pPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0Y291cnNlX2xpbms6XHJcblx0XHRcdGA8bGkgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn0nIGNsYXNzPSdtZW51LWl0ZW0gaWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWl0ZW0nPlxyXG5cdFx0XHRcdDxhIGhyZWY9Jy9jb3Vyc2VzL3t0YWJJRH0vbW9kdWxlcycgY2xhc3M9J2ljLWFwcC1oZWFkZXJfX21lbnUtbGlzdC1saW5rJz5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9J21lbnUtaXRlbS1pY29uLWNvbnRhaW5lcicgYXJpYS1oaWRkZW49J3RydWUnPjxpPjwvaT48L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6IHt0YWJDb2xvcn07IGJvcmRlci1yaWdodC1jb2xvcjoge3RhYkNvbG9yfSdcclxuXHRcdFx0XHRcdFx0XHQke3RoaXMuZGF0YUF0dHIuY291cnNlX25hbWV9PSd7bmFtZX0nICR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfY29kZX09J3tjb2RlfSdcclxuXHRcdFx0XHRcdFx0XHRjbGFzcz0nbWVudS1pdGVtX190ZXh0ICR7dGhpcy5jc3NDbGFzcy5jb3Vyc2VfbGlua190ZXh0fSc+PC9kaXY+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2xpPmAsXHJcblxyXG5cdFx0dG9jOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLnRvY30nIGNsYXNzPSdpYy1hcHAtY291cnNlLW1lbnUgbGlzdC12aWV3Jz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3RpdGxlfSc+VGFibGUgb2YgQ29udGVudHM8L2Rpdj5cclxuXHRcdFx0XHQ8bmF2Pjx1bD48L3VsPjwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHRvY19pdGVtOlxyXG5cdFx0XHRgPGxpPlxyXG5cdFx0XHRcdDxhIGhyZWY9JyMnIHRpdGxlPSd7aXRlbV9uYW1lfSc+XHJcblx0XHRcdFx0XHR7aXRlbV9uYW1lfVxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLnRvY19yYXRpb30nICR7dGhpcy5kYXRhQXR0ci50b2NfbW9kdWxlX2lkfT0ne2l0ZW1faWR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHRqdW1wX2J1dHRvbjpcclxuXHRcdFx0YDxkaXYgaWQ9JyR7dGhpcy5pZC5qdW1wX2J1dHRvbn0nPlxyXG5cdFx0XHRcdDxpIHRpdGxlPScke3RoaXMudG9vbHRpcC5qdW1wX2J1dHRvbn0nPjwvaT5cclxuXHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRzdWJtaXNzaW9uX2ljb246XHJcblx0XHRcdGA8ZGl2IHRpdGxlPScke3RoaXMudG9vbHRpcC5oYXNfc3VibWlzc2lvbn0nIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuaXRlbV9pY29ufSc+XHJcblx0XHRcdFx0PGkgY2xhc3M9J2ljb24tcHVibGlzaCc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHBvcHVwX3N0YXRlX3N3aXRjaDpcclxuXHRcdFx0YDxkaXYgY2xhc3M9XCJzd2l0Y2ggJHt0aGlzLmNzc0NsYXNzLnBvcHVwX3JlcXVpcmVfcGFnZX1cIj5cclxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwie25hbWV9XCIgY2xhc3M9XCJtZGwtc3dpdGNoIG1kbC1qcy1zd2l0Y2ggbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwibWRsLXN3aXRjaF9fbGFiZWxcIj57ZGVzY308L3NwYW4+XHJcblx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJ7bmFtZX1cIiB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cIm1kbC1zd2l0Y2hfX2lucHV0XCI+XHJcblx0XHRcdFx0PC9sYWJlbD5cclxuXHRcdFx0PC9kaXY+YFxyXG5cdH07XHJcblxyXG5cdC8vIHNlcGFyYXRlZCBmb3IgdXNlIGluIHRlbXBsYXRlIHN0cmluZ3MgYmVsb3dcclxuXHRwcml2YXRlIF9jYW52YXNOYW1lc3BhY2UgPSBgY29tLmptYXJpbmVyLiR7dGhpcy5wcmVmaXh9YDtcclxuXHJcblx0Y2FudmFzID0ge1xyXG5cdFx0c2VsZWN0b3I6IHtcclxuXHRcdFx0bW9kdWxlOiBcImRpdi5jb250ZXh0X21vZHVsZVwiLFxyXG5cdFx0XHRtb2R1bGVfaXRlbTogXCJsaS5jb250ZXh0X21vZHVsZV9pdGVtXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtczogXCJ1bC5jb250ZXh0X21vZHVsZV9pdGVtc1wiLFxyXG5cdFx0XHRzdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfc3ViX2hlYWRlclwiLFxyXG5cdFx0XHRub3Rfc3ViaGVhZGVyOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW06bm90KC5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyKVwiLFxyXG5cdFx0XHRuYXZfdGFiczogXCJ1bCNzZWN0aW9uLXRhYnNcIlxyXG5cdFx0fSxcclxuXHRcdGFwaToge1xyXG5cdFx0XHRuYW1lc3BhY2U6IHRoaXMuX2NhbnZhc05hbWVzcGFjZSxcclxuXHRcdFx0cm9vdF91cmw6IFwiL2FwaS92MS9cIixcclxuXHRcdFx0cGVyX3BhZ2U6IDEwMCxcclxuXHRcdFx0dXJsczoge1xyXG5cdFx0XHRcdGN1c3RvbV9kYXRhOiBgdXNlcnMvc2VsZi9jdXN0b21fZGF0YXtkYXRhUGF0aH0/bnM9JHt0aGlzLl9jYW52YXNOYW1lc3BhY2V9YCxcclxuXHRcdFx0XHRmYXZvcml0ZV9jb3Vyc2VzOiBcInVzZXJzL3NlbGYvZmF2b3JpdGVzL2NvdXJzZXNcIixcclxuXHRcdFx0XHRjdXN0b21fY29sb3JzOiBcInVzZXJzL3NlbGYvY29sb3JzXCIsXHJcblx0XHRcdFx0YXNzaWdubWVudHM6IFwidXNlcnMvc2VsZi9jb3Vyc2VzL3tjb3Vyc2VJRH0vYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRtb2R1bGVzOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzXCIsXHJcblx0XHRcdFx0bW9kdWxlX2l0ZW1zOiBcImNvdXJzZXMve2NvdXJzZUlEfS9tb2R1bGVzL3ttb2R1bGVJRH0vaXRlbXNcIixcclxuXHRcdFx0XHRmaWxlX2RpcmVjdDogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vZmlsZXMve2ZpbGVJRH1cIixcclxuXHRcdFx0XHRuYXZpZ2F0aW9uX3RhYnM6IFwiY291cnNlcy97Y291cnNlSUR9L3RhYnNcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhX3VybHM6IHtcclxuXHRcdFx0XHRhY3RpdmVfc3RhdGVzOiBcImFjdGl2ZV9zdGF0ZXNcIixcclxuXHRcdFx0XHRjb21wbGV0ZWRfYXNzaWdubWVudHM6IFwiY29tcGxldGVkX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0aGlkZGVuX2Fzc2lnbm1lbnRzOiBcImhpZGRlbl9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdHRhYl9wb3NpdGlvbnM6IFwidGFiX3Bvc2l0aW9uc1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5jb25zdCBWQVJTID0gbmV3IFZhcnMoKTtcclxuZXhwb3J0IGNvbnN0IFYgPSBWQVJTO1xyXG5leHBvcnQgZGVmYXVsdCBWQVJTLnNhc3NKc29uO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvdmFycy50cyIsImltcG9ydCB7IFYgfSBmcm9tIFwiLi92YXJzXCI7XHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuXHRjb25zdCB0b2tlbkVsID0gJChcIiN0b2tlblwiKTtcclxuXHRjb25zdCBzdGF0dXNFbCA9ICQoXCIjc3RhdHVzXCIpO1xyXG5cdGNvbnN0IHNhdmVFbCA9ICQoXCIjc2F2ZVwiKTtcclxuXHJcblx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoVi5taXNjLnRva2VuX2tleSwgZGF0YSA9PiB7XHJcblx0XHRpZiAoZGF0YVtWLm1pc2MudG9rZW5fa2V5XSlcclxuXHRcdFx0dG9rZW5FbC52YWwoZGF0YVtWLm1pc2MudG9rZW5fa2V5XSk7XHJcblx0fSk7XHJcblxyXG5cdHNhdmVFbC5jbGljaygoKSA9PiB7XHJcblx0XHRjb25zdCB0b2tlbiA9IHRva2VuRWwudmFsKCk7XHJcblxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG5cdFx0XHRbVi5taXNjLnRva2VuX2tleV06IHRva2VuXHJcblx0XHR9LCAoKSA9PiB7XHJcblx0XHRcdGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHN0YXR1c0VsLnRleHQoXCJBY2Nlc3MgdG9rZW4gc2F2ZWRcIik7XHJcblx0XHRcdFx0c2V0VGltZW91dCh3aW5kb3cuY2xvc2UsIDUwMCk7XHJcblxyXG5cdFx0XHRcdC8vIFRPRE8gdXBkYXRlIHRoZSBjdXJyZW50IGNhbnZhcyBwYWdlcyB3aXRoIHRoZSBhY2Nlc3MgdG9rZW5cclxuXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9vcHRpb25zLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==