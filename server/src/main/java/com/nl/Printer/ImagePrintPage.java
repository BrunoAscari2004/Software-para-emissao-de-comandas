package com.nl.Printer;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.awt.print.PrinterException;

public class ImagePrintPage implements Printable {

    private BufferedImage imageToPrint;

    public ImagePrintPage(BufferedImage image){
        this.imageToPrint = image;
    }

    public int print(Graphics g, PageFormat pf, int pageIndex) throws PrinterException {
        if (pageIndex > 0) {
            return Printable.NO_SUCH_PAGE;
        }
        Graphics2D g2d = (Graphics2D) g;

        double imageWidth = imageToPrint.getWidth();
        double imageHeight = imageToPrint.getHeight();

        double pageWidth = pf.getImageableWidth();
        double pageHeight = pf.getImageableHeight();

        double scale = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);

        int width = (int) (imageWidth*1.2 * scale);
        int height = (int) (imageHeight*1.2 * scale);


        // Define border height

        // Calculate the adjusted position for the image (centered with border on top)
        int x = (int) ((pageWidth - width)+15 );
        int y = (int) (((pageHeight - height) -180) );

        System.out.println("x:");
        System.out.println(x);
        System.out.println("y:");
        System.out.println(y);




        // Adjust the y position for the image to leave space for the border


        // Draw the image with the adjusted position
        g2d.drawImage(imageToPrint, x, y, width, height, null);
        return Printable.PAGE_EXISTS;
    }




}
