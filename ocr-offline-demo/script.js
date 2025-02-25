// Erstelle einen Tesseract Worker und verweise auf den lokalen tessdata-Ordner
const worker = Tesseract.createWorker({
    logger: m => console.log(m),
    langPath: './tessdata'
  });
  
  (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.loadLanguage('deu');
    await worker.initialize('eng+deu');
  
    const imageInput = document.getElementById('image-input');
    const ocrResult = document.getElementById('ocr-result');
  
    imageInput.addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      ocrResult.textContent = 'Erkennung läuft...';
      try {
        const { data: { text } } = await worker.recognize(file);
        ocrResult.textContent = text;
      } catch (error) {
        ocrResult.textContent = 'Fehler beim Erkennen: ' + error.message;
      }
    });
  })();
  