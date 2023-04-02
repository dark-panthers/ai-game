# Generated by Django 4.1.7 on 2023-04-02 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Player",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Round",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Session",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("code", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Vote",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("correct", models.BooleanField()),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.player"
                    ),
                ),
                (
                    "round",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.round"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="round",
            name="session",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.session"
            ),
        ),
        migrations.AddField(
            model_name="player",
            name="session",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.session"
            ),
        ),
    ]
