# Use Python 3.9 as the base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code, including the Parquet file
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the Flask application
CMD ["python", "ml_service.py"]
