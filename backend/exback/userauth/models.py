from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    """Менеджер пользователей для кастомной модели"""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Создание суперпользователя"""
        extra_fields.setdefault("is_staff", True)  # Нужно для входа в админку
        extra_fields.setdefault("is_superuser", True)  # Доступ ко всем разделам
        extra_fields.setdefault("is_active", True)  # Суперпользователь должен быть активным
        return self.create_user(email, password, **extra_fields)
    
    def get_by_natural_key(self, email):
        return self.get(email=email)


class BaseUser(AbstractBaseUser):
    email = models.EmailField(unique=True, max_length=100)
    password = models.CharField(max_length=255)    
    refreshToken = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=10, blank=True)
    def has_perm(self, perm, obj=None):
        """Есть ли у пользователя конкретное право"""
        return True  # или можешь проверять права по логике

    def has_module_perms(self, app_label):
        """Есть ли у пользователя доступ к модулю админки"""
        return True  # Обычно достаточно `True`, если хочешь разрешить доступ

    
       # 🔹 **Добавляем недостающие поля**
    is_active = models.BooleanField(default=True)  # Пользователь активен по умолчанию
    is_staff = models.BooleanField(default=False)  # Разрешение на вход в админку
    is_superuser = models.BooleanField(default=False)  # Полный доступ к системе
    

    USERNAME_FIELD = "email"
    objects = CustomUserManager()  # Подключаем кастомный менеджер
    
    def __str__(self):
        return self.email

# # Create your models here.
# class BaseUser(models.Model):
#     email = models.EmailField(unique=True, max_length=100)
#     password = models.CharField(max_length=255)    
#     refreshToken = models.CharField(max_length=255,blank=True)
#     role = models.CharField(max_length=10,blank=True)
    
#     def __str__(self):
#         return self.email