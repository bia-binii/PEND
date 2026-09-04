let latitude = null;
let longitude = null;
let accuracy = null;
let cameraStream = null;
let capturedImage = null; 
let captureDate = null;   

const sky = document.getElementById("sky");
const progressNav = document.getElementById("progress");

const stage = document.getElementById("stage");
const screens = {
  intro: document.getElementById("screen-intro"),
  location: document.getElementById("screen-location"),
  camera: document.getElementById("screen-camera"),
  building: document.getElementById("screen-building"),
  final: document.getElementById("screen-final"),
};

const btnStart = document.getElementById("btn-start");

const locationLoading = document.getElementById("location-loading");
const locationResult = document.getElementById("location-result");
const locationError = document.getElementById("location-error");
const locationErrorDetail = document.getElementById("location-error-detail");
const btnRetryLocation = document.getElementById("btn-retry-location");
const btnToCamera = document.getElementById("btn-to-camera");

const locLatitudeEl = document.getElementById("loc-latitude");
const locLongitudeEl = document.getElementById("loc-longitude");
const locAccuracyEl = document.getElementById("loc-accuracy");

const cameraIntro = document.getElementById("camera-intro");
const cameraLoading = document.getElementById("camera-loading");
const cameraView = document.getElementById("camera-view");
const cameraError = document.getElementById("camera-error");
const cameraErrorDetail = document.getElementById("camera-error-detail");
const btnActivateCamera = document.getElementById("btn-activate-camera");
const btnRetryCamera = document.getElementById("btn-retry-camera");

const video = document.getElementById("video");
const photoPreview = document.getElementById("photo-preview");
const canvas = document.getElementById("canvas");

const cameraControlsLive = document.getElementById("camera-controls-live");
const cameraControlsReview = document.getElementById("camera-controls-review");
const btnCapture = document.getElementById("btn-capture");
const btnRetake = document.getElementById("btn-retake");
const btnUsePhoto = document.getElementById("btn-use-photo");

const capsulePhoto = document.getElementById("capsule-photo");
const capsuleLatLong = document.getElementById("capsule-latlong");
const capsuleAccuracy = document.getElementById("capsule-accuracy");
const capsuleDate = document.getElementById("capsule-date");
const capsuleTime = document.getElementById("capsule-time");

const btnRestart = document.getElementById("btn-restart");

// fundo

function buildSky() {
  const starCount = window.innerWidth < 480 ? 60 : 110;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    star.className = "star";
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    fragment.appendChild(star);
  }

  const orbA = document.createElement("span");
  orbA.className = "glow-orb";
  orbA.style.cssText = "width:320px;height:320px;top:-80px;left:-100px;background:#6C63FF;";
  const orbB = document.createElement("span");
  orbB.className = "glow-orb";
  orbB.style.cssText = "width:260px;height:260px;bottom:-60px;right:-80px;background:#A78BFA;";

  fragment.appendChild(orbA);
  fragment.appendChild(orbB);
  sky.appendChild(fragment);
}


function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.remove("screen--active"));
  screens[name].classList.add("screen--active");

  if (name === "intro" || name === "building") {
    progressNav.hidden = true;
  } else {
    progressNav.hidden = false;
    updateProgress(name);
  }
}

function updateProgress(currentScreen) {
  const stepKeyByScreen = { location: "location", camera: "photo", final: "capsule" };
  const currentKey = stepKeyByScreen[currentScreen];

  document.querySelectorAll(".progress-step").forEach((stepEl) => {
    const step = stepEl.dataset.step;
    stepEl.classList.remove("is-current", "is-done");

    if (step === currentKey) {
      stepEl.classList.add("is-current");
    } else {
      const stepOrder = { location: 0, photo: 1, capsule: 2 };
      if (stepOrder[step] < stepOrder[currentKey]) {
        stepEl.classList.add("is-done");
      }
    }
  });
}

function showPanel(container, panelToShow) {
  container.querySelectorAll(":scope > .panel, :scope > .camera-view").forEach((el) => {
    el.hidden = true;
  });
  panelToShow.hidden = false;
}

// API geolocation

function startLocationStep() {
  showScreen("location");
  showPanel(screens.location, locationLoading);
  requestLocation();
}

function requestLocation() {
  if (!navigator.geolocation) {
    showLocationError("Seu navegador não é compatível com a Geolocation API. Tente usar um navegador mais recente.");
    return;
  }

  showPanel(screens.location, locationLoading);

  navigator.geolocation.getCurrentPosition(
    onLocationSuccess,
    onLocationError,
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
}

function onLocationSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  accuracy = position.coords.accuracy;

  locLatitudeEl.textContent = latitude.toFixed(6);
  locLongitudeEl.textContent = longitude.toFixed(6);
  locAccuracyEl.textContent = `${Math.round(accuracy)} metros`;

  showPanel(screens.location, locationResult);
}

function onLocationError(error) {
  let message = "Não foi possível obter sua localização. Tente novamente.";

  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = "O acesso à localização foi negado. Verifique as permissões do navegador e tente novamente.";
      break;
    case error.POSITION_UNAVAILABLE:
      message = "Não foi possível determinar sua localização no momento.";
      break;
    case error.TIMEOUT:
      message = "A localização demorou muito para responder. Tente novamente.";
      break;
  }

  showLocationError(message);
}

function showLocationError(message) {
  locationErrorDetail.textContent = message;
  showPanel(screens.location, locationError);
}

// API camera

function startCameraStep() {
  showScreen("camera");
  showPanel(screens.camera, cameraIntro);
}

async function activateCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showCameraError("Seu navegador não é compatível com o acesso à câmera.");
    return;
  }

  showPanel(screens.camera, cameraLoading);

  const constraintsPrimary = { video: { facingMode: "user" }, audio: false };
  const constraintsFallback = { video: true, audio: false };

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia(constraintsPrimary);
  } catch (primaryError) {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia(constraintsFallback);
    } catch (fallbackError) {
      handleCameraError(fallbackError);
      return;
    }
  }

  video.srcObject = cameraStream;
  video.hidden = false;
  photoPreview.hidden = true;

  showPanel(screens.camera, cameraView);
  cameraControlsLive.hidden = false;
  cameraControlsReview.hidden = true;
}

function handleCameraError(error) {
  let message = "Não foi possível acessar a câmera. Você pode tentar novamente.";

  switch (error.name) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      message = "O acesso à câmera foi negado. Verifique as permissões do navegador e tente novamente.";
      break;
    case "NotFoundError":
    case "DevicesNotFoundError":
      message = "Nenhuma câmera foi encontrada neste dispositivo.";
      break;
    case "NotReadableError":
    case "TrackStartError":
      message = "A câmera parece estar sendo usada por outro aplicativo.";
      break;
    case "OverconstrainedError":
      message = "Não foi possível atender às configurações solicitadas para a câmera.";
      break;
    case "SecurityError":
      message = "O acesso à câmera foi bloqueado neste contexto. É necessário HTTPS ou localhost.";
      break;
  }

  showCameraError(message);
}

function showCameraError(message) {
  cameraErrorDetail.textContent = message;
  showPanel(screens.camera, cameraError);
}

function stopCameraStream() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }
}

// foto

function capturePhoto() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  if (!width || !height) return;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  ctx.translate(width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0, width, height);

  capturedImage = canvas.toDataURL("image/png");

  video.hidden = true;
  photoPreview.src = capturedImage;
  photoPreview.hidden = false;

  cameraControlsLive.hidden = true;
  cameraControlsReview.hidden = false;
}

function retakePhoto() {
  capturedImage = null;
  photoPreview.hidden = true;
  photoPreview.removeAttribute("src");
  video.hidden = false;

  cameraControlsLive.hidden = false;
  cameraControlsReview.hidden = true;
}


function buildCapsule() {
  stopCameraStream();
  captureDate = new Date();

  showScreen("building");

  window.setTimeout(() => {
    populateFinalScreen();
    showScreen("final");
  }, 1400);
}

function populateFinalScreen() {
  capsulePhoto.src = capturedImage;

  capsuleLatLong.textContent = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
  capsuleAccuracy.textContent = `Precisão de ${Math.round(accuracy)} metros`;

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  capsuleDate.textContent = dateFormatter.format(captureDate);
  capsuleTime.textContent = timeFormatter.format(captureDate);
}


function resetApp() {
  latitude = null;
  longitude = null;
  accuracy = null;
  capturedImage = null;
  captureDate = null;

  stopCameraStream();

  video.removeAttribute("src");
  photoPreview.removeAttribute("src");
  photoPreview.hidden = true;
  video.hidden = false;

  locLatitudeEl.textContent = "—";
  locLongitudeEl.textContent = "—";
  locAccuracyEl.textContent = "—";

  capsulePhoto.removeAttribute("src");
  capsuleLatLong.textContent = "—";
  capsuleAccuracy.textContent = "—";
  capsuleDate.textContent = "—";
  capsuleTime.textContent = "—";

  showScreen("intro");
}

// eventos

btnStart.addEventListener("click", startLocationStep);

btnRetryLocation.addEventListener("click", requestLocation);
btnToCamera.addEventListener("click", startCameraStep);

btnActivateCamera.addEventListener("click", activateCamera);
btnRetryCamera.addEventListener("click", activateCamera);

btnCapture.addEventListener("click", capturePhoto);
btnRetake.addEventListener("click", retakePhoto);
btnUsePhoto.addEventListener("click", buildCapsule);

btnRestart.addEventListener("click", resetApp);


window.addEventListener("beforeunload", stopCameraStream);
window.addEventListener("pagehide", stopCameraStream);


buildSky();
showScreen("intro");