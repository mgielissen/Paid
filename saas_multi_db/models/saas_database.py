# -*- coding: utf-8 -*-
import logging
_logger = logging.getLogger(__name__)
from datetime import datetime, timedelta

from openerp import api, fields, models
import openerp.http as http
from openerp.http import request

class SaasDatabase(models.Model):

    _name = "saas.database"
    
    name = fields.Char(string="Database Name")
    partner_id = fields.Many2one('res.partner', string="Database Partner")
    login = fields.Char(string="Login")
    password = fields.Char(string="Password")
    next_invoice_date = fields.Datetime(string="Next Invoice Date")
    template_database_id = fields.Many2one('saas.template.database', string="Template Database", ondelete="SET NULL")
    plan_price = fields.Float(string="Plan Price", help="The price of the plan at the time of purchase")
    
    @api.model
    def invoice_members(self):
        invoice_partners = self.env['saas.database'].search([('next_invoice_date', '<=', datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S") )])
        invoice_template = self.env['ir.model.data'].get_object('account', 'email_template_edi_invoice')
        for inv_saas in invoice_partners:
            #Create a new invoice
            journal_id = self.env['account.journal'].search([('type','=','sale'),('company_id','=',self.env.user.company_id.id)])         
            new_invoice = self.env['account.invoice'].sudo().create({'partner_id':inv_saas.partner_id.id, 'type':'out_invoice', 'journal_type': 'sale','account_id':journal_id.default_debit_account_id.id})
            
            #Create the line in the invoice for the system "product"
            self.env['account.invoice.line'].create({'invoice_id': new_invoice.id, 'account_id': journal_id.default_debit_account_id.id, 'name':inv_saas.template_database_id.name + " System",'quantity':1,'price_unit':inv_saas.plan_price})
            
            #Validate the invoice
            new_invoice.action_date_assign()
	    new_invoice.action_move_create()
            new_invoice.invoice_validate()
            
            #Email the invoice and pray they pay
            invoice_template.send_mail(new_invoice.id, True)
            
            #Set thier next invoice to be one month from the previous invoice
            inv_saas.next_invoice_date = datetime.strptime(inv_saas.next_invoice_date,"%Y-%m-%d %H:%M:%S") + timedelta(days=30)
	

    
    @api.one
    def login_to_saas_user(self):
        request.session.authenticate(self.name, self.login, self.password)
	        
	return http.local_redirect('/web/')