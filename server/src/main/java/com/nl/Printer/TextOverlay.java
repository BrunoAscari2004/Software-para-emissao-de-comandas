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
import java.util.Objects;

/**
 *
 */
public class TextOverlay extends JPanel {

    PrinterJob printerJob = PrinterJob.getPrinterJob();
    private BufferedImage image;

    public TextOverlay(String productName) throws PrinterException {
        try {
            image = ImageIO.read(
                Objects.requireNonNull(getClass().getResourceAsStream("/ValePastelNoTextLargeWhite.png")));
        } catch (IOException e) {
            e.printStackTrace();
        }
        image = adicionaFraseNaImagem(image, productName);

        ImagePrintPage imagePrintPage = new ImagePrintPage(image);


        PageFormat pageFormat = this.criarPageFormat();

        printerJob.setPrintable(imagePrintPage, pageFormat);

            printerJob.print();

    }

    private PageFormat criarPageFormat() {
        PageFormat pageFormat = new PageFormat();

        Paper paper = new Paper();

        double widthMM = 100;
        //altura do papel
        double heightMM = 130;

        double widthInch = widthMM * 2;

        paper.setSize(widthInch * 6, heightMM * 3);

        double marginValue = 10;

        double marginLeft = marginValue - 4;
        double marginRight = widthInch - marginValue;

        double marginTop = marginValue - 4;
        double marginBottom = heightMM - marginValue;


        paper.setImageableArea(marginLeft - 0.32, marginTop - 0.32, marginRight - marginLeft + (3 * marginValue) + 1.46,
            marginBottom - marginTop + (22 * marginValue + 4.76));


        pageFormat.setPaper(paper);
        return pageFormat;
    }

    public static void create(String productName) throws PrinterException {

        new TextOverlay(productName);

    }

    private BufferedImage adicionaFraseNaImagem(BufferedImage image, String produto) {
        int w = image.getWidth() / 2;
        int h = image.getHeight() / 2;
        BufferedImage img = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = img.createGraphics();
        g2d.drawImage(image, 0, 30, w, h, this);
        g2d.setPaint(Color.black);
        g2d.setFont(new Font("Sans-serif", Font.PLAIN, 35));
        String s = "Vale 1 " + produto;
        FontMetrics fm = g2d.getFontMetrics();
        int x = (img.getWidth() - fm.stringWidth(s)) / 2;
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
}
