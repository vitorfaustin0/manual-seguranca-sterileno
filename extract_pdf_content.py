import os
import PyPDF2
from pathlib import Path

def extract_pdf_text(pdf_path):
    """Extrai texto de um arquivo PDF"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Erro ao extrair texto de {pdf_path}: {e}")
        return ""

def main():
    # Diretório das ITOs
    itos_dir = Path("Itos de Segurança da Informação")
    
    if not itos_dir.exists():
        print("Diretório 'Itos de Segurança da Informação' não encontrado!")
        return
    
    # Processar cada PDF
    pdf_files = list(itos_dir.glob("*.pdf"))
    print(f"Encontrados {len(pdf_files)} arquivos PDF")
    
    for pdf_file in pdf_files:
        print(f"Processando: {pdf_file.name}")
        
        # Extrair texto
        text = extract_pdf_text(pdf_file)
        
        if text.strip():
            # Salvar como arquivo de texto
            txt_file = pdf_file.with_suffix('.txt')
            with open(txt_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"✅ Texto extraído salvo em: {txt_file}")
        else:
            print(f"⚠️ Nenhum texto extraído de: {pdf_file.name}")
    
    print("\n🎉 Extração concluída!")

if __name__ == "__main__":
    main()
