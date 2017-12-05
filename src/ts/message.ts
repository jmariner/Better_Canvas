export interface Base {
	readonly type: string;
}

export class Type {
	static PING = "ping";
	static JUMP_TO_FIRST_UNCHECKED = "jump to first unchecked";
	static COUNT_UNCHECKED = "count unchecked";
	static OPEN_OPTIONS = "open options";
	static STATE_GET = "state get";
	static STATE_SET = "state set";
	static SYNC_CHECKBOXES = "sync checkboxes";
	static SYNC_HIDDEN = "sync hidden";
	static UPDATE_CHECKBOX = "update checkbox";
	static UPDATE_HIDDEN = "update hidden";
	static RE_INITIALIZE = "re initialize";
}

export class Action implements Base {

	static PING = new Action(Type.PING);
	static JUMP_TO_FIRST_UNCHECKED = new Action(Type.JUMP_TO_FIRST_UNCHECKED);
	static COUNT_UNCHECKED = new Action(Type.COUNT_UNCHECKED);
	static OPEN_OPTIONS = new Action(Type.OPEN_OPTIONS);
	static RE_INITIALIZE = new Action(Type.RE_INITIALIZE);

	private constructor(readonly type: string) {}
}

export class GetState implements Base {
	readonly type = Type.STATE_GET;
	constructor(readonly stateName: string) {}
}

export class SetState implements Base {
	readonly type = Type.STATE_SET;
	constructor(readonly stateName: string, readonly newState: boolean) {}
}

class SyncBase implements Base {
	readonly type = null;
	constructor(readonly itemId: number, readonly courseId: number) {}
}

export class SyncCheckboxes extends SyncBase {
	readonly type = Type.SYNC_CHECKBOXES;
}

export class SyncHidden extends SyncBase {
	readonly type = Type.SYNC_HIDDEN;
}

class UpdateBase implements Base {
	readonly type = null;
	constructor(readonly itemId: number) {}
}

export class UpdateCheckbox extends UpdateBase {
	readonly type = Type.UPDATE_CHECKBOX;
}

export class UpdateHidden extends UpdateBase {
	readonly type = Type.UPDATE_HIDDEN;
}
