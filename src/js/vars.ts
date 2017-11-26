import Utils from "./utils";

class SassVars {

	prefix = "betterCanvas";

	cssClass = {
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

	dataAttr = {
		toc_module_id: "toc-module-id",
		toc_total: "toc-total",
		toc_checked_count: "toc-checked-count",
		toc_percentage: "toc-percentage",
		mod_item_id: "item-id",
		course_name: "course-name",
		course_code: "course-code",
		def_indent: "default-indent"
	};

	id = {
		toc: "toc",
		jump_button: "jump-to-top",

		popup_page_missing: "page-missing-error",
		popup_ex_name: "extension-name",
		popup_insertion_point: "insertion-point",
		popup_jump_button: "jump-to"
	};

	color = {
		toc_fill: "rgba(0, 255, 0, .75)",
		toc_border: "rgb(102, 120, 135)",
		toc_title: "var(--ic-brand-primary)", // was "rgb(57, 75, 88)",
		checkbox_check: "rgb(22, 160, 133)",
		checkbox_border: "rgb(102, 120, 135)",
		highlight_orange: "rgb(255, 152, 0)",
		highlight_red: "rgb(255, 0, 0)",
		jump_button: "rgb(57, 75, 88)"
	};

	ui = {
		top_inside_ratio: 0.05,
		scroll_top_offset: 5,
		jump_top_cutoff: 100,
		toc_top_margin: 32,
		scroll_time: 500,
		fade_time: 500,
		subheader_indent: 0,
		main_indent: 1
	};

	state = {
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
			desc: "Disable indent overrides",
			onDisable: (vars, body) => {
				[0,1,2,3,4,5].forEach(level =>
					$(vars.canvas.selector.module_item, body).removeClass("indent_" + level));
				$(vars.canvas.selector.subheader, body).addClass("indent_" + vars.ui.subheader_indent);
				$(vars.canvas.selector.not_subheader, body).addClass("indent_" + vars.ui.main_indent);
			},
			onEnable: (vars, body) => {
				$(vars.canvas.selector.module_item, body).each(function() {
					[0,1,2,3,4,5].forEach(level => $(this).removeClass("indent_" + level));
					const defLevel = $(this).attr(vars.data_attr.def_indent);
					$(this).addClass("indent_" + defLevel);
				});
			}
		}
	};

	sassJson: string;

	private static readonly prefixTypes = ["cssClass", "dataAttr", "id"];

	constructor() {

		const types = new Set(SassVars.prefixTypes);

		const processObject = (obj, objName) => {
			for (const key in obj) {
				if (!obj.hasOwnProperty(key)) continue;

				let val: object | string = obj[key];
				if (typeof val === "object") {
					processObject(val, key);
				}
				else if (typeof val === "string") {

					if (!key.startsWith("popup_") && (types.has(objName) || types.has(key))) {
						val = this.prefix + "-" + val;
					}

					if (objName === "dataAttr") {
						val = "data-" + val;
					}

					obj[key] = val;
				}
			}
		};
		processObject(this, "root");

		this.sassJson = JSON.stringify(this);
	}

}

class Vars extends SassVars {

	tooltip = {
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

	misc = {
		toc_background: `-webkit-linear-gradient(left, ${this.color.toc_fill} {percent}%, transparent {percent}%)`,
		token_key: "accessToken"
	};

	element = {

		checkbox:
				`<div style='display:none' class='${this.cssClass.checkbox_parent}'>
					<input type='checkbox' ${this.dataAttr.mod_item_id}='{item_id}'>
				</div>`,

		download_button:
				`<div style='display:none' class='${this.cssClass.download}' title='${this.tooltip.download}'>
					<a href="{file_url}"></a>
				</div>`,

		url_button:
				`<div style='display:none' class='${this.cssClass.external_url}' title='${this.tooltip.external_url}'>
					<a href="{external_url}" class="not_external" target="_blank"></a>
				</div>`,

		hide_button:
				`<div style='display:none' class='${this.cssClass.hide_button}'>
					<i ${this.dataAttr.mod_item_id}='{item_id}'></i>
				</div>`,

		course_link:
			`<li style='background-color: {tabColor}' class='menu-item ic-app-header__menu-list-item'>
				<a href='/courses/{tabID}/modules' class='ic-app-header__menu-list-link'>
					<div class='menu-item-icon-container' aria-hidden='true'><i></i></div>
					<div style='background-color: {tabColor}; border-right-color: {tabColor}'
							${this.dataAttr.course_name}='{name}' ${this.dataAttr.course_code}='{code}'
							class='menu-item__text ${this.cssClass.course_link_text}'></div>
				</a>
			</li>`,

		toc:
			`<div id='${this.id.toc}' class='ic-app-course-menu list-view'>
				<div class='${this.cssClass.toc_title}'>Table of Contents</div>
				<nav><ul></ul></nav>
			</div>`,

		toc_item:
			`<li>
				<a href='#' title='{item_name}'>
					{item_name}
					<div class='${this.cssClass.toc_ratio}' ${this.dataAttr.toc_module_id}='{item_id}'></div>
				</a>
			</li>`,

		jump_button:
			`<div id='${this.id.jump_button}'>
				<i title='${this.tooltip.jump_button}'></i>
			</div>`,

		submission_icon:
			`<div title='${this.tooltip.has_submission}' class='${this.cssClass.item_icon}'>
				<i class='icon-publish'></i>
			</div>`,

		popup_state_switch:
			`<div class="switch ${this.cssClass.popup_require_page}">
				<label for="{name}" class="mdl-switch mdl-js-switch mdl-js-ripple-effect">
					<span class="mdl-switch__label">{desc}</span>
					<input id="{name}" type="checkbox" class="mdl-switch__input">
				</label>
			</div>`
	};

	// separated for use in template strings below
	private _canvas = {
		namespace: `com.jmariner.${this.prefix}`,
		root_url: "/api/v1/"
	};

	canvas = {
		selector: {
			module: "div.context_module",
			module_item: "li.context_module_item",
			module_items: "ul.context_module_items",
			subheader: "li.context_module_sub_header",
			not_subheader: "li.context_module_item:not(.context_module_sub_header)",
			nav_tabs: "ul#section-tabs"
		},
		api: {
			namespace: this._canvas.namespace,
			root_url: this._canvas.root_url,
			per_page: 100,
			urls: {
				custom_data: `users/self/custom_data{dataPath}?ns=${this._canvas.namespace}`,
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

	init(courseID: number) {
		$.each(this.canvas.api.urls, (key, url) => {
			this.canvas.api.urls[key] = this.canvas.api.root_url + Utils.format(url, {courseID});
		});
	}
}

const VARS = new Vars();
export const V = VARS;
export default VARS.sassJson;
