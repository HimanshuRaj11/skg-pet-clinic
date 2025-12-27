from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from .models import Invoice
from .serializers import InvoiceSerializer, GenerateInvoiceSerializer
from .services import BillingService

class InvoiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'PET_OWNER':
            return Invoice.objects.filter(appointment__owner__user=user)
        return super().get_queryset()

class GenerateInvoiceView(views.APIView):
    permission_classes = [permissions.IsAuthenticated] # Restrict to Staff/Receptionist

    def post(self, request):
        serializer = GenerateInvoiceSerializer(data=request.data)
        if serializer.is_valid():
            try:
                invoice = BillingService.generate_invoice(serializer.validated_data)
                return Response(InvoiceSerializer(invoice).data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
