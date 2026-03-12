from django.urls import path
from .views import EmployeeListCreateView, EmployeeDeleteView, EmployeeUpdateView

urlpatterns = [
    path('', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('update/<int:pk>/', EmployeeUpdateView.as_view(), name='employee-update'),
    path('<int:pk>/', EmployeeDeleteView.as_view(), name='employee-delete'),
]