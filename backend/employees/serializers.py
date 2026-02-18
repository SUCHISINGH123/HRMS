from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def validate(self, data):
        if not data.get('employee_id'):
            raise serializers.ValidationError("Employee ID is required.")
        if not data.get('full_name'):
            raise serializers.ValidationError("Full name is required.")
        if not data.get('email'):
            raise serializers.ValidationError("Email is required.")
        return data
