# Generated by Django 4.1.3 on 2023-05-28 20:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0018_auto_20201015_2036'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admint',
            fields=[
                ('adminid', models.AutoField(db_column='AdminID', primary_key=True, serialize=False)),
                ('aname', models.CharField(blank=True, db_column='AName', max_length=20, null=True)),
                ('e_mail', models.CharField(blank=True, db_column='E-mail', max_length=40, null=True)),
                ('phonenumber', models.CharField(blank=True, db_column='PhoneNumber', max_length=15, null=True)),
                ('apassword', models.CharField(blank=True, db_column='APassword', max_length=15, null=True)),
            ],
            options={
                'db_table': 'ADMINT',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Testresult',
            fields=[
                ('testdate', models.DateTimeField(db_column='TestDate', primary_key=True, serialize=False)),
                ('pathlength', models.FloatField(blank=True, db_column='PathLength', null=True)),
                ('pathlengthcor', models.FloatField(blank=True, db_column='PathLengthCor', null=True)),
                ('pathlengthsag', models.FloatField(blank=True, db_column='PathLengthSag', null=True)),
                ('normalizedpathlength', models.FloatField(blank=True, db_column='NormalizedPathLength', null=True)),
                ('jerk', models.FloatField(blank=True, db_column='Jerk', null=True)),
                ('jerkcor', models.FloatField(blank=True, db_column='JerkCor', null=True)),
                ('jerksag', models.FloatField(blank=True, db_column='JerkSag', null=True)),
                ('meanvel', models.FloatField(blank=True, db_column='MeanVel', null=True)),
                ('meanvelcor', models.FloatField(blank=True, db_column='MeanVelCor', null=True)),
                ('meanvelsag', models.FloatField(blank=True, db_column='MeanVelSag', null=True)),
                ('accx', models.JSONField(blank=True, db_column='AccX', null=True)),
                ('accz', models.JSONField(blank=True, db_column='AccZ', null=True)),
            ],
            options={
                'db_table': 'TESTRESULT',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Treats',
            fields=[
                ('patientid', models.OneToOneField(db_column='PatientID', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='hospital.patient')),
            ],
            options={
                'db_table': 'TREATS',
                'managed': False,
            },
        ),
        migrations.AlterModelOptions(
            name='appointment',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='doctor',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='patient',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='patientdischargedetails',
            options={'managed': False},
        ),
    ]
