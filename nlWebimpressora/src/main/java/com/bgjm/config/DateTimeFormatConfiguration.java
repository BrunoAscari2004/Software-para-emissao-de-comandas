package com.bgjm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.format.datetime.DateFormatterRegistrar;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configure the converters to use the ISO format for dates by default.
 */
@Configuration
public class DateTimeFormatConfiguration implements WebMvcConfigurer {

    @Override
    public void addFormatters(final FormatterRegistry registry) {
        DateTimeFormatterRegistrar dthReg = new DateTimeFormatterRegistrar();
		dthReg.setUseIsoFormat(true);
		dthReg.registerFormatters(registry);

		DateFormatterRegistrar dtaReg = new DateFormatterRegistrar();
		dtaReg.setFormatter(new DateFormatter("dd-MM-yyyy"));
		dtaReg.registerFormatters(registry);
    }
}
