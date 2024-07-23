package com.coreoz.webservices.internal;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.coreoz.plume.jersey.security.basic.BasicAuthenticator;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.coreoz.services.configuration.ConfigurationService;

import io.swagger.v3.core.util.Yaml;
import io.swagger.v3.jaxrs2.integration.JaxrsOpenApiContextBuilder;
import io.swagger.v3.oas.integration.SwaggerConfiguration;
import io.swagger.v3.oas.integration.api.OpenApiContext;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import lombok.SneakyThrows;

import java.util.List;
import java.util.Set;

@Path("/swagger")
@PublicApi
@Singleton
public class SwaggerWs {

    private final String swaggerDefinition;
    private final BasicAuthenticator<String> basicAuthenticator;

    @Inject
    @SneakyThrows
    public SwaggerWs(ConfigurationService configurationService) {
        // Basic configuration
        SwaggerConfiguration openApiConfig = new SwaggerConfiguration()
            .resourcePackages(Set.of("com.coreoz.webservices.api")) // The package will be different for your project
            .sortOutput(true)
            .openAPI(new OpenAPI().servers(List.of(
                new Server()
                    .url("/api")
                    .description("API plume-demo-admin") // The title is different for your project
            )));

        // Generation of the OpenApi object
        OpenApiContext context = new JaxrsOpenApiContextBuilder<>()
            .openApiConfiguration(openApiConfig)
            .buildContext(true);
        // the OpenAPI object can be changed to add security definition
        // or to alter the generated mapping
        OpenAPI openApi = context.read();

        // serialization of the Swagger definition
        this.swaggerDefinition = Yaml.mapper().writeValueAsString(openApi);

        // require authentication to access the API documentation
        this.basicAuthenticator = BasicAuthenticator.fromSingleCredentials(
            configurationService.swaggerAccessUsername(),
            configurationService.swaggerAccessPassword(),
            "API domino-cartes"
        );
    }

    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public String get(@Context ContainerRequestContext requestContext) throws JsonProcessingException {
        basicAuthenticator.requireAuthentication(requestContext);

        return swaggerDefinition;
    }

}

