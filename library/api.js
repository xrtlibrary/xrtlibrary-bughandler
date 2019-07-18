//
//  Copyright 2014 - 2019 The XRT Authors. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.txt file.
//

//
//  Imports.
//

//  Imported modules.
const CrRobustBug = require("./../core/robust/bug");

//  Export public APIs.
module.exports = {
    "ReportBug": CrRobustBug.ReportBug,
    "RegisterBugHandler": CrRobustBug.RegisterBugHandler,
    "UnregisterBugHandler": CrRobustBug.UnregisterBugHandler
};