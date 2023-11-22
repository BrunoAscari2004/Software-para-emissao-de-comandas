package com.nl.exceptions;

public class NlMsgErroException extends Exception {

	private static final long serialVersionUID = -6965036355089243942L;

	public NlMsgErroException() {
		super();
	}

	public NlMsgErroException(String error) {
		super(error);
	}

	public NlMsgErroException(Throwable throwable) {
		super(throwable);
	}

	public NlMsgErroException(String error, Throwable throwable) {
		super(error, throwable);
	}

}
