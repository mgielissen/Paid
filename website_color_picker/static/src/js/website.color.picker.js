odoo.define('website.color.picker', function (require) {
'use strict';

var Model = require('web.Model');
var base = require('web_editor.base');
var options = require('web_editor.snippets.options');
var session = require('web.session');
var website = require('website.website');
var ajax = require('web.ajax');
var core = require('web.core');
var qweb = core.qweb;

ajax.loadXML('/website_color_picker/static/src/xml/website_color_picker_modal4.xml', qweb);

options.registry.pickbgcolour = options.Class.extend({
    colourbg: function(type) {
		if (type !== 'click') return;
		var self = this;
		this.template = 'website_color_picker.color_background_picker_modal';
		self.$modal = $( qweb.render(this.template, {}) );
		$('body').append(self.$modal);
        $('#oe_pick_background_modal').modal('show');

        self.$modal.find("#submit_background_color").on('click', function () {
			//self.$target.css("background-color", "");
			//self.$target.css('cssText', self.$target.css('cssText') + "background-color: " + self.$modal.find("#colorpick").val() + " !important")
            self.$target.css("background-color",self.$modal.find("#colorpick").val() );
            self.$modal.modal('hide');
        });

    },
});

options.registry.pickfontcolour = options.Class.extend({
    colourfont: function(type) {
		if (type !== 'click') return;
		var self = this;
		this.template = 'website_color_picker.color_picker_modal';
		self.$modal = $( qweb.render(this.template, {}) );
		$('body').append(self.$modal);
        $('#oe_pick_color_modal').modal('show');

        self.$modal.find("#submit_color").on('click', function () {
			//self.$target.css("color", "");
			//self.$target.css('cssText', self.$target.css('cssText') + "color: " + self.$modal.find("#colorpick").val() + " !important")

            self.$target.css("color", self.$modal.find("#colorpick").val() );
            self.$modal.modal('hide');
        });

    },
});

options.registry.pickfontfamily = options.Class.extend({
    fontfamily: function(type) {
		if (type !== 'click') return;
		var self = this;
		this.template = 'website_color_picker.pick_font_modal';
		self.$modal = $( qweb.render(this.template, {}) );
		$('body').append(self.$modal);
        $('#oe_pick_font_family_modal').modal('show');

        self.$modal.find("#submit_family").on('click', function () {
			//self.$target.css("font-family", "");
			//self.$target.css('cssText', self.$target.css('cssText') + "font-family: " + self.$modal.find("#fontpick").val() + " !important")

            self.$target.css("font-family", self.$modal.find("#fontpick").val() );
            self.$modal.modal('hide');
        });

    },
});

});