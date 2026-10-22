/**
 * PhotoTrack - Fotos com Geolocalização
 * Cliente Web 100% Client-Side (HTML5 Canvas + Geolocation + Nominatim OpenStreetMap)
 */

(function () {
  'use strict';

  // --- LOGOTIPO OFICIAL NOVACAP (BASE64) ---
  // Incorporado em Data URL para evitar tainted canvas / SecurityError em file:// e offline
  const NOVACAP_LOGO_DATA_URL = 'data:image/png;base64,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';

  // --- ELEMENTOS DO DOM ---
  const videoElem = document.getElementById('cameraVideo');
  const btnCapture = document.getElementById('btnCapture');
  const btnFlipCamera = document.getElementById('btnFlipCamera');
  const galleryInput = document.getElementById('galleryInput');
  const cameraFlash = document.getElementById('cameraFlash');
  const cameraFallbackNotice = document.getElementById('cameraFallbackNotice');
  const btnRetryCamera = document.getElementById('btnRetryCamera');
  const gpsStatusBadge = document.getElementById('gpsStatusBadge');
  const gpsStatusText = document.getElementById('gpsStatusText');

  // Pré-visualização ao vivo da estampa na tela de captura
  const liveWatermarkBanner = document.getElementById('liveWatermarkBanner');
  const btnToggleLiveBanner = document.getElementById('btnToggleLiveBanner');
  const liveLineAddress = document.getElementById('liveLineAddress');
  const liveLineCoords = document.getElementById('liveLineCoords');
  const liveLineDateTime = document.getElementById('liveLineDateTime');

  // Preview final e Loading
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingStatusText = document.getElementById('loadingStatusText');
  const previewScreen = document.getElementById('previewScreen');
  const previewImage = document.getElementById('previewImage');
  const previewCoordsLabel = document.getElementById('previewCoordsLabel');
  const btnClosePreview = document.getElementById('btnClosePreview');
  const btnRetake = document.getElementById('btnRetake');
  const btnSave = document.getElementById('btnSave');
  const btnShare = document.getElementById('btnShare');
  const captureCanvas = document.getElementById('captureCanvas');

  // Objeto de imagem do Logotipo Oficial pronto e em memória
  const logoImg = new Image();
  logoImg.src = NOVACAP_LOGO_DATA_URL;

  // --- ESTADO DA APLICAÇÃO ---
  let mediaStream = null;
  let currentFacingMode = 'environment';
  let lastGpsPosition = null;
  let gpsWatchId = null;
  let isProcessingCapture = false;
  let currentPhotoBlob = null;
  let currentPhotoFileName = '';

  // Cache para geocodificação ao vivo
  let cachedAddressData = null;
  let lastGeocodedCoords = null;
  let isGeocoding = false;

  // Mapeamento de Estados do Brasil para UF
  const BRAZIL_UF_MAP = {
    'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM',
    'Bahia': 'BA', 'Ceará': 'CE', 'Distrito Federal': 'DF', 'Espírito Santo': 'ES',
    'Goiás': 'GO', 'Maranhão': 'MA', 'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS',
    'Minas Gerais': 'MG', 'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR',
    'Pernambuco': 'PE', 'Piauí': 'PI', 'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN',
    'Rio Grande do Sul': 'RS', 'Rondônia': 'RO', 'Roraima': 'RR', 'Santa Catarina': 'SC',
    'São Paulo': 'SP', 'Sergipe': 'SE', 'Tocantins': 'TO'
  };

  // Nomes dos dias da semana em português
  const WEEK_DAYS = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];

  // ==========================================================================
  // INICIALIZAÇÃO
  // ==========================================================================

  async function init() {
    setupEventListeners();
    startLiveClock();
    initGeolocationWatch();
    await startCamera(currentFacingMode);
  }

  function setupEventListeners() {
    btnCapture.addEventListener('click', onCaptureClick);
    btnFlipCamera.addEventListener('click', toggleCamera);
    btnRetryCamera.addEventListener('click', () => startCamera(currentFacingMode));
    galleryInput.addEventListener('change', onGalleryImageSelected);

    if (btnToggleLiveBanner) {
      btnToggleLiveBanner.addEventListener('click', toggleLiveBanner);
    }

    btnClosePreview.addEventListener('click', closePreview);
    btnRetake.addEventListener('click', closePreview);
    btnSave.addEventListener('click', downloadCurrentPhoto);
    btnShare.addEventListener('click', shareCurrentPhoto);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !previewScreen.classList.contains('hidden')) {
        closePreview();
      }
    });
  }

  // ==========================================================================
  // RELÓGIO AO VIVO NA TELA DE CAPTURA
  // ==========================================================================

  function startLiveClock() {
    updateLiveDateTime();
    setInterval(updateLiveDateTime, 1000);
  }

  function updateLiveDateTime() {
    if (liveLineDateTime) {
      liveLineDateTime.textContent = formatLine3DateTime(new Date());
    }
  }

  function toggleLiveBanner() {
    if (!liveWatermarkBanner) return;
    const isCollapsed = liveWatermarkBanner.classList.toggle('collapsed');
    btnToggleLiveBanner.textContent = isCollapsed ? '👁️‍🗨️' : '👁️';
    btnToggleLiveBanner.title = isCollapsed ? 'Expandir prévia do carimbo' : 'Minimizar prévia do carimbo';
  }

  // ==========================================================================
  // GERENCIAMENTO DA CÂMERA
  // ==========================================================================

  async function startCamera(facingMode) {
    stopCamera();

    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    };

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('A API de mídia da câmera não é suportada neste navegador.');
      }

      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElem.srcObject = mediaStream;
      await videoElem.play();

      cameraFallbackNotice.classList.add('hidden');
    } catch (err) {
      console.warn('Tentando câmera com constraints básicas:', err);

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoElem.srcObject = mediaStream;
        await videoElem.play();
        cameraFallbackNotice.classList.add('hidden');
      } catch (fallbackErr) {
        console.warn('Aviso: câmera não disponível ou permissão pendente.', fallbackErr);
        cameraFallbackNotice.classList.remove('hidden');
      }
    }
  }

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = null;
    }
  }

  async function toggleCamera() {
    currentFacingMode = (currentFacingMode === 'environment') ? 'user' : 'environment';
    await startCamera(currentFacingMode);
  }

  // ==========================================================================
  // GEOLOCALIZAÇÃO (GPS) & ATUALIZAÇÃO AO VIVO
  // ==========================================================================

  function initGeolocationWatch() {
    if (!('geolocation' in navigator)) {
      updateGpsBadge('error', 'Sem suporte a GPS');
      if (liveLineCoords) liveLineCoords.textContent = 'Lat: Indisponível, Long: Indisponível';
      if (liveLineAddress) liveLineAddress.textContent = 'Endereço: Indisponível (Sem GPS)';
      return;
    }

    updateGpsBadge('searching', 'Buscando GPS...');
    if (liveLineCoords) liveLineCoords.textContent = 'Lat: Buscando..., Long: Buscando...';

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    };

    try {
      gpsWatchId = navigator.geolocation.watchPosition(
        (position) => {
          lastGpsPosition = position.coords;
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          updateGpsBadge('active', `GPS Ativo (${lat.toFixed(4)}, ${lon.toFixed(4)})`);
          
          if (liveLineCoords) {
            liveLineCoords.textContent = formatLine2Coordinates(position.coords);
          }

          checkAndUpdateLiveAddress(lat, lon);
        },
        (error) => {
          console.warn('Aviso de GPS:', error.message);
          if (!lastGpsPosition) {
            if (error.code === error.PERMISSION_DENIED) {
              updateGpsBadge('error', 'GPS Negado');
            } else {
              updateGpsBadge('error', 'GPS Indisponível');
            }
            if (liveLineCoords) liveLineCoords.textContent = 'Lat: Indisponível, Long: Indisponível';
            if (liveLineAddress) liveLineAddress.textContent = 'Endereço: Indisponível (Sem GPS)';
          }
        },
        options
      );
    } catch (e) {
      console.warn('Erro ao inicializar watchPosition:', e);
    }
  }

  function updateGpsBadge(status, text) {
    gpsStatusBadge.className = 'status-badge';
    if (status === 'active') {
      gpsStatusBadge.classList.add('status-active');
    } else if (status === 'searching') {
      gpsStatusBadge.classList.add('status-searching');
    } else {
      gpsStatusBadge.classList.add('status-error');
    }
    gpsStatusText.textContent = text;
  }

  async function checkAndUpdateLiveAddress(lat, lon) {
    if (isGeocoding) return;

    if (lastGeocodedCoords) {
      const dLat = Math.abs(lastGeocodedCoords.lat - lat);
      const dLon = Math.abs(lastGeocodedCoords.lon - lon);
      if (dLat < 0.0001 && dLon < 0.0001 && cachedAddressData) {
        return;
      }
    }

    isGeocoding = true;
    try {
      const address = await fetchReverseGeocode(lat, lon);
      if (address) {
        cachedAddressData = address;
        lastGeocodedCoords = { lat, lon };
        if (liveLineAddress) {
          liveLineAddress.textContent = formatLine1Address(address, true);
        }
      } else if (!cachedAddressData && liveLineAddress) {
        liveLineAddress.textContent = formatLine1Address(null, true);
      }
    } catch (e) {
      console.warn('Falha na atualização de endereço ao vivo:', e);
    } finally {
      isGeocoding = false;
    }
  }

  function getCurrentCoordinates() {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        return resolve(null);
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 5000
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          lastGpsPosition = pos.coords;
          resolve(pos.coords);
        },
        (err) => {
          console.warn('Timeout no GPS imediato, usando último conhecido:', err);
          resolve(lastGpsPosition || null);
        },
        options
      );
    });
  }

  // ==========================================================================
  // GEOCODIFICAÇÃO REVERSA (NOMINATIM / OPENSTREETMAP)
  // ==========================================================================

  async function fetchReverseGeocode(lat, lon) {
    if (!lat || !lon || !navigator.onLine) {
      return null;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=pt-BR`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data && data.address ? data.address : null;
    } catch (error) {
      console.warn('Falha na requisição Nominatim:', error);
      return null;
    }
  }

  // ==========================================================================
  // FORMATAÇÃO DAS 3 LINHAS DE TEXTO DA ESTAMPA
  // ==========================================================================

  function formatLine1Address(addressData, hasCoordinates) {
    if (!navigator.onLine || !addressData) {
      return 'Endereço: Indisponível (Sem Conexão)';
    }

    const logradouro = addressData.road ||
      addressData.pedestrian ||
      addressData.street ||
      addressData.avenue ||
      addressData.highway ||
      addressData.footway ||
      addressData.path ||
      addressData.place ||
      'Logradouro não informado';

    const numero = addressData.house_number || 'S/N';

    const bairro = addressData.suburb ||
      addressData.neighbourhood ||
      addressData.quarter ||
      addressData.city_district ||
      addressData.residential ||
      addressData.commercial ||
      addressData.industrial ||
      addressData.district ||
      'Bairro';

    const cidade = addressData.city ||
      addressData.town ||
      addressData.municipality ||
      addressData.village ||
      addressData.county ||
      'Brasília';

    let uf = '';
    if (addressData['ISO3166-2-lvl4']) {
      uf = addressData['ISO3166-2-lvl4'].replace('BR-', '');
    } else if (addressData.state && BRAZIL_UF_MAP[addressData.state]) {
      uf = BRAZIL_UF_MAP[addressData.state];
    } else if (addressData.state) {
      uf = addressData.state;
    } else {
      uf = 'DF';
    }

    const cep = addressData.postcode || addressData.postal_code || 'CEP Indisponível';

    return `${logradouro}, ${numero} - ${bairro}, ${cidade} - ${uf}, ${cep}`;
  }

  function formatLine2Coordinates(coords) {
    if (!coords || typeof coords.latitude !== 'number' || typeof coords.longitude !== 'number') {
      return 'Lat: Indisponível, Long: Indisponível';
    }
    const latStr = coords.latitude.toFixed(6);
    const lonStr = coords.longitude.toFixed(6);
    return `Lat: ${latStr}, Long: ${lonStr}`;
  }

  function formatLine3DateTime(date) {
    const dayOfWeek = WEEK_DAYS[date.getDay()];

    const pad = (n) => String(n).padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    let gmtString = '';
    if (Number.isInteger(offsetHours)) {
      gmtString = offsetHours >= 0 ? `GMT+${offsetHours}` : `GMT${offsetHours}`;
    } else {
      const whole = Math.trunc(offsetHours);
      const rem = Math.abs(offsetMinutes % 60);
      const sign = offsetHours >= 0 ? '+' : '-';
      gmtString = `GMT${sign}${Math.abs(whole)}:${pad(rem)}`;
    }

    return `${dayOfWeek}, ${day}/${month}/${year}, ${hours}:${minutes}:${seconds}, ${gmtString}`;
  }

  // ==========================================================================
  // RENDERIZAÇÃO DA ESTAMPA OFICIAL NO HTML5 CANVAS
  // ==========================================================================

  function renderWatermarkedCanvas(sourceMedia, width, height, line1, line2, line3) {
    const safeW = Math.max(width || 0, 800);
    const safeH = Math.max(height || 0, 600);

    const canvas = captureCanvas;
    canvas.width = safeW;
    canvas.height = safeH;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Desenha a foto original capturada
    ctx.drawImage(sourceMedia, 0, 0, safeW, safeH);

    // 2. Parâmetros e posições preliminares
    const logoMarginX = Math.round(safeW * 0.022);
    const logoAspect = 3.265; // Proporção exata do logotipo oficial NOVACAP (640x196)

    let logoW = Math.round(Math.min(safeW * 0.26, safeH * 0.35));
    let logoH = Math.round(logoW / logoAspect);

    const dividerX = logoMarginX + logoW + Math.round(safeW * 0.016);
    const textStartX = dividerX + Math.round(safeW * 0.016);
    const maxTextWidth = safeW - textStartX - Math.round(safeW * 0.022);

    // 3. Redimensionamento Inteligente: Garante que TODAS as informações caibam sem cortes
    const str1 = String(line1 || '');
    const str2 = String(line2 || '');
    const str3 = String(line3 || '');

    let fontSize = Math.max(12, Math.round(safeW * 0.019));
    ctx.font = `600 ${fontSize}px Arial, -apple-system, sans-serif`;

    const w1 = ctx.measureText(str1).width;
    const w2 = ctx.measureText(str2).width;
    const w3 = ctx.measureText(str3).width;
    const longestLineWidth = Math.max(w1, w2, w3);

    if (longestLineWidth > maxTextWidth && maxTextWidth > 50) {
      const scaleFactor = (maxTextWidth / longestLineWidth) * 0.98;
      fontSize = Math.max(10, Math.floor(fontSize * scaleFactor));
      ctx.font = `600 ${fontSize}px Arial, -apple-system, sans-serif`;
    }

    const lineHeight = Math.round(fontSize * 1.34);
    const totalTextBlockHeight = lineHeight * 2 + fontSize;

    // 4. Altura total da tarja proporcional
    const minTarjaHeight = Math.max(
      totalTextBlockHeight + Math.round(safeH * 0.045),
      logoH + Math.round(safeH * 0.035),
      Math.round(safeH * 0.12),
      Math.round(safeW * 0.088),
      140
    );
    const tarjaHeight = Math.min(minTarjaHeight, Math.round(safeH * 0.26));
    const tarjaY = safeH - tarjaHeight;

    if (logoH > tarjaHeight * 0.75) {
      logoH = Math.round(tarjaHeight * 0.75);
      logoW = Math.round(logoH * logoAspect);
    }
    const logoY = Math.round(tarjaY + (tarjaHeight - logoH) / 2);

    // 5. Fundo do carimbo (Branco)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, tarjaY, safeW, tarjaHeight);

    // Linha de acento sutil no topo da tarja
    ctx.fillStyle = 'rgba(0, 32, 96, 0.20)';
    const topBorderThickness = Math.max(2, Math.round(safeW * 0.0018));
    ctx.fillRect(0, tarjaY, safeW, topBorderThickness);

    // 6. Desenha o Logotipo oficial da NOVACAP no rodapé (sempre disponível via Base64)
    if (logoImg.complete && logoImg.naturalWidth > 0) {
      ctx.drawImage(logoImg, logoMarginX, logoY, logoW, logoH);
    }

    // 7. Linha divisória vertical
    const dividerPadding = Math.round(tarjaHeight * 0.16);
    const dividerWidth = Math.max(1, Math.round(safeW * 0.0012));
    ctx.fillStyle = 'rgba(0, 32, 96, 0.25)';
    ctx.fillRect(
      dividerX,
      tarjaY + dividerPadding,
      dividerWidth,
      tarjaHeight - (dividerPadding * 2)
    );

    // 8. Renderização das 3 Linhas de Informações Completas (Letras azuis)
    const textStartY = Math.round(tarjaY + (tarjaHeight - totalTextBlockHeight) / 2 + fontSize);

    ctx.font = `700 ${fontSize}px Arial, -apple-system, sans-serif`;
    ctx.fillStyle = '#002060';

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillText(str1, textStartX, textStartY);

    ctx.font = `600 ${fontSize}px Arial, -apple-system, sans-serif`;
    ctx.fillStyle = '#003899';
    ctx.fillText(str2, textStartX, textStartY + lineHeight);
    ctx.fillText(str3, textStartX, textStartY + (lineHeight * 2));

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  // ==========================================================================
  // HELPERS DE EXPORTAÇÃO SEGUROS DO CANVAS (BLOB & DATA URL)
  // ==========================================================================

  function getCanvasBlob(canvas, quality = 0.94) {
    return new Promise((resolve) => {
      try {
        if (typeof canvas.toBlob === 'function') {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              try {
                resolve(dataUrlToBlob(canvas.toDataURL('image/jpeg', quality)));
              } catch (e2) {
                resolve(null);
              }
            }
          }, 'image/jpeg', quality);
        } else {
          resolve(dataUrlToBlob(canvas.toDataURL('image/jpeg', quality)));
        }
      } catch (err) {
        console.warn('Fallback para toDataURL:', err);
        try {
          resolve(dataUrlToBlob(canvas.toDataURL('image/jpeg', quality)));
        } catch (err2) {
          console.error('Falha na conversão de imagem:', err2);
          resolve(null);
        }
      }
    });
  }

  function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1] || 'image/jpeg';
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  // ==========================================================================
  // FLUXO DE CAPTURA DA FOTO PELA CÂMERA
  // ==========================================================================

  async function onCaptureClick() {
    if (isProcessingCapture) return;
    isProcessingCapture = true;

    triggerShutterFlash();
    showLoading('Capturando e obtendo localização...');

    try {
      const width = videoElem.videoWidth;
      const height = videoElem.videoHeight;

      if (!width || !height) {
        throw new Error('Câmera indisponível no momento. Selecione uma foto da galeria ou permita o acesso.');
      }

      const coords = await getCurrentCoordinates();

      updateLoadingStatus('Consultando endereço oficial...');
      let addressData = cachedAddressData;
      if (coords && (!addressData || (lastGeocodedCoords && (Math.abs(lastGeocodedCoords.lat - coords.latitude) > 0.0002 || Math.abs(lastGeocodedCoords.lon - coords.longitude) > 0.0002)))) {
        addressData = await fetchReverseGeocode(coords.latitude, coords.longitude);
        if (addressData) cachedAddressData = addressData;
      }

      const captureDate = new Date();
      const line1 = formatLine1Address(addressData, !!coords);
      const line2 = formatLine2Coordinates(coords);
      const line3 = formatLine3DateTime(captureDate);

      updateLoadingStatus('Aplicando estampa oficial NOVACAP...');
      renderWatermarkedCanvas(videoElem, width, height, line1, line2, line3);

      // Desativa a câmera do dispositivo após registrar a foto e carimbar a localização
      stopCamera();

      await displayGeneratedPreview(captureDate, line2);

    } catch (err) {
      console.error('Erro durante a captura:', err);
      alert('Aviso: ' + (err.message || 'Falha ao processar captura.'));
    } finally {
      hideLoading();
      isProcessingCapture = false;
    }
  }

  function triggerShutterFlash() {
    cameraFlash.classList.add('active');
    setTimeout(() => {
      cameraFlash.classList.remove('active');
    }, 120);
  }

  // ==========================================================================
  // PROCESSAMENTO DE FOTO DA GALERIA (FALLBACK / TESTE)
  // ==========================================================================

  async function onGalleryImageSelected(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    showLoading('Carregando foto selecionada...');

    try {
      const reader = new FileReader();
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Falha ao abrir arquivo de imagem.'));
        img.src = dataUrl;
      });

      updateLoadingStatus('Obtendo localização atual...');
      const coords = await getCurrentCoordinates();

      updateLoadingStatus('Consultando endereço oficial...');
      let addressData = cachedAddressData;
      if (coords && !addressData) {
        addressData = await fetchReverseGeocode(coords.latitude, coords.longitude);
        if (addressData) cachedAddressData = addressData;
      }

      const captureDate = new Date();
      const line1 = formatLine1Address(addressData, !!coords);
      const line2 = formatLine2Coordinates(coords);
      const line3 = formatLine3DateTime(captureDate);

      updateLoadingStatus('Aplicando estampa NOVACAP...');
      const width = img.naturalWidth || img.width || 1920;
      const height = img.naturalHeight || img.height || 1080;
      renderWatermarkedCanvas(img, width, height, line1, line2, line3);

      await displayGeneratedPreview(captureDate, line2);
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      alert('Erro ao carimbar imagem: ' + (err.message || err));
    } finally {
      hideLoading();
      galleryInput.value = '';
    }
  }

  // ==========================================================================
  // EXIBIÇÃO DE PREVIEW E SALVAMENTO
  // ==========================================================================

  async function displayGeneratedPreview(dateObj, coordsText) {
    const canvas = captureCanvas;
    
    const pad = (n) => String(n).padStart(2, '0');
    const ymd = `${dateObj.getFullYear()}${pad(dateObj.getMonth() + 1)}${pad(dateObj.getDate())}`;
    const hms = `${pad(dateObj.getHours())}${pad(dateObj.getMinutes())}${pad(dateObj.getSeconds())}`;
    currentPhotoFileName = `NOVACAP_FOTO_${ymd}_${hms}.jpg`;

    let previewUrl = '';
    try {
      const blob = await getCanvasBlob(canvas, 0.94);
      if (blob) {
        currentPhotoBlob = blob;
        previewUrl = URL.createObjectURL(blob);
      }
    } catch (blobErr) {
      console.warn('Erro ao obter blob, usando toDataURL:', blobErr);
    }

    if (!previewUrl) {
      try {
        previewUrl = canvas.toDataURL('image/jpeg', 0.94);
        if (!currentPhotoBlob) {
          currentPhotoBlob = dataUrlToBlob(previewUrl);
        }
      } catch (e) {
        console.error('Erro crítico ao converter imagem:', e);
        throw new Error('Falha ao exportar a foto carimbada.');
      }
    }

    previewImage.src = previewUrl;
    previewCoordsLabel.textContent = coordsText;

    // Compartilhamento seguro
    try {
      if (navigator.share && typeof navigator.canShare === 'function' && currentPhotoBlob) {
        const testFile = new File([currentPhotoBlob], currentPhotoFileName, { type: 'image/jpeg' });
        if (navigator.canShare({ files: [testFile] })) {
          btnShare.classList.remove('hidden');
        } else {
          btnShare.classList.add('hidden');
        }
      } else {
        btnShare.classList.add('hidden');
      }
    } catch (shareErr) {
      btnShare.classList.add('hidden');
    }

    previewScreen.classList.remove('hidden');
  }

  function closePreview() {
    previewScreen.classList.add('hidden');
    previewImage.src = '';
    currentPhotoBlob = null;
    startCamera(currentFacingMode);
  }

  function downloadCurrentPhoto() {
    let downloadUrl = '';
    if (currentPhotoBlob) {
      downloadUrl = URL.createObjectURL(currentPhotoBlob);
    } else if (captureCanvas) {
      try {
        downloadUrl = captureCanvas.toDataURL('image/jpeg', 0.94);
      } catch (e) {
        alert('Não foi possível gerar a imagem para download.');
        return;
      }
    } else {
      alert('Nenhuma foto pronta para salvamento.');
      return;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = currentPhotoFileName || 'NOVACAP_FOTO.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      if (currentPhotoBlob && downloadUrl.startsWith('blob:')) {
        URL.revokeObjectURL(downloadUrl);
      }
    }, 4000);
  }

  async function shareCurrentPhoto() {
    if (!currentPhotoBlob || !navigator.share) return;

    try {
      const file = new File([currentPhotoBlob], currentPhotoFileName, { type: 'image/jpeg' });
      await navigator.share({
        title: 'Foto Oficial NOVACAP',
        text: 'Registro fotográfico com geolocalização NOVACAP.',
        files: [file]
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.warn('Erro ao compartilhar:', err);
      }
    }
  }

  // ==========================================================================
  // HELPERS DE INTERFACE (LOADING)
  // ==========================================================================

  function showLoading(msg) {
    loadingStatusText.textContent = msg;
    loadingOverlay.classList.remove('hidden');
  }

  function updateLoadingStatus(msg) {
    loadingStatusText.textContent = msg;
  }

  function hideLoading() {
    loadingOverlay.classList.add('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
