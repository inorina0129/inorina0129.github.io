(function() {
    // 指定 JSON 資料的位置
    const dataUrl = 'https://inorina0129.github.io/qr-badge-list.json';

    // QR code 和徽章更新函數
    function updateQrAndBadge(qrCodeUrl, badgeUrl) {
        updateQrCode(qrCodeUrl);
        updateBadge(badgeUrl);
    }

    // QR code 更新函數
    function updateQrCode(qrCodeUrl) {
        const qrElement = __qtrsGetElement();
        if (qrElement) {
            qrElement.src = qrCodeUrl;
        } else {
            alert('QR code image not found');
        }
    }

    // 徽章更新函數
    function updateBadge(badgeUrl) {
        const badgeImageEl = document.querySelector('img.badge-image');
        const badgeRankEl = document.querySelector('div.badge-rank');
        if (badgeImageEl) {
            badgeImageEl.src = badgeUrl;
            badgeImageEl.alt = '靜態徽章';
        }
        if (badgeRankEl) {
            badgeRankEl.textContent = '靜態徽章';
        }
    }

    // 從 JSON 檔案載入數據
    function loadQrBadgeData() {
        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                const { qrcode, badges } = data;

                // 創建 QR code 下拉選單
                const qrSelect = document.createElement('select');
                Object.keys(qrcode).forEach(label => {
                    const option = document.createElement('option');
                    option.value = qrcode[label];
                    option.textContent = label;
                    qrSelect.appendChild(option);
                });
                qrSelect.addEventListener('change', function() {
                    updateQrCode(this.value);
                });
                document.body.appendChild(qrSelect);

                // 創建徽章下拉選單
                const badgeSelect = document.createElement('select');
                Object.keys(badges).forEach(label => {
                    const option = document.createElement('option');
                    option.value = badges[label];
                    option.textContent = label;
                    badgeSelect.appendChild(option);
                });
                badgeSelect.addEventListener('change', function() {
                    updateBadge(this.value);
                });
                document.body.appendChild(badgeSelect);

                // 預設更新 QR code 和徽章
                const firstQr = Object.values(qrcode)[0];
                const firstBadge = Object.values(badges)[0];
                updateQrAndBadge(firstQr, firstBadge);
            })
            .catch(error => {
                console.error('Error loading QR and badge data:', error);
            });
    }

    // 獲取 QR code 圖片元素的選取器 (未修改)
    function __qtrsGetQrSelector() {
        if (document.location.hostname.indexOf('sakura') !== -1) {
            return '.mypage-qrcode-body > img';
        } else {
            return '.p-mypage__qrcode > img';
        }
    }

    // 獲取 QR code 圖片元素 (未修改)
    function __qtrsGetElement() {
        const selector = __qtrsGetQrSelector();
        const res = document.querySelector(selector);
        if (res instanceof HTMLImageElement) {
            return res;
        }
    }

    // 確認腳本是否已經載入
    if (typeof window.__qtrs__loaded__ === 'undefined') {
        window.__qtrs__loaded__ = true;

        // 載入 QR code 和徽章數據並更新 UI
        loadQrBadgeData();
    }
})();
