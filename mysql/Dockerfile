FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=yourpassword
ENV MYSQL_DATABASE=nutritrack
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=userpassword

# Expose MySQL and a web-based management tool (Adminer/phpMyAdmin)
EXPOSE 3306 8080

# Start MySQL server
CMD ["mysqld"]
