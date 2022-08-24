from django.shortcuts import render
from django.contrib.auth import logout, login, authenticate
from django.shortcuts import redirect
from django.contrib.auth.forms import UserCreationForm


def home(request):
    return render(request, 'app/index.html', {})


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()

    context = {'form': form}
    return render(request, 'registration/register.html', context)


def login_view(request):
    context = {}
    if request.POST:
        username = request.POST.get('username')
        password = request.POST.get('password')
        next_page = request.GET.get('next')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            if next_page:
                return redirect(next_page)
            else:
                return redirect('app:home')
        else:
            context['error'] = "Incorrect Username or Password"

    return render(request, 'registration/login.html', context)


def logout_view(request):
    logout(request)
    return render(request, 'app/logout.html')
