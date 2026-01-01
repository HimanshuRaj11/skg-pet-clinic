from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Table, TableStyle, Paragraph
from reportlab.lib import colors


def generate_invoice_pdf(invoice, response):
    c = canvas.Canvas(response, pagesize=A4)
    width, height = A4

    # Header
    c.setFont("Helvetica-Bold", 16)
    c.drawString(30, height - 40, "SKG Clinic")

    c.setFont("Helvetica", 10)
    c.drawString(30, height - 60, "Veterinary Clinic Invoice")

    # Invoice Info
    c.drawString(30, height - 90, f"Invoice ID: {invoice.id}")
    c.drawString(30, height - 105, f"Status: {invoice.status}")
    c.drawString(30, height - 120, f"Date: {invoice.created_at.strftime('%d-%m-%Y')}")

    pet = invoice.appointment.pet
    c.drawString(30, height - 145, f"Pet: {pet.pet_name} ({pet.species})")
    c.drawString(30, height - 160, f"Owner: {pet.owner_name}")

    # Table Data
    table_data = [["Description", "Qty", "Unit Price", "Total"]]

    for item in invoice.items.all():
        table_data.append([
            item.description,
            str(item.quantity),
            f"{item.unit_price:.2f}",
            f"{item.line_total:.2f}",
        ])

    table = Table(table_data, colWidths=[80*mm, 20*mm, 30*mm, 30*mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
        ("GRID", (0, 0), (-1, -1), 1, colors.black),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
    ]))

    table.wrapOn(c, width, height)
    table.drawOn(c, 30, height - 400)

    # Totals
    c.drawString(350, height - 430, f"Subtotal: {invoice.subtotal:.2f}")
    c.drawString(350, height - 445, f"Tax: {invoice.tax:.2f}")
    c.setFont("Helvetica-Bold", 11)
    c.drawString(350, height - 460, f"Total: {invoice.total:.2f}")

    c.showPage()
    c.save()
