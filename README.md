# XRTLibrary-BugHandler

## Introduction

A simple bug handler module.

## Installation

To install this package, you can use NPM by typing following command:

```
npm install xrtlibrary-bughandler --save
```

Then you can import this library in your JavaScript code:

```
const XRTLibBugHandler = require("xrtlibrary-bughandler");
```

## APIs

### ReportBug(message, [thrown=false], [ecls=Error])

Report bug.

<u>Note(s)</u>:
 - If there is no bug handler registered, the message and the stack would be printed to standard error.

<u>Parameter(s)</u>:
 - message (*String*): The bug message.
 - thrown (*Boolean*): (Optional) True if the error should be thrown (default: false).
 - ecls (*{new(message: String): Error}*): (Optional) The error class (default: Error).

### RegisterBugHandler(handler)

Register a bug handler.

<u>Parameter(s)</u>:
 - handler (*(error: Error) =&gt; void*): The bug handler.

### UnregisterBugHandler

Unregister a bug handler.

<u>Parameter(s)</u>:
 - handler (*(error: Error) =&gt; void*): The bug handler.

<u>Return value</u>:
 - (*Boolean*) True if succeed (false if the handler was not registered).

