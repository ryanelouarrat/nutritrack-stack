# NutriTrack Stack — Dockerized Frontend + Java Backend + Flask Microservice + MySQL

A multi-container NutriTrack setup that brings together:
- **Frontend** (JavaScript) – `frontend/NutriTrack/`
- **Backend** (Java / likely Spring-based) – `backend/nutriTrack/`
- **Flask microservice** (Python) – `flask/`
- **MySQL** database – `mysql/`
- **Compose orchestration** – `docker-compose.yml`


---

## Repository structure

```

.
├── backend/
│   └── nutriTrack/
├── frontend/
│   └── NutriTrack/
├── flask/
├── mysql/
└── docker-compose.yml

````

_The folders above are present in the repo root; see the repo tree for details._  

---

## Prerequisites

- **Docker** and **Docker Compose v2** installed  
  - Compose docs: https://docs.docker.com/compose/  
  - CLI reference: `docker compose` subcommands and `-f` file usage https://docs.docker.com/reference/cli/docker/compose/  

---

## Quick start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ryanelouarrat/docker-2.git
   cd docker-2
    ```

2. **Create environment files**

   Create a `.env` (or service-specific env files) with at least the database secrets. Example:

   ```dotenv
   # .env
   MYSQL_ROOT_PASSWORD=changeme
   MYSQL_DATABASE=nutritrack
   MYSQL_USER=nutri
   MYSQL_PASSWORD=changeme
   ```

   > If the repo already defines these in `docker-compose.yml`, keep a single source of truth.

3. **Build and start**

   ```bash
   docker compose up -d --build
   ```

4. **Watch logs**

   ```bash
   docker compose logs -f
   ```

5. **Stop**

   ```bash
   docker compose down
   ```

---

## Services (expected)

> **Note:** The exact ports and env vars depend on your `docker-compose.yml`.
> Common defaults are listed to help you wire things up quickly.

* **Frontend** (`frontend/NutriTrack`)

  * Typical dev ports: `3000` or `5173` (Vite/React)
  * ENV: API base URL to the backend (e.g., `VITE_API_URL=http://backend:8080`)

* **Backend** (`backend/nutriTrack`)

  * Typical port: `8080`
  * ENV: JDBC URL to MySQL (e.g., `SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/nutritrack`)

* **Flask microservice** (`flask`)

  * Typical port: `5000`
  * ENV: Any model/feature flags; CORS config if the frontend calls it directly

* **MySQL** (`mysql`)

  * Port: `3306`
  * ENV (if not in `.env`): `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`
  * Volumes: a persistent volume for data

---

## Local development tips

* **Hot reload**

  * Map the source code as a bind mount in `docker-compose.yml` for the frontend and backend so changes are picked up without rebuilds.

* **Multiple Compose files**

  * Optionally create `docker-compose.override.yml` for dev-only mounts and tooling; Compose merges files in order:

    ```bash
    docker compose -f docker-compose.yml -f docker-compose.override.yml up --build
    ```

* **Service-specific commands**

  ```bash
  docker compose exec backend sh
  docker compose exec frontend sh
  docker compose exec flask sh
  docker compose exec mysql mysql -u$MYSQL_USER -p$MYSQL_PASSWORD -h 127.0.0.1 $MYSQL_DATABASE
  ```

---

## Configuration & environment

Create a `README_ENV.md` or `.env.example` to document:

* Database credentials and DB name
* Backend service port and JDBC URL
* Frontend API base URL
* Flask microservice URL (if the backend proxies to it, document the path)

---

## Testing & health

* Add service **healthchecks** in `docker-compose.yml` (e.g., curl `/actuator/health` or `/healthz`).
* Consider **Swagger/OpenAPI** exposure for the backend (e.g., `/swagger-ui`).
* Add minimal e2e sanity checks (frontend against the compose network).

---

## Troubleshooting

* **Containers build but cannot connect to DB**

  * Ensure the backend uses the service name `mysql` as host and waits for DB readiness (healthcheck or retry).

* **CORS**

  * Set allowed origins so the frontend can call the backend and Flask services.

* **Rebuild after changes**

  ```bash
  docker compose build --no-cache
  docker compose up -d
  ```

* **Reset volumes (DANGEROUS: erases DB data)**

  ```bash
  docker compose down -v
  ```

---

## Roadmap ideas

* Add `.env.example` + per-service `.env` docs
* Introduce a `Makefile` (shortcuts: `make up`, `make down`, `make logs`)
* CI via GitHub Actions; build images, run tests, and push to a registry
* Add database migrations (Flyway/Liquibase) and seed scripts
* Automated API docs and a Postman collection

---


