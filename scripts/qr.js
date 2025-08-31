let qrCanvas;

function generateQR() {
  const text = document.getElementById("qrText").value.trim();
  const size = parseInt(document.getElementById("qrSize").value);
  const color = document.getElementById("qrColor").value;
  const bg = document.getElementById("qrBg").value;
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";

  if (!text) {
    alert("Por favor ingresa un texto o URL");
    return;
  }

  qrCanvas = document.createElement("canvas");
  QRCode.toCanvas(qrCanvas, text, {
    width: size,
    color: { dark: color, light: bg }
  }, function (error) {
    if (error) console.error(error);
  });

  qrcodeDiv.appendChild(qrCanvas);
  document.getElementById("downloadBtns").classList.remove("hidden");
  document.getElementById("sizeLabel").innerText = size + " px";
}

function downloadQR(format) {
  if (!qrCanvas) return;
  const link = document.createElement("a");
  link.download = `qr-${Date.now()}.${format}`;
  link.href = qrCanvas.toDataURL(`image/${format}`);
  link.click();
}
