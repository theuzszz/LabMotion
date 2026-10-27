import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'LabMotion · Prévia multiturma',description:'Investigação guiada com dados didáticos e acompanhamento descritivo. Ambiente de validação.',robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="pt-BR"><body>{children}</body></html>;}
