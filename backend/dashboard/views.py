from django.http import JsonResponse
from employees.models import Employee
from attendance.models import Attendance
from datetime import date
from django.db.models import Count
from django.db.models.functions import ExtractMonth

def dashboard_stats(request):

    year = date.today().year

    total_employees = Employee.objects.count()

    present_today = Attendance.objects.filter(
        date=date.today(),
        status="Present"
    ).count()

    absent_today = total_employees - present_today

    # Month wise present
    monthly_present = (
        Attendance.objects.filter(status="Present", date__year=year)
        .annotate(month=ExtractMonth('date'))
        .values('month')
        .annotate(count=Count('id'))
    )

    # Month wise absent
    monthly_absent = (
        Attendance.objects.filter(status="Absent", date__year=year)
        .annotate(month=ExtractMonth('date'))
        .values('month')
        .annotate(count=Count('id'))
    )

    month_data = {i: {"present": 0, "absent": 0} for i in range(1, 13)}

    for item in monthly_present:
        month_data[item["month"]]["present"] = item["count"]

    for item in monthly_absent:
        month_data[item["month"]]["absent"] = item["count"]

    chart_data = []
    for month in range(1, 13):
        chart_data.append({
            "month": month,
            "present": month_data[month]["present"],
            "absent": month_data[month]["absent"]
        })

    recent = Attendance.objects.order_by('-date')[:5]

    recent_data = [
        {
            "employee": r.employee.full_name,
            "date": r.date,
            "status": r.status
        }
        for r in recent
    ]

    return JsonResponse({
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
        "chart_data": chart_data,
        "recent_attendance": recent_data
    })
