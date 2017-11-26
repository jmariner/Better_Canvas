/*
	https://canvas.instructure.com/doc/api/modules.html
	https://canvas.instructure.com/doc/api/assignments.html
	https://canvas.instructure.com/doc/api/discussion_topics.html
	https://canvas.instructure.com/doc/api/courses.html
	https://canvas.instructure.com/doc/api/files.html
	https://canvas.instructure.com/doc/api/submissions.html
*/

export interface Module {
	id: number;
	workflow_state: string;
	position: number;
	name: string;
	unlock_at: string;
	require_sequential_progress: boolean;
	prerequisite_module_ids: number[];
	items_count: number;
	items_url: string;
	items: ModuleItem[];
	state: string;
	completed_at: string;
	publish_final_grade: boolean;
}

export interface ModuleItem {
	id: number;
	module_id: number;
	position: number;
	title: string;
	indent: number;
	type: string;
	content_id: number;
	html_url: string;
	url: string;
	page_url: string;
	external_url: string;
	new_tab: boolean;
}

export interface Assignment {
	id: number;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	due_at: string;
	lock_at: string;
	unlock_at: string;
	has_overrides: boolean;
//  all_dates: ???;
	course_id: number;
	html_url: string;
	submissions_download_url: string;
	assignment_group_id: number;
	due_date_required: boolean;
	allowed_extensions: string[];
	max_name_length: number;
	turnitin_enabled: boolean;
	vericite_enabled: boolean;
//  turnitin_settings: ???;
	grade_group_students_individually: boolean;
//  external_tool_tag_attributes: ???;
	peer_reviews: boolean;
	automatic_peer_reviews: boolean;
	peer_review_count: number;
	peer_reviews_assign_at: string;
	intra_group_peer_reviews: boolean;
	group_category_id: number;
	needs_grading_count: number;
//  needs_grading_count_by_section: ???;
	position: number;
	post_to_sis: boolean;
	integration_id: number;
	integration_data: number;
	muted: boolean;
	points_possible: number;
	submission_types: string[];
	grading_type: string;
	grading_standard_id: number;
	published: boolean;
	unpublishable: boolean;
	only_visible_to_overrides: boolean;
	locked_for_user: boolean;
//  lock_info: ???;
	lock_explanation: string;
	quiz_id: number;
	anonymous_submissions: boolean;
	discussion_topic: DiscussionTopic;
//  freeze_on_copy: ???;
//  frozen: ???;
//  frozen_attributes: ???;
//  submission: ???;
	use_rubric_for_grading: boolean;
//  rubric_settings: ???;
//  rubric: ???;
	assignment_visibility: number[];
//  overrides: ???;
	omit_from_final_grade: boolean;
	has_submitted_submissions: boolean;
}

export interface DiscussionTopic {
	id: number;
	title: string;
	message: string;
	html_url: string;
	posted_at: string;
	last_reply_at: string;
	require_initial_post: boolean;
	user_can_see_posts: boolean;
	discussion_subentry_count: number;
	read_state: string;
	unread_count: number;
	subscribed: boolean;
	subscription_hold: string;
	assignment_id: number;
	delayed_post_at: string;
	published: boolean;
	lock_at: string;
	locked: boolean;
	pinned: boolean;
	locked_for_user: boolean;
//  lock_info: ???;
	lock_explanation: string;
	user_name: string;
	topic_children: number[];
	root_topic_id: number;
	podcast_url: string;
	discussion_type: string;
	group_category_id: number;
	attachments: Array<{
		"content-type": string;
		url: string;
		filename: string;
		display_name: string;
	}>;
//  permissions: ???;
	allow_rating: boolean;
	only_graders_can_rate: boolean;
	sort_by_rating: boolean;
}

export interface CustomData {
	active_states: string[];
	completed_assignments: Map<number, number[]>;
	hidden_assignments: Map<number, number[]>;
	tab_positions: Map<number, Map<string, number>>;
}

export interface Course {
	id: number;
	sis_course_id: number;
	integration_id: number;
	name: string;
	course_code: string;
	workflow_state: string;
	account_id: number;
	root_account_id: number;
	enrollment_term_id: number;
	grading_standard_id: number;
	start_at: string;
	end_at: string;
	locale: string;
//  enrollments: ???;
	total_students: number;
	calendar: {ics: string};
	default_view: string;
	syllabus_body: string;
	needs_grading_count: number;
//  term: ???;
//  course_progress: ???;
	apply_assignment_group_weights: boolean;
//  permissions: ???;
	is_public: boolean;
	is_public_to_auth_users: boolean;
	public_syllabus: boolean;
	public_syllabus_to_auth: boolean;
	public_description: string;
	storage_quota_mb: number;
	storage_quota_used_mb: number;
	hide_final_grades: boolean;
	license: string;
	allow_student_assignment_edits: boolean;
	allow_wiki_comments: boolean;
	allow_student_forum_attachments: boolean;
	open_enrollment: boolean;
	self_enrollment: boolean;
	restrict_enrollments_to_course_dates: boolean;
	course_format: string;
	access_restricted_by_date: boolean;
	time_zone: string;
}

export interface File {
	size: number;
	"content-type": string;
	url: string;
	id: number;
	display_name: string;
	created_at: string;
	updated_at: string;
	unlock_at: string;
	modified_at: string;
	locked: boolean;
	hidden: boolean;
	lock_at: string;
	locked_for_user: boolean;
//  lock_info: ???;
	lock_explanation: string;
	hidden_for_user: boolean;
	thumbnail_url: string;
	mime_class: string;
//  media_entry_id: ???;
	preview_url: string;
}

export interface Submission {
	assignment_id: number;
//  assignment: ???;
//  course: ???;
	attempt: number;
	body: string;
	grade: string;
	grade_matches_current_submission: boolean;
	html_url: string;
	preview_url: string;
	score: number;
	submission_comments: string;
	submission_type: string;
	submitted_at: string;
	url: string;
	user_id: number;
	grader_id: number;
	graded_at: string;
//  user: ???;
	late: boolean;
	assignment_visible: boolean;
	excused: boolean;
	missing: boolean;
	late_policy_status: string;
	points_deducted: number;
	seconds_late: number;
	workflow_state: string;
}

export interface Tab {
	id: string;
	label: string;
	html_url: string;
	full_url: string;
	url?: string;
	position: number;
	visibility: string;
	type: string;
}
