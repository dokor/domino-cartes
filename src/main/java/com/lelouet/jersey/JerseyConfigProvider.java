package com.lelouet.jersey;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;

import org.glassfish.jersey.server.ResourceConfig;

import com.coreoz.plume.jersey.errors.WsJacksonJsonProvider;
import com.coreoz.plume.jersey.errors.WsResultExceptionMapper;
import com.coreoz.plume.jersey.java8.TimeParamProvider;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import com.coreoz.plume.jersey.security.permission.RequireExplicitAccessControlFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Jersey configuration
 */
@Singleton
public class JerseyConfigProvider implements Provider<ResourceConfig> {

	private final ResourceConfig config;

	@Inject
	public JerseyConfigProvider(ObjectMapper objectMapper) {
		config = new ResourceConfig();

		// this package will be scanned by Jersey to discover web-service classes
		config.packages("com.coreoz.webservices");

		// filters configuration
		// handle errors and exceptions
		config.register(WsResultExceptionMapper.class);
		// require explicit access control on API
		config.register(RequireExplicitAccessControlFeature.accessControlAnnotations(PublicApi.class));
		// to debug web-service requests
		// register(LoggingFeature.class);

		// java 8
		config.register(TimeParamProvider.class);

		// WADL is like swagger for jersey
		// by default it should be disabled to prevent leaking API documentation
		config.property("jersey.config.server.wadl.disableWadl", true);

		// jackson mapper configuration
		WsJacksonJsonProvider jacksonProvider = new WsJacksonJsonProvider();
		jacksonProvider.setMapper(objectMapper);
		config.register(jacksonProvider);
	}

	@Override
	public ResourceConfig get() {
		return config;
	}

}