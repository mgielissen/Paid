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

ajax.loadXML('/website_color_picker/static/src/xml/website_color_picker_modal.xml', qweb);

options.registry.pickbgcolour = options.Class.extend({
    colourbg: function(type) {
		if (type !== 'click') return;
		var self = this;
		this.template = 'website_color_picker.color_picker_modal';
		self.$modal = $( qweb.render(this.template, {}) );
		$('body').append(self.$modal);
        $('#oe_social_share_modal').modal('show');

        self.$modal.find("#sub_map").on('click', function () {
            self.$target.attr('style', "background-color: " + self.$modal.find("#colorpick").val() );
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
        $('#oe_social_share_modal').modal('show');

        self.$modal.find("#sub_map").on('click', function () {
            self.$target.attr('style', "color: " + self.$modal.find("#colorpick").val() );
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
        $('#oe_social_share_modal').modal('show');

        self.$modal.find("#sub_map").on('click', function () {
            self.$target.attr('style', "font-family: '" + self.$modal.find("#fontpick").val() + "'");
            self.$modal.modal('hide');
        });

    },
});

});