//
//  Copyright 2014 - 2019 The XRT Authors. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.txt file.
//

//
//  Imports.
//

//  Imported modules.
const Util = require("util");

//
//  Globals.
//

/**
 *  Bug handlers.
 * 
 *  @type {Set<(error: Error) => void>}
 */
let g_BugHandlers = new Set();

//
//  Public functions.
//

/**
 *  Report bug.
 * 
 *  Note(s):
 *    [1] If there is no bug handler registered, the message and the stack would
 *        be printed to standard error.
 * 
 *  @param {String} message - The bug message.
 */
function ReportBug(message) {
    if (g_BugHandlers.size == 0) {
        console.trace(Util.format("Unhandled bug: \"%s\".", message));
    } else {
        g_BugHandlers.forEach(function(cb) {
            cb(new Error(message));
        });
    }
}

/**
 *  Register a bug handler.
 * 
 *  @param {(error: Error) => void} handler - The bug handler.
 */
function RegisterBugHandler(handler) {
    if (!g_BugHandlers.has(handler)) {
        g_BugHandlers.add(handler);
    }
}

/**
 *  Unregister a bug handler.
 * 
 *  @param {(error: Error) => void} handler - The bug handler.
 *  @return {Boolean} - True if succeed (false if the handler was not 
 *                      registered).
 */
function UnregisterBugHandler(handler) {
    if (g_BugHandlers.has(handler)) {
        g_BugHandlers.delete(handler);
        return true;
    } else {
        return false;
    }
}

//  Export public APIs.
module.exports = {
    "ReportBug": ReportBug,
    "RegisterBugHandler": RegisterBugHandler,
    "UnregisterBugHandler": UnregisterBugHandler
};