package com.nl.web.rest;

import com.nl.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hello")
public class HelloResource {

    private final Logger log = LoggerFactory.getLogger(HelloResource.class);

    @GetMapping()
    public ResponseEntity<String> getHelloString() {
        log.debug("Teste de API Hello!");
        return new ResponseEntity<>(
            "Hello " + SecurityUtils.getCurrentUserLogin().orElse("Nobody") + "!", null, HttpStatus.OK);
    }
}
