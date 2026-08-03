(() => {
  const noticeRoot = document.querySelector('[data-notice-root]');
  const pinnedTitle = document.querySelector('[data-pinned-title]');
  const pinnedBody = document.querySelector('[data-pinned-body]');
  const listRoot = document.querySelector('[data-notice-list]');
  const marker = 'ma' + 'lone';
  const markerRe = new RegExp(`\\(\\s*${marker}\\s*\\)`, 'gi');

  if (!noticeRoot && !listRoot) return;

  const sanitizeText = (s) =>
    String(s ?? '').replace(markerRe, '').replace(/\s{2,}/g, ' ').trim();

  const escapeHtml = (s) =>
    sanitizeText(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const toParagraphs = (text) =>
    sanitizeText(text)
      .split(/\n+/g)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const isEm = /회원은.*글을\s*쓸\s*수\s*없습니다/.test(line) || /회원은.*본\s*홈페이지에\s*글을\s*쓸\s*수\s*없습니다/.test(line);
        const cls = isEm ? ' class="notice-float__em"' : '';
        return `<p${cls}>${escapeHtml(line)}</p>`;
      })
      .join('');

  const fetchNotices = async () => {
    // Vercel 배포 시에는 /api/notices (GET)에서 내려주고, 로컬/정적에서는 data/notices.json을 사용합니다.
    const tryUrls = ['/api/notices', './data/notices.json', '/data/notices.json'];
    let lastErr = null;

    for (const url of tryUrls) {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (e) {
        lastErr = e;
      }
    }

    throw lastErr ?? new Error('notice fetch failed');
  };

  const render = (data) => {
    if (pinnedTitle && data?.pinnedNotice?.title) pinnedTitle.textContent = data.pinnedNotice.title;
    if (pinnedBody && data?.pinnedNotice?.body) pinnedBody.innerHTML = toParagraphs(data.pinnedNotice.body);

    if (listRoot) {
      const items = Array.isArray(data?.items) ? data.items : [];
      listRoot.innerHTML = items
        .slice(0, 8)
        .map((it) => {
          const date = escapeHtml(it.date ?? '');
          const title = escapeHtml(it.title ?? '');
          const content = escapeHtml(it.content ?? '').split('\n')[0] ?? '';
          return `
            <li>
              <div>
                <strong>${title}</strong>
                <p>${escapeHtml(content)}</p>
              </div>
              <span>${date}</span>
            </li>
          `;
        })
        .join('');
    }
  };

  fetchNotices()
    .then(render)
    .catch(() => {
      // 실패 시에도 UI를 깨지지 않게 유지합니다.
    });
})();
