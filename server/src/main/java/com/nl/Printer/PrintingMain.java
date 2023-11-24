package com.nl.Printer;

import com.nl.domain.Product;

import java.awt.print.PrinterException;
import java.util.List;

public class PrintingMain {

    public static void printAll(        final List<Product> productList) throws PrinterException {

        productList.forEach(product -> {
        for (int c = 0; c < product.getQuantidade(); c++) {
            try {
                TextOverlay.create(product.getNome());
            } catch (PrinterException e) {
                throw new RuntimeException(e);
            }
        }
        });

    }

}
