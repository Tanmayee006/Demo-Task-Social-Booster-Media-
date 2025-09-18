# 📊 Task Dashboard

A comprehensive web application built with Django that serves as a task management and reporting dashboard. It features **CRUD** operations for tasks, integration with an external weather API, and visual reporting.

---

## 🚀 Features

* **Task Management (CRUD):** Full functionality to **C**reate, **R**ead, **U**pdate, and **D**elete tasks.
* **Weather API Integration:** Fetches and displays real-time weather data from the **OpenWeatherMap API**.
* **Data Reporting:** Visualizes task-related data using charts and graphs.
* **RESTful API:** Provides a clean set of API endpoints for tasks, weather, and reports.

---

## 🛠️ Setup and Installation

### Prerequisites

* **Python 3.8+**
* **pip** (Python package installer)
* **PostgreSQL** (or another database configured in `task_dashboard/settings.py`)

### 1. Clone the Repository
-git clone <your_repository_url>
-cd task_dashboard
### 2.Set up the environment
# Create and activate a virtual environment
python -m venv venv
For macOS/Linux:
source venv/bin/activate
For Windows:
venv\Scripts\activate

### 3.Install Dependencies
-pip install -r requirements.txt
### 4.Configure Environment Variables

.env
-SECRET_KEY='your_django_secret_key'
-DATABASE_URL='postgresql://user:password@host:port/dbname'
-OPENWEATHER_API_KEY='your_openweathermap_api_key'

### 5.Run Migrations

-python manage.py makemigrations tasks
-python manage.py migrate

### 6.Run the Development Server
-python manage.py runserver

### Project Structure
-task_dashboard/: The main Django project configuration.

-tasks/: Manages all task-related logic, including models, serializers, and API views.

-weather/: Handles the integration with the OpenWeatherMap API and related services.

-reports/: Contains views for data visualization and reporting.

-static/: Stores all static assets like CSS, JavaScript, and HTML templates.

-.env.example: A template for environment variables.
