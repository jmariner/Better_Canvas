var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vars;
(function (Vars_1) {
    var Sass = (function () {
        function Sass() {
            var _this = this;
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
                popup_loaded: "done-loading",
                popup_connected: "page-connected",
                popup_require_page: "require-page",
            };
            this.data_attr = {
                toc_module_id: "toc-module-id",
                toc_total: "toc-total",
                toc_checked_count: "toc-checked-count",
                toc_percentage: "toc-percentage",
                mod_item_id: "item-id",
                course_name: "course-name",
                course_code: "course-code"
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
                toc_title: "rgb(57, 75, 88)",
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
                fade_time: 500
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
                }
            };
            var processObject = function (obj, objName) {
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key))
                        continue;
                    var val = obj[key];
                    if (typeof val === "object") {
                        processObject(val, key);
                    }
                    else if (typeof val === "string") {
                        if ((Sass.prefix_types.indexOf(objName) > -1 || Sass.prefix_types.indexOf(key) > -1)
                            && !key.startsWith("popup_")) {
                            val = _this.prefix + "-" + val;
                        }
                        if (objName == "data_attr") {
                            val = "data-" + val;
                        }
                        obj[key] = val;
                    }
                }
            };
            processObject(this, "root");
            this.sassJson = JSON.stringify(this);
        }
        return Sass;
    }());
    Sass.prefix_types = ["cssClass", "data_attr", "id"];
    var Vars = (function (_super) {
        __extends(Vars, _super);
        function Vars() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tooltip = {
                mark_complete: "Mark as completed",
                mark_incomplete: "Mark as incomplete",
                hide: "Hide this item",
                unhide: "Unhide this item",
                hide_disabled: "Cannot hide graded item",
                jump_button: "Jump to top",
                waiting: "Waiting...",
                has_submission: "Assignment has submission",
                popup_no_unchecked: "No unchecked items to jump to"
            };
            _this.misc = {
                toc_background: "-webkit-linear-gradient(left, " + _this.color.toc_fill + " {percent}%, transparent {percent}%)",
                token_key: "accessToken"
            };
            _this.element = {
                checkbox: "<div style='display:none' class='" + _this.cssClass.checkbox_parent + "'>\n\t\t\t\t\t\t<input type='checkbox' " + _this.data_attr.mod_item_id + "='{item_id}'>\n\t\t\t\t\t</div>",
                hide_button: "<div style='display:none' class='" + _this.cssClass.hide_button + "'>\n\t\t\t\t\t\t<i " + _this.data_attr.mod_item_id + "='{item_id}'></i>\n\t\t\t\t\t</div>",
                course_link: "<li style='background-color: {tabColor}' class='menu-item ic-app-header__menu-list-item'>\n\t\t\t\t\t<a href='/courses/{tabID}/modules' class='ic-app-header__menu-list-link'>\n\t\t\t\t\t\t<div class='menu-item-icon-container' aria-hidden='true'><i></i></div>\n\t\t\t\t\t\t<div style='background-color: {tabColor}; border-right-color: {tabColor}'\n\t\t\t\t\t\t\t\t" + _this.data_attr.course_name + "='{name}' " + _this.data_attr.course_code + "='{code}'\n\t\t\t\t\t\t\t\tclass='menu-item__text " + _this.cssClass.course_link_text + "'></div>\n\t\t\t\t\t</a>\n\t\t\t\t</li>",
                toc: "<div id='" + _this.id.toc + "' class='ic-app-course-menu list-view'>\n\t\t\t\t\t<div class='" + _this.cssClass.toc_title + "'>Table of Contents</div>\n\t\t\t\t\t<nav><ul></ul></nav>\n\t\t\t\t</div>",
                toc_item: "<li>\n\t\t\t\t\t<a href='#' title='{item_name}'>\n\t\t\t\t\t\t{item_name}\n\t\t\t\t\t\t<div class='" + _this.cssClass.toc_ratio + "' " + _this.data_attr.toc_module_id + "='{item_id}'></div>\n\t\t\t\t\t</a>\n\t\t\t\t</li>",
                jump_button: "<div id='" + _this.id.jump_button + "'>\n\t\t\t\t\t<i title='" + _this.tooltip.jump_button + "'></i>\n\t\t\t\t</div>",
                submission_icon: "<div title='" + _this.tooltip.has_submission + "' class='" + _this.cssClass.item_icon + "'>\n\t\t\t\t\t<i class='icon-publish'></i>\n\t\t\t\t</div>",
                popup_state_switch: "<div class=\"switch " + _this.cssClass.popup_require_page + "\">\n\t\t\t\t\t<label for=\"{name}\" class=\"mdl-switch mdl-js-switch mdl-js-ripple-effect\">\n\t\t\t\t\t\t<span class=\"mdl-switch__label\">{desc}</span>\n\t\t\t\t\t\t<input id=\"{name}\" type=\"checkbox\" class=\"mdl-switch__input\">\n\t\t\t\t\t</label>\n\t\t\t\t</div>"
            };
            _this._canvas = {
                namespace: "com.jmariner." + _this.prefix,
                root_url: "/api/v1/"
            };
            _this.canvas = {
                selector: {
                    module: "div.context_module",
                    module_item: "li.context_module_item",
                    module_items: "ul.context_module_items",
                    subheader: "li.context_module_sub_header"
                },
                api: {
                    namespace: _this._canvas.namespace,
                    root_url: _this._canvas.root_url,
                    per_page: 100,
                    urls: {
                        custom_data: _this._canvas.root_url + "users/self/custom_data{dataPath}?ns=" + _this._canvas.namespace,
                        favorite_courses: _this._canvas.root_url + "users/self/favorites/courses",
                        custom_colors: _this._canvas.root_url + "users/self/colors",
                        assignments: _this._canvas.root_url + "users/self/courses/{courseID}/assignments",
                        modules: _this._canvas.root_url + "courses/{courseID}/modules",
                        module_items: _this._canvas.root_url + "courses/{courseID}/modules/{moduleID}/items"
                    },
                    data_urls: {
                        active_states: "active_states",
                        completed_assignments: "completed_assignments",
                        hidden_assignments: "hidden_assignments"
                    }
                },
            };
            return _this;
        }
        Vars.prototype.init = function (courseID) {
            var _this = this;
            var formatData = { courseID: courseID };
            $.each(this.canvas.api.urls, function (key, val) {
                _this.canvas.api.urls[key] = Utils.scopeFormat(val, formatData);
            });
        };
        return Vars;
    }(Sass));
    Vars_1.Vars = Vars;
    Vars_1.VARS = new Vars();
    if (typeof module !== "undefined")
        module.exports = Vars_1.VARS.sassJson;
})(Vars || (Vars = {}));
//# sourceMappingURL=vars.js.map