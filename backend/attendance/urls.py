from django.urls import path
from .views import AttendanceCreateView, AttendanceListByEmployeeView

urlpatterns = [
    path('', AttendanceCreateView.as_view(), name='attendance-create'),
    path('employee/<int:employee_id>/', AttendanceListByEmployeeView.as_view(), name='attendance-by-employee'),
]
