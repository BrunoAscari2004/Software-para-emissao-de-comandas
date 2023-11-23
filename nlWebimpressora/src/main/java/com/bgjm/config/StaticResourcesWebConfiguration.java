package com.bgjm.config;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;
import org.springframework.web.servlet.resource.VersionResourceResolver;

@Configuration
public class StaticResourcesWebConfiguration implements WebMvcConfigurer {

    protected static final String[] RESOURCE_LOCATIONS = new String[]{
        "classpath:/static/app/",
        "classpath:/static/content/",
        "classpath:/static/i18n/",
		"classpath:/helps/",
    };
    protected static final String[] RESOURCE_PATHS = new String[]{
		"/app/*",
		"/content/*",
		"/i18n/*",
		"/helps/**"
	};

    @Value("${nl.cache.static.time.days}")
    private Long daysCache;

    public StaticResourcesWebConfiguration() {
        //Empty
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        ResourceHandlerRegistration resourceHandlerRegistration = appendResourceHandler(registry);
        initializeResourceHandler(resourceHandlerRegistration);
    }

    protected ResourceHandlerRegistration appendResourceHandler(final ResourceHandlerRegistry registry) {
        return registry.addResourceHandler(RESOURCE_PATHS);
    }

    protected void initializeResourceHandler(final ResourceHandlerRegistration resourceHandlerRegistration) {
        resourceHandlerRegistration.addResourceLocations(RESOURCE_LOCATIONS)
			.setCacheControl(getCacheControl())
			.resourceChain(true)
			.addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
    }

    protected CacheControl getCacheControl() {
        return CacheControl.maxAge(daysCache, TimeUnit.DAYS).cachePublic();
    }

}
