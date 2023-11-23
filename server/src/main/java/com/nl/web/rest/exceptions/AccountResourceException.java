package com.nl.web.rest.exceptions;

public class AccountResourceException extends RuntimeException {
    private static final long serialVersionUID = 1759693293025034971L;

    public AccountResourceException(final String message) {
        super(message);
    }
}
