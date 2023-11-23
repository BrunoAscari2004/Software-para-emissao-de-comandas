package com.nl.Printer;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.print.*;
import java.io.File;
import java.io.IOException;

public class PrinterMain {
    public static void printComanda() throws Exception {

        String filePath = "/home/bruno.ascari@intranetnl.com.br/Software-para-emissão-de-comandas/server/src/main/java/com/nl/Printer/SagradaTeste.png";

        File file = new File(filePath);

        String fileName = file.getName();

        if(fileName.contains(".png") || fileName.contains(".jpeg")) {

            try {

                BufferedImage image = ImageIO.read(file);

                ImagePrintPage imagePrintPage = new ImagePrintPage(image);

                PrinterJob printerJob = PrinterJob.getPrinterJob();

                printerJob.setPrintable(imagePrintPage);


                PageFormat pageFormat = new PageFormat();


                Paper paper = new Paper();

                double widthMM = 100;
                double heightMM = 120;

                double widthInch = widthMM * 2;
                double heightInch = heightMM;

                paper.setSize(widthInch * 6, heightInch * 3);

                double marginValue = 10;

                double marginLeft = marginValue - 4;
                double marginRight = widthInch - marginValue;

                double marginTop = marginValue - 4;
                double marginBottom = heightInch - marginValue;


                paper.setImageableArea(marginLeft - 0.32, marginTop - 0.32, marginRight - marginLeft + (3 * marginValue) + 1.46, marginBottom - marginTop + (22 * marginValue + 4.76));


                pageFormat.setPaper(paper);

                printerJob.setPrintable(imagePrintPage, pageFormat);

                try {
                    printerJob.print();
                } catch (PrinterException e) {
                    e.printStackTrace();
                }


            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        else{
            throw new Exception("File to print does not exist! Or the type does not correspond to .jpeg or .png!");
        }
    }

}
