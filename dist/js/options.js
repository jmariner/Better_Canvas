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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTM4MDY0NzU2MmY1MDU3NTM4ZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzNEQTtJQW1HQztRQWpHQSxXQUFNLEdBQUcsY0FBYyxDQUFDO1FBRXhCLGFBQVEsR0FBRztZQUNWLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsZ0JBQWdCLEVBQUUsa0JBQWtCO1lBQ3BDLFdBQVcsRUFBRSxhQUFhO1lBQzFCLEtBQUssRUFBRSxZQUFZO1lBQ25CLGdCQUFnQixFQUFFLGtCQUFrQjtZQUNwQyxXQUFXLEVBQUUsUUFBUTtZQUNyQixXQUFXLEVBQUUsVUFBVTtZQUN2QixhQUFhLEVBQUUsZUFBZTtZQUM5QixTQUFTLEVBQUUsV0FBVztZQUN0QixTQUFTLEVBQUUsV0FBVztZQUN0QixLQUFLLEVBQUUsT0FBTztZQUNkLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFlBQVksRUFBRSxTQUFTO1lBRXZCLFlBQVksRUFBRSxjQUFjO1lBQzVCLGVBQWUsRUFBRSxnQkFB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QUFDO0FBRUosQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDkzODA2NDc1NjJmNTA1NzUzOGYwIiwiaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XHJcblxyXG5jbGFzcyBTYXNzVmFycyB7XHJcblxyXG5cdHByZWZpeCA9IFwiYmV0dGVyQ2FudmFzXCI7XHJcblxyXG5cdGNzc0NsYXNzID0ge1xyXG5cdFx0YWN0aXZlOiBcImFjdGl2ZVwiLFxyXG5cdFx0Y2hlY2tib3hfcGFyZW50OiBcImNoZWNrYm94LXBhcmVudFwiLFxyXG5cdFx0Y2hlY2tib3hfY2hlY2tlZDogXCJjaGVja2JveC1jaGVja2VkXCIsXHJcblx0XHRjaGVja2JveF90ZDogXCJjaGVja2JveC10ZFwiLFxyXG5cdFx0Zmxhc2g6IFwiYW5pbS1mbGFzaFwiLFxyXG5cdFx0Y291cnNlX2xpbmtfdGV4dDogXCJjb3Vyc2UtbGluay10ZXh0XCIsXHJcblx0XHRpdGVtX2hpZGRlbjogXCJoaWRkZW5cIixcclxuXHRcdGhpZGVfYnV0dG9uOiBcImJ0bi1oaWRlXCIsXHJcblx0XHRoaWRlX2Rpc2FibGVkOiBcImhpZGUtZGlzYWJsZWRcIixcclxuXHRcdHRvY19yYXRpbzogXCJ0b2MtcmF0aW9cIixcclxuXHRcdHRvY190aXRsZTogXCJ0b2MtdGl0bGVcIixcclxuXHRcdGZpeGVkOiBcImZpeGVkXCIsXHJcblx0XHRpdGVtX2ljb246IFwiaWNvbi13cmFwcGVyXCIsXHJcblx0XHRkb3dubG9hZDogXCJkb3dubG9hZC1idG5cIixcclxuXHRcdGV4dGVybmFsX3VybDogXCJ1cmwtYnRuXCIsXHJcblxyXG5cdFx0cG9wdXBfbG9hZGVkOiBcImRvbmUtbG9hZGluZ1wiLFxyXG5cdFx0cG9wdXBfY29ubmVjdGVkOiBcInBhZ2UtY29ubmVjdGVkXCIsXHJcblx0XHRwb3B1cF9yZXF1aXJlX3BhZ2U6IFwicmVxdWlyZS1wYWdlXCJcclxuXHR9O1xyXG5cclxuXHRkYXRhQXR0ciA9IHtcclxuXHRcdHRvY19tb2R1bGVfaWQ6IFwidG9jLW1vZHVsZS1pZFwiLFxyXG5cdFx0dG9jX3RvdGFsOiBcInRvYy10b3RhbFwiLFxyXG5cdFx0dG9jX2NoZWNrZWRfY291bnQ6IFwidG9jLWNoZWNrZWQtY291bnRcIixcclxuXHRcdHRvY19wZXJjZW50YWdlOiBcInRvYy1wZXJjZW50YWdlXCIsXHJcblx0XHRtb2RfaXRlbV9pZDogXCJpdGVtLWlkXCIsXHJcblx0XHRjb3Vyc2VfbmFtZTogXCJjb3Vyc2UtbmFtZVwiLFxyXG5cdFx0Y291cnNlX2NvZGU6IFwiY291cnNlLWNvZGVcIixcclxuXHRcdGRlZl9pbmRlbnQ6IFwiZGVmYXVsdC1pbmRlbnRcIlxyXG5cdH07XHJcblxyXG5cdGlkID0ge1xyXG5cdFx0dG9jOiBcInRvY1wiLFxyXG5cdFx0anVtcF9idXR0b246IFwianVtcC10by10b3BcIixcclxuXHJcblx0XHRwb3B1cF9wYWdlX21pc3Npbmc6IFwicGFnZS1taXNzaW5nLWVycm9yXCIsXHJcblx0XHRwb3B1cF9leF9uYW1lOiBcImV4dGVuc2lvbi1uYW1lXCIsXHJcblx0XHRwb3B1cF9pbnNlcnRpb25fcG9pbnQ6IFwiaW5zZXJ0aW9uLXBvaW50XCIsXHJcblx0XHRwb3B1cF9qdW1wX2J1dHRvbjogXCJqdW1wLXRvXCJcclxuXHR9O1xyXG5cclxuXHRjb2xvciA9IHtcclxuXHRcdHRvY19maWxsOiBcInJnYmEoMCwgMjU1LCAwLCAuNzUpXCIsXHJcblx0XHR0b2NfYm9yZGVyOiBcInJnYigxMDIsIDEyMCwgMTM1KVwiLFxyXG5cdFx0dG9jX3RpdGxlOiBcInZhcigtLWljLWJyYW5kLXByaW1hcnkpXCIsIC8vIHdhcyBcInJnYig1NywgNzUsIDg4KVwiLFxyXG5cdFx0Y2hlY2tib3hfY2hlY2s6IFwicmdiKDIyLCAxNjAsIDEzMylcIixcclxuXHRcdGNoZWNrYm94X2JvcmRlcjogXCJyZ2IoMTAyLCAxMjAsIDEzNSlcIixcclxuXHRcdGhpZ2hsaWdodF9vcmFuZ2U6IFwicmdiKDI1NSwgMTUyLCAwKVwiLFxyXG5cdFx0aGlnaGxpZ2h0X3JlZDogXCJyZ2IoMjU1LCAwLCAwKVwiLFxyXG5cdFx0anVtcF9idXR0b246IFwicmdiKDU3LCA3NSwgODgpXCJcclxuXHR9O1xyXG5cclxuXHR1aSA9IHtcclxuXHRcdHRvcF9pbnNpZGVfcmF0aW86IDAuMDUsXHJcblx0XHRzY3JvbGxfdG9wX29mZnNldDogNSxcclxuXHRcdGp1bXBfdG9wX2N1dG9mZjogMTAwLFxyXG5cdFx0dG9jX3RvcF9tYXJnaW46IDMyLFxyXG5cdFx0c2Nyb2xsX3RpbWU6IDUwMCxcclxuXHRcdGZhZGVfdGltZTogNTAwLFxyXG5cdFx0c3ViaGVhZGVyX2luZGVudDogMCxcclxuXHRcdG1haW5faW5kZW50OiAxXHJcblx0fTtcclxuXHJcblx0c3RhdGUgPSB7XHJcblx0XHRzaG93X2hpZGRlbjoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJzaG93LWhpZGRlblwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJTaG93IGhpZGRlbiBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0aGlkZV9jaGVja2VkOiB7XHJcblx0XHRcdGNzc0NsYXNzOiBcImhpZGUtY2hlY2tlZFwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiLCBcImdyYWRlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJIaWRlIGNvbXBsZXRlZCBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0aGlnaGxpZ2h0X3VuY2hlY2tlZDoge1xyXG5cdFx0XHRjc3NDbGFzczogXCJtYXJrLXVuY2hlY2tlZFwiLFxyXG5cdFx0XHRwYWdlczogW1wibW9kdWxlc1wiLCBcImdyYWRlc1wiXSxcclxuXHRcdFx0ZGVzYzogXCJNYXJrIHVuY2hlY2tlZCBpdGVtc1wiXHJcblx0XHR9LFxyXG5cdFx0ZGlzYWJsZV9pbmRlbnRfb3ZlcnJpZGU6IHtcclxuXHRcdFx0cGFnZXM6IFtcIm1vZHVsZXNcIl0sXHJcblx0XHRcdGRlc2M6IFwiRGlzYWJsZSBpbmRlbnQgb3ZlcnJpZGVzXCJcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzYXNzSnNvbjogc3RyaW5nO1xyXG5cclxuXHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBtZXRhID0ge1xyXG5cdFx0ZGF0YVByZWZpeFR5cGU6IFwiZGF0YUF0dHJcIixcclxuXHRcdHByZWZpeFR5cGVzOiBbXCJjc3NDbGFzc1wiLCBcImRhdGFBdHRyXCIsIFwiaWRcIl0sXHJcblx0XHRwcmVmaXhFeGNsdWRlOiBbXCJwb3B1cF8uK1wiXVxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdGNvbnN0IHR5cGVzID0gbmV3IFNldChTYXNzVmFycy5tZXRhLnByZWZpeFR5cGVzKTtcclxuXHJcblx0XHRjb25zdCBwcm9jZXNzT2JqZWN0ID0gKG9iajogb2JqZWN0LCBvYmpOYW1lOiBzdHJpbmcpID0+IHtcclxuXHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0XHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgdmFsOiBvYmplY3QgfCBzdHJpbmcgfCBudW1iZXIgPSBvYmpba2V5XTtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcblx0XHRcdFx0XHRwcm9jZXNzT2JqZWN0KHZhbCwga2V5KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcclxuXHJcblx0XHRcdFx0XHRjb25zdCBleGNsdWRlZCA9IFNhc3NWYXJzLm1ldGEucHJlZml4RXhjbHVkZVxyXG5cdFx0XHRcdFx0XHQubWFwKHN0ciA9PiBuZXcgUmVnRXhwKFwiXlwiICsgc3RyICsgXCIkXCIpKVxyXG5cdFx0XHRcdFx0XHQuc29tZShyZWdleCA9PiByZWdleC50ZXN0KGtleSkpO1xyXG5cclxuXHRcdFx0XHRcdGlmICghZXhjbHVkZWQgJiYgKHR5cGVzLmhhcyhvYmpOYW1lKSB8fCB0eXBlcy5oYXMoa2V5KSkpXHJcblx0XHRcdFx0XHRcdHZhbCA9IHRoaXMucHJlZml4ICsgXCItXCIgKyB2YWw7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG9iak5hbWUgPT09IFNhc3NWYXJzLm1ldGEuZGF0YVByZWZpeFR5cGUpXHJcblx0XHRcdFx0XHRcdHZhbCA9IFwiZGF0YS1cIiArIHZhbDtcclxuXHJcblx0XHRcdFx0XHRvYmpba2V5XSA9IHZhbDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdHByb2Nlc3NPYmplY3QodGhpcywgXCJyb290XCIpO1xyXG5cclxuXHRcdHRoaXMuc2Fzc0pzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzKTtcclxuXHR9XHJcblxyXG59XHJcblxyXG5jbGFzcyBWYXJzIGV4dGVuZHMgU2Fzc1ZhcnMge1xyXG5cclxuXHR0b29sdGlwID0ge1xyXG5cdFx0bWFya19jb21wbGV0ZTogXCJNYXJrIGFzIGNvbXBsZXRlZFwiLFxyXG5cdFx0bWFya19pbmNvbXBsZXRlOiBcIk1hcmsgYXMgaW5jb21wbGV0ZVwiLFxyXG5cdFx0aGlkZTogXCJIaWRlIHRoaXMgaXRlbVwiLFxyXG5cdFx0dW5oaWRlOiBcIlVuaGlkZSB0aGlzIGl0ZW1cIixcclxuXHRcdGhpZGVfZGlzYWJsZWQ6IFwiQ2Fubm90IGhpZGUgZ3JhZGVkIGl0ZW1cIixcclxuXHRcdGp1bXBfYnV0dG9uOiBcIkp1bXAgdG8gdG9wXCIsXHJcblx0XHR3YWl0aW5nOiBcIldhaXRpbmcuLi5cIixcclxuXHRcdGRvd25sb2FkOiBcIkRvd25sb2FkIGZpbGU6IFxcXCJ7ZmlsZW5hbWV9XFxcIlwiLFxyXG5cdFx0ZXh0ZXJuYWxfdXJsOiBcIlZpc2l0IGV4dGVybmFsIFVSTFwiLFxyXG5cdFx0aGFzX3N1Ym1pc3Npb246IFwiQXNzaWdubWVudCBoYXMgc3VibWlzc2lvblwiLFxyXG5cdFx0cG9wdXBfbm9fdW5jaGVja2VkOiBcIk5vIHVuY2hlY2tlZCBpdGVtcyB0byBqdW1wIHRvXCJcclxuXHR9O1xyXG5cclxuXHRtaXNjID0ge1xyXG5cdFx0dG9jX2JhY2tncm91bmQ6IGAtd2Via2l0LWxpbmVhci1ncmFkaWVudChsZWZ0LCAke3RoaXMuY29sb3IudG9jX2ZpbGx9IHtwZXJjZW50fSUsIHRyYW5zcGFyZW50IHtwZXJjZW50fSUpYCxcclxuXHRcdHRva2VuX2tleTogXCJhY2Nlc3NUb2tlblwiXHJcblx0fTtcclxuXHJcblx0ZWxlbWVudCA9IHtcclxuXHJcblx0XHRjaGVja2JveDpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmNoZWNrYm94X3BhcmVudH0nPlxyXG5cdFx0XHRcdFx0PGlucHV0IHR5cGU9J2NoZWNrYm94JyAke3RoaXMuZGF0YUF0dHIubW9kX2l0ZW1faWR9PSd7aXRlbV9pZH0nPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0ZG93bmxvYWRfYnV0dG9uOlxyXG5cdFx0XHRcdGA8ZGl2IHN0eWxlPSdkaXNwbGF5Om5vbmUnIGNsYXNzPScke3RoaXMuY3NzQ2xhc3MuZG93bmxvYWR9JyB0aXRsZT0nJHt0aGlzLnRvb2x0aXAuZG93bmxvYWR9Jz5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCJ7ZmlsZV91cmx9XCI+PC9hPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0dXJsX2J1dHRvbjpcclxuXHRcdFx0XHRgPGRpdiBzdHlsZT0nZGlzcGxheTpub25lJyBjbGFzcz0nJHt0aGlzLmNzc0NsYXNzLmV4dGVybmFsX3VybH0nIHRpdGxlPScke3RoaXMudG9vbHRpcC5leHRlcm5hbF91cmx9Jz5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCJ7ZXh0ZXJuYWxfdXJsfVwiIGNsYXNzPVwibm90X2V4dGVybmFsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PC9hPlxyXG5cdFx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0aGlkZV9idXR0b246XHJcblx0XHRcdFx0YDxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5oaWRlX2J1dHRvbn0nPlxyXG5cdFx0XHRcdFx0PGkgJHt0aGlzLmRhdGFBdHRyLm1vZF9pdGVtX2lkfT0ne2l0ZW1faWR9Jz48L2k+XHJcblx0XHRcdFx0PC9kaXY+YCxcclxuXHJcblx0XHRjb3Vyc2VfbGluazpcclxuXHRcdFx0YDxsaSBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjoge3RhYkNvbG9yfScgY2xhc3M9J21lbnUtaXRlbSBpYy1hcHAtaGVhZGVyX19tZW51LWxpc3QtaXRlbSc+XHJcblx0XHRcdFx0PGEgaHJlZj0nL2NvdXJzZXMve3RhYklEfS9tb2R1bGVzJyBjbGFzcz0naWMtYXBwLWhlYWRlcl9fbWVudS1saXN0LWxpbmsnPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz0nbWVudS1pdGVtLWljb24tY29udGFpbmVyJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PGk+PC9pPjwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjoge3RhYkNvbG9yfTsgYm9yZGVyLXJpZ2h0LWNvbG9yOiB7dGFiQ29sb3J9J1xyXG5cdFx0XHRcdFx0XHRcdCR7dGhpcy5kYXRhQXR0ci5jb3Vyc2VfbmFtZX09J3tuYW1lfScgJHt0aGlzLmRhdGFBdHRyLmNvdXJzZV9jb2RlfT0ne2NvZGV9J1xyXG5cdFx0XHRcdFx0XHRcdGNsYXNzPSdtZW51LWl0ZW1fX3RleHQgJHt0aGlzLmNzc0NsYXNzLmNvdXJzZV9saW5rX3RleHR9Jz48L2Rpdj5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdDwvbGk+YCxcclxuXHJcblx0XHR0b2M6XHJcblx0XHRcdGA8ZGl2IGlkPScke3RoaXMuaWQudG9jfScgY2xhc3M9J2ljLWFwcC1jb3Vyc2UtbWVudSBsaXN0LXZpZXcnPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy50b2NfdGl0bGV9Jz5UYWJsZSBvZiBDb250ZW50czwvZGl2PlxyXG5cdFx0XHRcdDxuYXY+PHVsPjwvdWw+PC9uYXY+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0dG9jX2l0ZW06XHJcblx0XHRcdGA8bGk+XHJcblx0XHRcdFx0PGEgaHJlZj0nIycgdGl0bGU9J3tpdGVtX25hbWV9Jz5cclxuXHRcdFx0XHRcdHtpdGVtX25hbWV9XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPScke3RoaXMuY3NzQ2xhc3MudG9jX3JhdGlvfScgJHt0aGlzLmRhdGFBdHRyLnRvY19tb2R1bGVfaWR9PSd7aXRlbV9pZH0nPjwvZGl2PlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0PC9saT5gLFxyXG5cclxuXHRcdGp1bXBfYnV0dG9uOlxyXG5cdFx0XHRgPGRpdiBpZD0nJHt0aGlzLmlkLmp1bXBfYnV0dG9ufSc+XHJcblx0XHRcdFx0PGkgdGl0bGU9JyR7dGhpcy50b29sdGlwLmp1bXBfYnV0dG9ufSc+PC9pPlxyXG5cdFx0XHQ8L2Rpdj5gLFxyXG5cclxuXHRcdHN1Ym1pc3Npb25faWNvbjpcclxuXHRcdFx0YDxkaXYgdGl0bGU9JyR7dGhpcy50b29sdGlwLmhhc19zdWJtaXNzaW9ufScgY2xhc3M9JyR7dGhpcy5jc3NDbGFzcy5pdGVtX2ljb259Jz5cclxuXHRcdFx0XHQ8aSBjbGFzcz0naWNvbi1wdWJsaXNoJz48L2k+XHJcblx0XHRcdDwvZGl2PmAsXHJcblxyXG5cdFx0cG9wdXBfc3RhdGVfc3dpdGNoOlxyXG5cdFx0XHRgPGRpdiBjbGFzcz1cInN3aXRjaCAke3RoaXMuY3NzQ2xhc3MucG9wdXBfcmVxdWlyZV9wYWdlfVwiPlxyXG5cdFx0XHRcdDxsYWJlbCBmb3I9XCJ7bmFtZX1cIiBjbGFzcz1cIm1kbC1zd2l0Y2ggbWRsLWpzLXN3aXRjaCBtZGwtanMtcmlwcGxlLWVmZmVjdFwiPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJtZGwtc3dpdGNoX19sYWJlbFwiPntkZXNjfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxpbnB1dCBpZD1cIntuYW1lfVwiIHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwibWRsLXN3aXRjaF9faW5wdXRcIj5cclxuXHRcdFx0XHQ8L2xhYmVsPlxyXG5cdFx0XHQ8L2Rpdj5gXHJcblx0fTtcclxuXHJcblx0Ly8gc2VwYXJhdGVkIGZvciB1c2UgaW4gdGVtcGxhdGUgc3RyaW5ncyBiZWxvd1xyXG5cdHByaXZhdGUgX2NhbnZhc05hbWVzcGFjZSA9IGBjb20uam1hcmluZXIuJHt0aGlzLnByZWZpeH1gO1xyXG5cclxuXHRjYW52YXMgPSB7XHJcblx0XHRzZWxlY3Rvcjoge1xyXG5cdFx0XHRtb2R1bGU6IFwiZGl2LmNvbnRleHRfbW9kdWxlXCIsXHJcblx0XHRcdG1vZHVsZV9pdGVtOiBcImxpLmNvbnRleHRfbW9kdWxlX2l0ZW1cIixcclxuXHRcdFx0bW9kdWxlX2l0ZW1zOiBcInVsLmNvbnRleHRfbW9kdWxlX2l0ZW1zXCIsXHJcblx0XHRcdHN1YmhlYWRlcjogXCJsaS5jb250ZXh0X21vZHVsZV9zdWJfaGVhZGVyXCIsXHJcblx0XHRcdG5vdF9zdWJoZWFkZXI6IFwibGkuY29udGV4dF9tb2R1bGVfaXRlbTpub3QoLmNvbnRleHRfbW9kdWxlX3N1Yl9oZWFkZXIpXCIsXHJcblx0XHRcdG5hdl90YWJzOiBcInVsI3NlY3Rpb24tdGFic1wiXHJcblx0XHR9LFxyXG5cdFx0YXBpOiB7XHJcblx0XHRcdG5hbWVzcGFjZTogdGhpcy5fY2FudmFzTmFtZXNwYWNlLFxyXG5cdFx0XHRyb290X3VybDogXCIvYXBpL3YxL1wiLFxyXG5cdFx0XHRwZXJfcGFnZTogMTAwLFxyXG5cdFx0XHR1cmxzOiB7XHJcblx0XHRcdFx0Y3VzdG9tX2RhdGE6IGB1c2Vycy9zZWxmL2N1c3RvbV9kYXRhe2RhdGFQYXRofT9ucz0ke3RoaXMuX2NhbnZhc05hbWVzcGFjZX1gLFxyXG5cdFx0XHRcdGZhdm9yaXRlX2NvdXJzZXM6IFwidXNlcnMvc2VsZi9mYXZvcml0ZXMvY291cnNlc1wiLFxyXG5cdFx0XHRcdGN1c3RvbV9jb2xvcnM6IFwidXNlcnMvc2VsZi9jb2xvcnNcIixcclxuXHRcdFx0XHRhc3NpZ25tZW50czogXCJ1c2Vycy9zZWxmL2NvdXJzZXMve2NvdXJzZUlEfS9hc3NpZ25tZW50c1wiLFxyXG5cdFx0XHRcdG1vZHVsZXM6IFwiY291cnNlcy97Y291cnNlSUR9L21vZHVsZXNcIixcclxuXHRcdFx0XHRtb2R1bGVfaXRlbXM6IFwiY291cnNlcy97Y291cnNlSUR9L21vZHVsZXMve21vZHVsZUlEfS9pdGVtc1wiLFxyXG5cdFx0XHRcdGZpbGVfZGlyZWN0OiBcImNvdXJzZXMve2NvdXJzZUlEfS9maWxlcy97ZmlsZUlEfVwiLFxyXG5cdFx0XHRcdG5hdmlnYXRpb25fdGFiczogXCJjb3Vyc2VzL3tjb3Vyc2VJRH0vdGFic1wiXHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGFfdXJsczoge1xyXG5cdFx0XHRcdGFjdGl2ZV9zdGF0ZXM6IFwiYWN0aXZlX3N0YXRlc1wiLFxyXG5cdFx0XHRcdGNvbXBsZXRlZF9hc3NpZ25tZW50czogXCJjb21wbGV0ZWRfYXNzaWdubWVudHNcIixcclxuXHRcdFx0XHRoaWRkZW5fYXNzaWdubWVudHM6IFwiaGlkZGVuX2Fzc2lnbm1lbnRzXCIsXHJcblx0XHRcdFx0dGFiX3Bvc2l0aW9uczogXCJ0YWJfcG9zaXRpb25zXCJcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmNvbnN0IFZBUlMgPSBuZXcgVmFycygpO1xyXG5leHBvcnQgY29uc3QgViA9IFZBUlM7XHJcbmV4cG9ydCBkZWZhdWx0IFZBUlMuc2Fzc0pzb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy92YXJzLnRzIiwiaW1wb3J0IHsgViB9IGZyb20gXCIuL3ZhcnNcIjtcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdGNvbnN0IHRva2VuRWwgPSAkKFwiI3Rva2VuXCIpO1xyXG5cdGNvbnN0IHN0YXR1c0VsID0gJChcIiNzdGF0dXNcIik7XHJcblx0Y29uc3Qgc2F2ZUVsID0gJChcIiNzYXZlXCIpO1xyXG5cclxuXHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChWLm1pc2MudG9rZW5fa2V5LCBkYXRhID0+IHtcclxuXHRcdGlmIChkYXRhW1YubWlzYy50b2tlbl9rZXldKVxyXG5cdFx0XHR0b2tlbkVsLnZhbChkYXRhW1YubWlzYy50b2tlbl9rZXldKTtcclxuXHR9KTtcclxuXHJcblx0c2F2ZUVsLmNsaWNrKCgpID0+IHtcclxuXHRcdGNvbnN0IHRva2VuID0gdG9rZW5FbC52YWwoKTtcclxuXHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7XHJcblx0XHRcdFtWLm1pc2MudG9rZW5fa2V5XTogdG9rZW5cclxuXHRcdH0sICgpID0+IHtcclxuXHRcdFx0aWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0c3RhdHVzRWwudGV4dChcIkFjY2VzcyB0b2tlbiBzYXZlZFwiKTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KHdpbmRvdy5jbG9zZSwgNTAwKTtcclxuXHJcblx0XHRcdFx0Ly8gVE9ETyB1cGRhdGUgdGhlIGN1cnJlbnQgY2FudmFzIHBhZ2VzIHdpdGggdGhlIGFjY2VzcyB0b2tlblxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL29wdGlvbnMudHMiXSwic291cmNlUm9vdCI6IiJ9