// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("alight.Lists.controller.ListTypes", {
            onInit: function () {

                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            },

            getGroupHeader: function (oGroup) {
                var groupHeaderList = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                });

                return groupHeaderList;
            },

            onPressShowSelectedItems: function () {
                var standardList = this.getView().byId("standardList"),
                    selectedItems = standardList.getSelectedItems(),
                    i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    var msgText = i18nModel.getText("selection");
                    for (var index in selectedItems) {
                        var oContext = selectedItems[index].getBindingContext().getObject();
                        msgText = msgText + " - " + oContext.Material;
                    }

                    sap.m.MessageToast.show(msgText);
                }
            },

            onPressDeleteSelectedItems: function () {
                var standardList = this.getView().byId("standardList"),
                    selectedItems = standardList.getSelectedItems(),
                    i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    var msgText = i18nModel.getText("selection"),
                        arrayId = [],
                        model = this.getView().getModel(),
                        products = model.getProperty("/Products");

                    for (var index in selectedItems) {
                        var oContext = selectedItems[index].getBindingContext().getObject();
                        arrayId.push(oContext.Id);
                        msgText = msgText + " - " + oContext.Material;
                    }

                    products = products.filter(function (p) {
                        return !arrayId.includes(p.Id);
                    });

                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                    sap.m.MessageToast.show(msgText);
                }
            },

            onDeleteRow: function (oEvent) {

                var selectedRow = oEvent.getParameter("listItem"),
                    contex = selectedRow.getBindingContext(),
                    splitPath = contex.getPath().split("/"),
                    indexSelRow = splitPath[splitPath.length - 1],
                    model = this.getView().getModel(),
                    products = model.getProperty("/Products");

                products.splice(indexSelRow, 1);
                model.refresh();
            }
        });
    });
