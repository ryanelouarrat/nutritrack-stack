# Use a slim base image for smaller size
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install system dependencies for pandas and pyarrow
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code (excluding unnecessary files)
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the Flask application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "ml_service:app"]
