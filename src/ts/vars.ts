/**
 * Contains the global configuration for the entire extension. This idea of this module was to
 * export a global variable 'V' to emulate the feature of Android Studio where all configuration
 * values are accessed from a global class 'R' ("Resources"). An additional design goal was to be
 * able to import these variables into a SCSS file to ensure all CSS classes, attributes, IDs, etc.,
 * always match between the TS and SCSS code.
 *
 * Note that this module cannot include any imports whatsoever; they will break the custom
 * SCSS loader that compiles this file. This may be fixed in the future, if needed.
 */

/**
 * Configuration class that is imported into SCSS files. This should only contain strings, numbers,
 * or nested objects as values.
 */
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
		course_code: "course-code"
	};

	id = {
		toc: "toc",
		jump_button: "jump-to-top",

		popup_page_missing: "page-missing",
		popup_ex_name: "extension-name",
		popup_insertion_point: "insertion-point",
		popup_jump_button: "jump-to",
		popup_refresh_button: "refresh-canvas-pages"
	};

	color = {
		toc_fill: "rgba(0, 255, 0, .75)",
		toc_border: "rgb(102, 120, 135)",
		toc_title: "var(--ic-brand-primary)",
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
			desc: "Disable indent overrides"
		}
	};

	sassExports: SassVars;

	private static readonly meta = {
		dataPrefixType: "dataAttr",
		prefixTypes: ["cssClass", "dataAttr", "id"],
		prefixExclude: ["popup_.+"]
	};

	/**
	 * Recursively steps along the configuration and transforms certain values in a few ways:
	 * If the parent object's key or the current item's key is contained in
	 * meta.prefixTypes, the extension prefix is prepended. If the parent object's
	 * key equals meta.dataPrefixType, the "data-" prefix is also added. This leads
	 * to values like "item-id" becoming "data-betterCanvas-item-id", for example.
	 */
	constructor() {

		const prefixTypes = new Set(SassVars.meta.prefixTypes);

		// tslint:disable-next-line:interface-over-type-literal
		type Obj = {[key: string]: string | string[] | number | Obj};

		// Must use the primitive type 'object' for this 'obj' parameter because this initially
		// gets an instance of SassVars, which cannot conform to a custom type
		const processObject = (obj: object, objName: string) => {

			for (const [key, val] of Object.entries(obj as Obj)) {

				if (typeof val === "object" && !Array.isArray(val)) {

					processObject(val, key);

				}
				else if (typeof val === "string") {

					const excluded = SassVars.meta.prefixExclude
						.map(str => new RegExp("^" + str + "$"))
						.some(regex => regex.test(key));

					let newVal = val;

					if (!excluded && (prefixTypes.has(objName) || prefixTypes.has(key)))
						newVal = this.prefix + "-" + newVal;

					if (objName === SassVars.meta.dataPrefixType)
						newVal = "data-" + newVal;

					obj[key] = newVal;
				}
			}

		};

		processObject(this, "root");

		this.sassExports = Object.assign({}, this);
	}

}

/**
 * Configuration object containing any values not needed or not supported by the SCSS imports. Also
 * includes all values from SassVars by extending it.
 */
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
		toc_background: `-webkit-linear-gradient(left, ${this.color.toc_fill} ` +
			`{percent}%, transparent {percent}%)`,
		token_key: "accessToken"
	};

	element = {

		checkbox:
				`<div style='display:none' class='${this.cssClass.checkbox_parent}'>
					<input type='checkbox' ${this.dataAttr.mod_item_id}='{item_id}'>
				</div>`,

		download_button:
				`<div style='display:none' class='${this.cssClass.download}'
					  title='${this.tooltip.download}'>
					<a href="{file_url}"></a>
				</div>`,

		url_button:
				`<div style='display:none' class='${this.cssClass.external_url}'
					  title='${this.tooltip.external_url}'>
					<a href="{external_url}" class="not_external" target="_blank"></a>
				</div>`,

		hide_button:
				`<div style='display:none' class='${this.cssClass.hide_button}'>
					<i ${this.dataAttr.mod_item_id}='{item_id}'></i>
				</div>`,

		course_link:
			`<li style='background-color: {tabColor}'
				 class='menu-item ic-app-header__menu-list-item'
			>
				<a href='/courses/{tabID}/modules' class='ic-app-header__menu-list-link'>
					<div class='menu-item-icon-container' aria-hidden='true'><i></i></div>
					<div style='background-color: {tabColor}; border-right-color: {tabColor}'
							${this.dataAttr.course_name}='{name}'
							${this.dataAttr.course_code}='{code}'
							class='menu-item__text ${this.cssClass.course_link_text}'
					></div>
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
					<div class='${this.cssClass.toc_ratio}'
						${this.dataAttr.toc_module_id}='{item_id}'
					></div>
				</a>
			</li>`,

		jump_button:
			`<div id='${this.id.jump_button}'>
				<i title='${this.tooltip.jump_button}'></i>
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
	private _canvasNamespace = `com.jmariner.${this.prefix}`;

	canvas = {
		selector: {
			module_item: "li.context_module_item",
			module_items: "ul.context_module_items",
			subheader: "li.context_module_sub_header",
			not_subheader: "li.context_module_item:not(.context_module_sub_header)",
			nav_tabs: "ul#section-tabs"
		},
		url_parts: {
			host: "ecpi.instructure.com",
			prefix: "/courses/",
			suffix: {
				modules: "/modules"
			},
			protocol: "https"
		},
		api: {
			namespace: this._canvasNamespace,
			absolute_url: "https://ecpi.instructure.com/api/v1/",
			root_url: "/api/v1/",
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

const VARS = new Vars();

/** Export 'V' as the global configuration object. */
export const V = VARS;

/**
 * Set the default export to sassExports, which is a clone of the SassVars object. This is used for
 * the SCSS TypeScript importer.
 */
export default VARS.sassExports;
