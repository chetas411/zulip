"use strict";

const {strict: assert} = require("assert");

const {zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");
const {user_settings} = require("../zjsunit/zpage_params");

const settings_config = zrequire("settings_config");

run_test("all_notifications", () => {
    user_settings.enable_stream_desktop_notifications = false;
    user_settings.enable_stream_audible_notifications = true;
    user_settings.enable_stream_push_notifications = true;
    user_settings.enable_stream_email_notifications = false;
    user_settings.enable_desktop_notifications = false;
    user_settings.enable_sounds = true;
    user_settings.enable_offline_push_notifications = false;
    user_settings.enable_offline_email_notifications = true;

    // Check that it throws error if incorrect settings name
    // is passed. In this case, we articulate that with
    // wildcard_mentions_notify being undefined, which will be
    // the case, if a wrong setting_name is passed.
    assert.throws(settings_config.all_notifications, "Incorrect setting_name passed");

    user_settings.wildcard_mentions_notify = false;
    const notifications = settings_config.all_notifications();

    assert.deepEqual(notifications.general_settings, [
        {
            label: "translated: Streams",
            notification_settings: [
                {
                    is_checked: false,
                    is_disabled: false,
                    setting_name: "enable_stream_desktop_notifications",
                },
                {
                    is_checked: true,
                    is_disabled: false,
                    setting_name: "enable_stream_audible_notifications",
                },
                {
                    is_checked: true,
                    is_disabled: true,
                    setting_name: "enable_stream_push_notifications",
                },
                {
                    is_checked: false,
                    is_disabled: false,
                    setting_name: "enable_stream_email_notifications",
                },
                {
                    is_checked: false,
                    is_disabled: false,
                    setting_name: "wildcard_mentions_notify",
                },
            ],
        },
        {
            label: "translated: PMs, mentions, and alerts",
            notification_settings: [
                {
                    is_checked: false,
                    is_disabled: false,
                    setting_name: "enable_desktop_notifications",
                },
                {
                    is_checked: true,
                    is_disabled: false,
                    setting_name: "enable_sounds",
                },
                {
                    is_checked: false,
                    is_disabled: true,
                    setting_name: "enable_offline_push_notifications",
                },
                {
                    is_checked: true,
                    is_disabled: false,
                    setting_name: "enable_offline_email_notifications",
                },
                {
                    is_checked: false,
                    is_disabled: true,
                    setting_name: "",
                },
            ],
        },
    ]);
});
