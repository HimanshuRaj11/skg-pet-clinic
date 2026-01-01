from rest_framework.exceptions import ValidationError

def recalculate_invoice(invoice):
    subtotal = sum(item.line_total for item in invoice.items.all())
    tax = subtotal * 0.0  # keep zero for now
    total = subtotal + tax

    invoice.subtotal = subtotal
    invoice.tax = tax
    invoice.total = total
    invoice.save()


def ensure_invoice_editable(invoice):
    if invoice.status == "PAID":
        raise ValidationError("Paid invoices cannot be modified.")
