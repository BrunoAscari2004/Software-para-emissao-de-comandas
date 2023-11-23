package com.bgjm.exceptions;


public class NlMsgRuntimeErrorException extends RuntimeException {

	private static final long serialVersionUID = -6965036355089243942L;

	public NlMsgRuntimeErrorException() {
		super();
	}

	public NlMsgRuntimeErrorException(String error) {
		super(error);
	}

	public NlMsgRuntimeErrorException(Throwable throwable) {
		super(throwable);
	}

	public NlMsgRuntimeErrorException(String error, Throwable throwable) {
		super(error, throwable);
	}

}
