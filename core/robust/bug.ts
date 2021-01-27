//
//  Copyright 2014 - 2021 The XRT Authors. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.txt file.
//

//
//  Globals.
//

/**
 *  Bug handlers.
 */
let g_BugHandlers = new Set<(error: Error) => void>();

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
 *  @param message - The bug message.
 *  @param thrown - True if the error should be thrown (default: false).
 *  @param ecls - The error class (default: Error).
 */
export function ReportBug(
    message: string, 
    thrown: boolean = false, 
    ecls: new(message: string) => Error = Error
): void {
    let error = new ecls(message);

    if (g_BugHandlers.size == 0) {
        console.trace(`Unhandled bug: \"${message}\".`);
    } else {
        g_BugHandlers.forEach(function(cb) {
            try {
                cb(error);
            } catch(error) {
                console.trace(
                    `An error occurred while invoking bug handler ` + 
                    `(error=\"${error.message || "Unknown error."}\").`, 
                );
            }
        });
    }

    if (thrown) {
        throw error;
    }
}

/**
 *  Register a bug handler.
 * 
 *  @param handler - The bug handler.
 */
export function RegisterBugHandler(handler: (error: Error) => void): void {
    if (!g_BugHandlers.has(handler)) {
        g_BugHandlers.add(handler);
    }
}

/**
 *  Unregister a bug handler.
 * 
 *  @param handler - The bug handler.
 *  @returns - True if succeed (false if the handler was not registered).
 */
export function UnregisterBugHandler(handler: (error: Error) => void): boolean {
    if (g_BugHandlers.has(handler)) {
        g_BugHandlers.delete(handler);
        return true;
    } else {
        return false;
    }
}
