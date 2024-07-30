import React from 'react';
import { Document, Page, Image, StyleSheet,PDFViewer,View } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
        margin: 10,
    },
});

const ImageListPdf = ({ imageList }) => (
    <PDFViewer width="100%" height="800px">
        <Document>
            <Page style={styles.page} size="A4">
            
                <View>
                {
                
                        
                        imageList.map((liga,index) =>
                        <tr key={index}>
                            <td><img width="100" className="blob-to-image" src={"data:image/png;base64," + liga.fotoKwitansi}></img></td>
                           
                        </tr>
                    )
                   
                }
                

                </View>
               
            </Page>
        </Document>
    </PDFViewer>
);

export default ImageListPdf;