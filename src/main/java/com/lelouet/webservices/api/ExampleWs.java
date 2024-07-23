package com.lelouet.webservices.api;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.coreoz.plume.jersey.security.permission.PublicApi;

import com.lelouet.services.configuration.ConfigurationService;
import com.lelouet.webservices.api.data.Test;
import io.swagger.v3.oas.annotations.Parameter;

@Path("/example")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PublicApi
@Singleton
public class ExampleWs {

	private final ConfigurationService configurationService;
	
	@Inject
	public ExampleWs(ConfigurationService configurationService) {
		this.configurationService = configurationService;
	}

	@GET
	@Path("/test/{name}")
	public Test test(@Parameter(required = true) @PathParam("name") String name) {
		return new Test("hello " + name + "\n" + configurationService.hello());
	}
	
}
