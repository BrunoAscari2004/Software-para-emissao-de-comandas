package com.bgjm.domain;

import java.io.Serializable;

public interface NlEntity {

	Serializable getPK();

	void setPK(Serializable pk);

	boolean isNovo();

	void load();

	void clearPK();

	void clearSequence();

}
