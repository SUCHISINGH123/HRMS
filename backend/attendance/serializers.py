from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

    def validate(self, data):
        if not data.get('employee'):
            raise serializers.ValidationError("Employee is required.")
        if not data.get('date'):
            raise serializers.ValidationError("Date is required.")
        if not data.get('status'):
            raise serializers.ValidationError("Status is required.")
        return data
