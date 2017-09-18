var QUERY = { active: true, currentWindow: true };
$(function () {
    V = Vars.VARS;
    var BODY = $("body");
    var jumpButton = $("#" + V.id.popup_jump_button);
    var insertionPoint = $("#" + V.id.popup_insertion_point);
    $("#" + V.id.popup_ex_name).text(chrome.runtime.getManifest().name);
    Promise.resolve()
        .then(function () { return new Promise(function (next) {
        var startPing = $.now();
        sendMessage(new MessageData("ping"), function (resp) {
            if (resp !== undefined) {
                console.log("page ping", resp.pong - startPing);
                BODY.addClass(V.cssClass.popup_connected);
                next();
            }
            else {
                BODY.addClass(V.cssClass.popup_loaded);
            }
        });
    }); }).then(function () { return new Promise(function (next) {
        sendMessage(new MessageData("count unchecked"), function (resp) {
            if (resp !== undefined) {
                if (resp.count === 0)
                    jumpButton.prop("disabled", true).attr("title", V.tooltip.popup_no_unchecked);
                next();
            }
        });
    }); }).then(function () { return new Promise(function (next) {
        var remaining = Object.keys(V.state).length;
        $.each(V.state, function (stateName, stateData) {
            sendMessage(new StateMessageData("get", stateName), function (resp) {
                var el = $(Utils.format(V.element.popup_state_switch, { name: stateName, desc: stateData.desc }));
                el.insertAfter(insertionPoint);
                componentHandler.upgradeElement(el.find("label").get(0));
                var inputEl = el.find("input").get(0);
                el.change(function () {
                    var newState = inputEl.checked;
                    setMdlChecked(inputEl, !newState);
                    inputEl.title = V.tooltip.waiting;
                    inputEl.disabled = true;
                    sendMessage(new StateMessageData("set", stateName, newState), function (resp) {
                        if (resp !== undefined) {
                            setMdlChecked(inputEl, newState);
                            inputEl.title = "";
                            inputEl.disabled = false;
                        }
                    });
                });
                setMdlChecked(inputEl, resp.state);
                if (--remaining === 0)
                    next();
            });
        });
        jumpButton.click(function () {
            sendMessage(new MessageData("jump to first unchecked"), function (resp) { return window.close(); });
        });
    }); }).then(function () { return new Promise(function (next) {
        insertionPoint.remove();
        BODY.addClass(V.cssClass.popup_loaded);
        next();
    }); });
});
function sendMessage(data, callback) {
    chrome.tabs.query(QUERY, function (tabs) { return chrome.tabs.sendMessage(tabs[0].id, data, callback); });
}
function setMdlChecked(checkbox, checked) {
    $(checkbox)
        .prop("checked", checked)
        .parent()
        .toggleClass("is-checked", checked);
}
//# sourceMappingURL=popup.js.map