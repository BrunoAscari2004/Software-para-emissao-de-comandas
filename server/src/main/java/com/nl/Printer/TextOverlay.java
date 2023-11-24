package com.nl.Printer;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.File;
import java.io.IOException;

/**
 */
public class TextOverlay extends JPanel {

    private BufferedImage image;
    PrinterJob printerJob = PrinterJob.getPrinterJob();

    public TextOverlay(String productName) throws PrinterException {
        try {
            image = ImageIO.read(new File("/home/bruno.ascari@intranetnl.com.br/IdeaProjects/TesteDireto/src/ValePastelNoTextLargeWhite.png"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        image = process(image,productName);

        ImagePrintPage imagePrintPage = new ImagePrintPage(image);


        PageFormat pageFormat = new PageFormat();

        Paper paper = new Paper();

        double widthMM = 100;
        //altura do papel
        double heightMM = 130;

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

        printerJob.print();
    }

    private BufferedImage process(BufferedImage old,String productName) {
        int w = old.getWidth() / 2;
        int h = old.getHeight() / 2;
        BufferedImage img = new BufferedImage(
            w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = img.createGraphics();
        g2d.drawImage(old, 0, 30, w, h, this);
        g2d.setPaint(Color.black);
        g2d.setFont(new Font("Sans-serif", Font.TRUETYPE_FONT, 35));
        String s = "Vale 1 " + productName;
        FontMetrics fm = g2d.getFontMetrics();
        int x = (img.getWidth() - fm.stringWidth(s))/2  ;
        int y = fm.getHeight() + 320;
        g2d.drawString(s, x, y);
        g2d.dispose();
        return img;
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.drawImage(image, 0, 0, null);
    }

    public static void create(String productName) throws PrinterException {
        JFrame f = new JFrame();
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.add(new TextOverlay(productName));
        f.pack();
        f.setVisible(true);
    }
}
