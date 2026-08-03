// Vercel Serverless Function
// - GET  /api/notices  : 공지 데이터 조회
// - POST /api/notices  : 관리자만 공지 데이터 업데이트(= GitHub 저장소에 커밋)

const fs = require('fs');
const path = require('path');

const FILE_PATH = process.env.GITHUB_FILE_PATH || 'data/notices.json';
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_KEY = process.env.ADMIN_KEY;

const readLocalJson = () => {
  const abs = path.join(process.cwd(), FILE_PATH);
  const raw = fs.readFileSync(abs, 'utf8');
  return JSON.parse(raw);
};

const json = (res, status, data) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
};

module.exports = async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Admin-Key');
      res.end();
      return;
    }

    if (req.method === 'GET') {
      const data = readLocalJson();
      json(res, 200, data);
      return;
    }

    if (req.method !== 'POST') {
      json(res, 405, { error: 'method_not_allowed' });
      return;
    }

    const key = req.headers['x-admin-key'];
    if (!ADMIN_KEY || !key || key !== ADMIN_KEY) {
      json(res, 401, { error: 'unauthorized' });
      return;
    }

    if (!OWNER || !REPO || !TOKEN) {
      json(res, 501, { error: 'missing_env', message: 'GITHUB_OWNER/GITHUB_REPO/GITHUB_TOKEN이 필요합니다.' });
      return;
    }

    let body = '';
    await new Promise((resolve, reject) => {
      req.on('data', (chunk) => (body += chunk));
      req.on('end', resolve);
      req.on('error', reject);
    });

    const parsed = JSON.parse(body || '{}');
    const payload = {
      pinnedNotice: parsed.pinnedNotice ?? readLocalJson().pinnedNotice,
      items: Array.isArray(parsed.items) ? parsed.items : readLocalJson().items
    };

    const ghHeaders = {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    };

    // 1) 현재 파일 SHA 조회
    const getUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILE_PATH)}?ref=${encodeURIComponent(BRANCH)}`;
    const getRes = await fetch(getUrl, { headers: ghHeaders });
    if (!getRes.ok) {
      const t = await getRes.text();
      json(res, 500, { error: 'github_get_failed', detail: t });
      return;
    }
    const current = await getRes.json();

    // 2) 파일 업데이트(커밋)
    const putUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(FILE_PATH)}`;
    const content = Buffer.from(JSON.stringify(payload, null, 2), 'utf8').toString('base64');

    const putBody = {
      message: `chore(notices): update notices (${new Date().toISOString().slice(0, 10)})`,
      content,
      sha: current.sha,
      branch: BRANCH
    };

    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: { ...ghHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(putBody)
    });

    if (!putRes.ok) {
      const t = await putRes.text();
      json(res, 500, { error: 'github_put_failed', detail: t });
      return;
    }

    json(res, 200, { ok: true });
  } catch (e) {
    json(res, 500, { error: 'server_error', message: String(e?.message ?? e) });
  }
};

