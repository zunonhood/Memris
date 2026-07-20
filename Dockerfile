# Gonoro's mind — the autonomous self-rewrite agent.
#
#   docker run --rm --env-file backend/.env ghcr.io/gonorolabs/gonoro        # loop
#   docker run --rm --env-file backend/.env ghcr.io/gonorolabs/gonoro once   # one version
#
FROM python:3.11-slim

WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

# default: run forever, a new version every 3-5 minutes
ENTRYPOINT ["python", "run.py"]
CMD ["loop"]
