
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import jsPDF from 'jspdf'
import { useGraficoReferenced } from '@/hooks/useReportes'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Country, } from '@/index'

interface Props {
    countriesList: undefined | Country[];
}


const GeneratePDF = ({countriesList}: Props) => {
    const { graficoRef1, graficoRef2, graficoRef3,
        program, year, country, gender, status, 
        betterYear, worstYear, totalStudents 
     } = useGraficoReferenced();
    const t = useTranslations(`staffPage`);
    const u = useTranslations(`report`);

    const countryToRender = countriesList?.find((c: Country) => c.countryId === country)?.countryName;

    const generarPdf = () => {
        if (graficoRef1.current && graficoRef2.current) {
          const graph1 = graficoRef1.current;
          const graph2 = graficoRef2.current;
          const graph3 = graficoRef3.current ? graficoRef3.current : null;
          const doc = new jsPDF();
    
          const addImageToPDF = (canvas: any, yPosition: number, isSquare: boolean = false) => {
            const imgData = canvas.toDataURL(`image/png`);
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = isSquare ? doc.internal.pageSize.getWidth() - 120 : doc.internal.pageSize.getWidth() - 70;
            const pdfHeight = isSquare ? pdfWidth : (imgProps.height * pdfWidth) / imgProps.width * 0.75;
            const xPosition = (doc.internal.pageSize.getWidth() - pdfWidth) / 2;
            doc.addImage(imgData, `PNG`, xPosition, yPosition, pdfWidth, pdfHeight);
            return yPosition + pdfHeight;
          };
    
          const addHeaderAndFooter = (pageNumber:number) => {
            const date = new Date().toLocaleDateString(`en-GB`);
            doc.setFontSize(10);
            doc.text(`${date}`, 10, 10);
            doc.text(`${t('page')} ${pageNumber}`, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 20);
          };
    
          html2canvas(graph1).then(canvas1 => {
            addHeaderAndFooter(1);
            doc.setFontSize(12);
            doc.text(`${u(`title`)}`, doc.internal.pageSize.getWidth() / 2, 20, { align: `center` });
            doc.setFontSize(10);
            if (!graph3) {
              doc.text(`${u(`country`)}:`, doc.internal.pageSize.getWidth() / 2, 25, { align: `center` });
            }
            doc.text(`${u('disclaimer')}`, 10, 40, { maxWidth: doc.internal.pageSize.getWidth() - 20 });
    
            // doc.setFontSize(12);
            // doc.text(`${u('generalReportLabel')}`, 10, 55);
            // doc.setFontSize(10);
            // doc.text(`${u('info')}:`, 10, 60);
    
           
           
    
            html2canvas(graph2).then(canvas2 => {
              
              
              
              doc.setFontSize(12);
              doc.text(`${u('especificReportLabel')} : `, 10, 50);
              doc.setFontSize(10);
              
              doc.text(`${t('maestria')}: ${program || `${u('emptyLabel')}`}`, 20, 60);
              doc.text(`${t('year')}: ${year || `${u('emptyLabel')}`}`, 20, 65);
              doc.text(`${u('genderLabel')}: ${gender === 'Masculino' ? t('labelMen') : gender === 'Femenino' ?t('labelWomen') : `${u('emptyLabel')}`}`, 20, 70);
              doc.text(`${u('approvedLabel')} ${status === 'S' ? 'Si aprovados' : status === 'N' ? 'No aprovados' : `${u('emptyLabel')}`}`, 20, 75);
              if (graph3) {
                doc.text(`${u('country')}: ${countryToRender? countryToRender : `${u('emptyLabel')}`}`, 20, 80);
                
              }
              doc.text(`${u('totalStudentsLabel')}${totalStudents}`, 10, 90);
              let yPosition = addImageToPDF(canvas1, 110, false);
            
              yPosition += 10;
              doc.text(`${u('graph1Label')}`, doc.internal.pageSize.getWidth() / 2, yPosition, { align: `center` });
              yPosition += 10;
              doc.text(`${u('mostyear')} ${betterYear}`, 10, yPosition);
              yPosition += 5;
              doc.text(`${u('lessyear')} ${worstYear}`, 10, yPosition);

              //year graph

              doc.addPage();
              addHeaderAndFooter(2);
              // gender graph
              yPosition = addImageToPDF(canvas2, 80, false);
              yPosition += 10;
              doc.text(`${u('graph2Label')}`, doc.internal.pageSize.getWidth() / 2, yPosition, { align: `center` });
    
              
    
              //country graph
    
              if (graph3) {
                html2canvas(graph3).then(canvas3 => {
                  yPosition = addImageToPDF(canvas3, 150, true);
                  yPosition += 10;
                  doc.text(`${u('graph3Label')}`, doc.internal.pageSize.getWidth() / 2, yPosition, { align: `center` });
                  doc.save(`report.pdf`);
                });
              } else {
                doc.save(`report.pdf`);
              }
            });
          });
        }
      };

  return (
    <div className='w-full '>
       
        <Button className="w-full" onClick={generarPdf}> 
            {t(`btnReport`)}
        </Button>
        <p className='my-3'>
            **{t(`reportText`)}
        </p>
    </div>
   
  )
}

export default GeneratePDF