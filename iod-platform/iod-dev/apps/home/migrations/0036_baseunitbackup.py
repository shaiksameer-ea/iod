# Generated by Django 3.2.16 on 2024-03-09 01:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0035_auto_20240301_1809'),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseUnitBackup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('value', models.IntegerField()),
                ('networth', models.IntegerField()),
                ('backup', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='home.backup')),
            ],
        ),
    ]