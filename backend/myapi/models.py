#Database Models.py
from django.db import models
from django.contrib.auth.models import User, Group, Permission

#Section for Owner: For now, login feature of Owner is only required

class Owner(models.Model):
    #Here email is used as foreign key: So, don't put feature to update email / If making update feature uuid should be used and all vehicle related to this key will be cascaded
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='owner_email', primary_key=True) #Used for Primary Key/Used as Foreign key of Vehicle as well
    service_name = models.CharField(max_length=255, null=True)  #Name of the business
    full_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    profile_img = models.URLField(null=True) #bring link from AWS S3 
    address = models.CharField(max_length= 255)

    def __str__(self):
        return self.service_name

class Vehicle(models.Model):
    owner = models.ForeignKey( Owner, on_delete=models.CASCADE, related_name='vehicles') #Used as a key to link with Owner profile
    number = models.CharField( unique= True, primary_key= True) #Vehicle number: Used as Primary Key
    vehicle_type = models.CharField(max_length=20, choices=[('Bike', 'Bike'), ('Car', 'Car'), ('Elite Car', 'Elite Car'), ('Pickup Truck','Pickup Truck')]) # Only four types: Bike, Car, Elite car, and Pickup Truck
    name = models.CharField(max_length=50)
    model = models.CharField(max_length=50) # Model of the vehicle
    rate_description = models.CharField(max_length=255) 
    year_of_manufacture = models.DateField()
    condition_description = models.CharField(max_length=255)
    img = models.URLField() #Image of Vehicle from AWS S3 

    def __str__(self):
        return self.name + " " + self.model + " " + self.number


#Section for Renter
class Renter(models.Model):
    email = models.EmailField( unique=True, max_length=50) #Email: not used as a primary key here (Just for info)
    id = models.CharField( primary_key= True, max_length=50, unique=True) # Document ID: Country code + License ID, used as primary key (Also foreign key for reviews)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=20)
    face_embedding = models.JSONField()
    phone = models.CharField(max_length=20)
    license_img = models.URLField() #Image of License from AWS S3 
    dob = models.DateField()
    hired = models.BooleanField(default=False)

    def __str__(self):
        return self.id 

class Reviews(models.Model):
    renter = models.ForeignKey( Renter, on_delete=models.CASCADE, related_name='reviews') # id of Renter 
    owner_email = models.ForeignKey(Owner, on_delete=models.CASCADE, related_name='owner')
    vehicle = models.CharField(max_length=255) # Previously rented vehicle over which review is done
    rating = models.IntegerField(range(1,5))
    comment_type = models.CharField( max_length=10, choices=[('Feedback', 'Feedback'), ('Report', 'Report')]) #Types: Feedback or Report 
    comment = models.TextField()

    def __str__(self):
        return f"Review by {self.id} on {self.vehicle}"
