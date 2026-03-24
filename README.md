# Rebuild 1.0 / CalmnClassy Dev

Welcome to the documentation for the Rebuild 1.0 project (CalmnClassy Dev). This README file provides a brief overview of the project and instructions on how to set it up and run it locally.

## Project Overview

This is a **Flask-based web application** designed for CalmnClassy Dev. It features a multi-page website including:

-   **Home, About, Services, Contact**: Standard information pages.
-   **Blog & RSS Feeds**: Aggregates news from TechCrunch and The Verge using `feedparser`.
-   **Contact Form**: Sends emails using `flask-mail`.
-   **Additional Sections**: Solutions, Team, Careers, Legals (Privacy, Terms), and more.

## Prerequisites

Before starting, ensure you have the following installed:

-   **Python 3.10+** (The project suggests Python 3.13, but modern 3.x versions should work. If you encounter issues, try 3.13).

## Installation

Follow these steps to set up your development environment.

1.  **Navigate to the project directory**:
    Ensure you are in the root directory: `c:\Users\User\OneDrive\Desktop\Rebuild 1.0`

2.  **Create a Virtual Environment** (Recommended):
    This keeps your project dependencies isolated.
    ```bash
    python -m venv .venv
    ```

3.  **Activate the Virtual Environment**:
    -   **Windows (PowerShell)**:
        ```powershell
        .\.venv\Scripts\activate
        ```
    -   **Windows (Command Prompt)**:
        ```cmd
        .venv\Scripts\activate.bat
        ```
    -   **Mac/Linux**:
        ```bash
        source .venv/bin/activate
        ```

4.  **Install Dependencies**:
    The project uses a `requirements.txt` file containing all necessary packages (Flask, Feedparser, BeautifulSoup, etc.).
    ```bash
    pip install -r requirements.txt
    ```

    *Note: There is also a `pyproject.toml` file, but `requirements.txt` appears to be more complete for this specific environment.*

## Running the Application

Once dependencies are installed, you can start the application.

1.  **Run the App**:
    ```bash
    python app.py
    ```

2.  **Access the Website**:
    Open your web browser and navigate to:
    [http://127.0.0.1:5000](http://127.0.0.1:5000)

3.  **Stopping the Server**:
    Press `CTRL+C` in your terminal to stop the server.

## Project Structure

-   **`app.py`**: The main entry point for the application. Contains route definitions and logic.
-   **`templates/`**: Directory containing HTML files for the UI (Jinja2 templates).
-   **`static/`**: Directory for static assets like CSS, JavaScript, and Images.
-   **`requirements.txt`**: List of Python dependencies.

## Important Notes

-   **Credentials**: The file `app.py` currently contains hardcoded email credentials and a secret key. For a production environment, it is strongly recommended to move these to Environment Variables (e.g., using a `.env` file and `python-dotenv`) to ensure security.
