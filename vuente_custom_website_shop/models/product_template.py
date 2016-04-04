# -*- coding: utf-8 -*-
from openerp import api, fields, models, tools

class ProductTemplateVuente(models.Model):

    _inherit = "product.template"
    
    sales_count = fields.Integer(store=True)
    mini_description = fields.Char(string="Mini Description")
