# Generated by Django 4.1.3 on 2023-05-28 21:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0019_admint_testresult_treats_alter_appointment_options_and_more'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='appointment',
            table='Appointment',
        ),
        migrations.AlterModelTable(
            name='doctor',
            table='DOCTOR',
        ),
        migrations.AlterModelTable(
            name='patient',
            table='PATIENT',
        ),
        migrations.AlterModelTable(
            name='patientdischargedetails',
            table='PatientDischargeDetails',
        ),
    ]
