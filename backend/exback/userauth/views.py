from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import logout as django_logout
from .models import BaseUser
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken




from rest_framework.decorators import api_view


@api_view(['POST'])
def getData(request):
    userObject = request.data
    email = userObject.get('email')
    password = userObject.get('password')
    role = 'user'

    if not email or not password:
        return Response({'message': 'Email and password are required'}, status=400)

    if BaseUser.objects.filter(email=email).exists():
        return Response({'message': 'User already exists'}, status=400)

    # Создаём пользователя и сразу сохраняем его
    user = BaseUser(email=email, password=make_password(password), role=role)
    user.save()  # Сохранение пользователя в БД

    # Теперь можно генерировать токены
    refresh = str(RefreshToken.for_user(user))  
    access = str(AccessToken.for_user(user))

    # Обновляем refreshToken в БД
    user.refreshToken = make_password(refresh)
    user.save()

    # Формируем ответ
    response = Response({'message': 'User successfully registered', 'role': user.role, 'access': access}, status=201)
    
    # Устанавливаем refresh-токен в куки
    response.set_cookie(
        key='refresh',
        value=refresh,
        httponly=True,
        secure=False,  # Только для HTTPS, если True
        samesite='None',
    )

    return response


@api_view(['GET'])
def getMessage(request):
    cookies = str(request.COOKIES)
    
    # Выводим все куки в формате ключ-значение
    print(cookies)
    return JsonResponse({'message':'oksky'})

@api_view(['POST'])
def user_logout(request):
    django_logout(request)
    
    return JsonResponse({'message':'logout successfull'},status=200)