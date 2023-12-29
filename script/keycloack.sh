docker run \
    -p 8080:8080 \
    -e KEYCLOAK_ADMIN=admin \
    -e KEYCLOAK_ADMIN_PASSWORD=admin \
    -e KC_METRICS_ENABLED=true \
    -e KC_HEALTH_ENABLED=true \
    -v $(pwd)/src/keycloak:/opt/keycloak/data/import \
    quay.io/keycloak/keycloak:23.0 \
    start-dev --import-realm
