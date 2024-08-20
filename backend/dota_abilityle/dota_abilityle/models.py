from django.db import models

class Dota2Ability(models.Model):
    id = models.AutoField(primary_key=True)  # AutoField automatically increments the ID
    name = models.CharField(max_length=255)
    hero = models.CharField(max_length=255)
    description = models.TextField()
    mana_cost = models.CharField(max_length=255)
    cooldown = models.CharField(max_length=255)
    ability_list = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.hero})"

    class Meta:
        db_table = 'dota_2_abilities'  # Specify the table name explicitly
