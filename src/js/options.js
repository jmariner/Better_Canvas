V = Vars.VARS;
$(function () {
    var tokenEl = $("#token");
    var statusEl = $("#status");
    var saveEl = $("#save");
    chrome.storage.sync.get(V.misc.token_key, function (data) {
        if (data[V.misc.token_key])
            tokenEl.val(data[V.misc.token_key]);
    });
    saveEl.click(function () {
        var token = tokenEl.val();
        chrome.storage.sync.set((_a = {},
            _a[V.misc.token_key] = token,
            _a), function () {
            if (chrome.runtime.lastError === undefined) {
                statusEl.text("Access token saved");
                setTimeout(window.close, 500);
            }
        });
        var _a;
    });
});
//# sourceMappingURL=options.js.map