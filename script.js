document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const metaTextInput = document.getElementById('metaTextInput');
    const processBtn = document.getElementById('processBtn');
    const outputSection = document.getElementById('outputSection');
    const resultImage = document.getElementById('resultImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyDataBtn = document.getElementById('copyDataBtn');

    let selectedFile = null;

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = `Selected: ${selectedFile.name}`;
        }
    });

    processBtn.addEventListener('click', () => {
        if (!selectedFile) {
            alert('Jani pehle koi emoji ya picture toh select karo!');
            return;
        }

        const secretText = metaTextInput.value.trim();
        if (!secretText) {
            alert('Jani background mein hide karne ke liye kuch text toh likho!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const dataUrl = canvas.toDataURL('image/png');

                resultImage.src = dataUrl;
                outputSection.classList.remove('hidden');

                downloadBtn.href = dataUrl;
                downloadBtn.download = `nawab_secure_${selectedFile.name.split('.')[0]}.png`;

                copyDataBtn.onclick = () => {
                    navigator.clipboard.writeText(secretText);
                    alert('Hidden metadata text copied to clipboard successfully!');
                };

                outputSection.scrollIntoView({ behavior: 'smooth' });
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    });
});
