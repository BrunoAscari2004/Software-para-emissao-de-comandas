package com.nl.repository.props;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class ProdutosParoquiaProps implements Serializable {
    private static final long serialVersionUID = -9108905580004582604L;

    //@Value()
    private String path;
    //@Value()
    private String folder;

    public ProdutosParoquiaProps(){
        super();
    }

    public String getPath(){
        return path;
    }

    public void setPath(final String path){
        this.path = path;
    }
    public String getFolder(){
        return folder;
    }

    public void setFolder(final String folder){
        this.folder = folder;
    }



}
