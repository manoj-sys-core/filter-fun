let originalImage = null;
let currentImage = null;

function loadImage() {
  const input = document.getElementById("imageUpload");
  const canvas = document.getElementById("canvas");

  originalImage = new SimpleImage(input);
  currentImage = new SimpleImage(input);
  currentImage.drawTo(canvas);
}

function ensureImageLoaded() {
  if (currentImage == null || !currentImage.complete()) {
    alert("Image not loaded or still loading!");
    return false;
  }
  return true;
}

function applyGrayscale() {
  if (!ensureImageLoaded()) return;

  let grayImage = new SimpleImage(currentImage);
  for (let pixel of grayImage.values()) {
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  grayImage.drawTo(document.getElementById("canvas"));
  currentImage = grayImage;
}

function applyRed() {
  if (!ensureImageLoaded()) return;

  let redImage = new SimpleImage(currentImage);
  for (let pixel of redImage.values()) {
    let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  redImage.drawTo(document.getElementById("canvas"));
  currentImage = redImage;
}

function applyBlur() {
  if (!ensureImageLoaded()) return;

  let blurImage = new SimpleImage(currentImage.getWidth(), currentImage.getHeight());
  for (let pixel of currentImage.values()) {
    let x = pixel.getX();
    let y = pixel.getY();
    if (Math.random() > 0.5) {
      let nearbyX = x + Math.floor(Math.random() * 10) - 5;
      let nearbyY = y + Math.floor(Math.random() * 10) - 5;
      if (nearbyX >= 0 && nearbyX < currentImage.getWidth() && nearbyY >= 0 && nearbyY < currentImage.getHeight()) {
        blurImage.setPixel(x, y, currentImage.getPixel(nearbyX, nearbyY));
      } else {
        blurImage.setPixel(x, y, pixel);
      }
    } else {
      blurImage.setPixel(x, y, pixel);
    }
  }
  blurImage.drawTo(document.getElementById("canvas"));
  currentImage = blurImage;
}

function resetImage() {
  if (originalImage == null || !originalImage.complete()) {
    alert("No image loaded to reset!");
    return;
  }

  currentImage = new SimpleImage(originalImage);
  currentImage.drawTo(document.getElementById("canvas"));
}
