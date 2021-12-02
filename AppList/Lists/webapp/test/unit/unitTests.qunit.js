/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"alight/Lists/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
