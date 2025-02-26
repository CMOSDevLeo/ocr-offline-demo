// Erstelle einen Tesseract Worker und verweise auf den lokalen tessdata-Ordner
const worker = Tesseract.createWorker({
  logger: m => console.log('Tesseract:', m),
  langPath: './tessdata'
});

(async () => {
  console.log('Starte Worker-Initialisierung...');

  try {
    console.log('Lade Worker...');
    await worker.load();
    console.log('Worker erfolgreich geladen.');

    console.log('Lade Englisch-Sprachpaket (eng.traineddata)...');
    await worker.loadLanguage('eng');
    console.log('Englisch-Sprachpaket erfolgreich geladen.');

    console.log('Lade Deutsch-Sprachpaket (deu.traineddata)...');
    await worker.loadLanguage('deu');
    console.log('Deutsch-Sprachpaket erfolgreich geladen.');

    console.log('Initialisiere Worker mit den Sprachen eng+deu...');
    await worker.initialize('eng+deu');
    console.log('Worker erfolgreich initialisiert.');
  } catch (error) {
    console.error('Fehler beim Laden oder Initialisieren des Workers:', error);
    return; // Abbruch, falls ein Fehler auftritt
  }

  const imageInput = document.getElementById('image-input');
  const ocrResult = document.getElementById('ocr-result');

  imageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn('Keine Datei ausgewählt.');
      return;
    }

    ocrResult.textContent = 'Erkennung läuft...';
    try {
      console.log(`Starte OCR-Erkennung für Datei: ${file.name}`);
      const { data: { text } } = await worker.recognize(file);
      console.log('OCR-Erkennung abgeschlossen.');
      ocrResult.textContent = text;
    } catch (error) {
      console.error('Fehler bei der OCR-Erkennung:', error);
      ocrResult.textContent = 'Fehler beim Erkennen: ' + error.message;
    }
  });
})();
