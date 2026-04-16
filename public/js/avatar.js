// ══════════════════════════════════════
// AVATAR BUILDER - Costruisci il tuo avatar!
// ══════════════════════════════════════

const SKIN = ['#FFDBB4','#F5C6A5','#E8AA85','#D08B5B','#A0674B','#704737'];
const HAIR_COL = ['#2C1810','#5A3210','#8B6914','#D4A017','#E8751A','#C93C20','#E84393','#6C5CE7','#00B894','#74C0FC'];
const BG_COL = ['#FF6B6B','#38BFA7','#B197FC','#FFD166','#F783AC','#74C0FC','#69DB7C','#FF922B','#E8E8E8','#2D3436'];

const PARTS = {
  face: [
    { id: 'round', label: '🟡', path: (sk) => `<circle cx="100" cy="110" r="70" fill="${sk}"/><circle cx="100" cy="120" r="60" fill="${sk}"/>` },
    { id: 'oval', label: '🥚', path: (sk) => `<ellipse cx="100" cy="112" rx="62" ry="72" fill="${sk}"/>` },
    { id: 'square', label: '🟧', path: (sk) => `<rect x="38" y="45" width="124" height="130" rx="30" fill="${sk}"/>` },
  ],
  eyes: [
    { id: 'happy', label: '😊', draw: () => `<circle cx="75" cy="100" r="6" fill="#2D1B69"/><circle cx="125" cy="100" r="6" fill="#2D1B69"/><circle cx="77" cy="98" r="2" fill="#fff"/><circle cx="127" cy="98" r="2" fill="#fff"/>` },
    { id: 'big', label: '👀', draw: () => `<circle cx="75" cy="100" r="10" fill="#fff" stroke="#2D1B69" stroke-width="2"/><circle cx="125" cy="100" r="10" fill="#fff" stroke="#2D1B69" stroke-width="2"/><circle cx="77" cy="101" r="5" fill="#2D1B69"/><circle cx="127" cy="101" r="5" fill="#2D1B69"/>` },
    { id: 'wink', label: '😉', draw: () => `<circle cx="75" cy="100" r="6" fill="#2D1B69"/><circle cx="77" cy="98" r="2" fill="#fff"/><path d="M115 100 Q125 94 135 100" stroke="#2D1B69" stroke-width="3" fill="none" stroke-linecap="round"/>` },
    { id: 'stars', label: '🤩', draw: () => `<text x="68" y="106" font-size="18" text-anchor="middle">⭐</text><text x="132" y="106" font-size="18" text-anchor="middle">⭐</text>` },
    { id: 'sleepy', label: '😴', draw: () => `<path d="M62 100 Q75 94 88 100" stroke="#2D1B69" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M112 100 Q125 94 138 100" stroke="#2D1B69" stroke-width="3" fill="none" stroke-linecap="round"/>` },
    { id: 'cute', label: '🥺', draw: () => `<ellipse cx="75" cy="100" rx="10" ry="12" fill="#fff" stroke="#2D1B69" stroke-width="2"/><ellipse cx="125" cy="100" rx="10" ry="12" fill="#fff" stroke="#2D1B69" stroke-width="2"/><circle cx="76" cy="102" r="6" fill="#2D1B69"/><circle cx="126" cy="102" r="6" fill="#2D1B69"/><circle cx="78" cy="99" r="2.5" fill="#fff"/><circle cx="128" cy="99" r="2.5" fill="#fff"/>` },
  ],
  mouth: [
    { id: 'smile', label: '😊', draw: (sk) => `<path d="M80 130 Q100 150 120 130" stroke="#2D1B69" stroke-width="3" fill="none" stroke-linecap="round"/>` },
    { id: 'grin', label: '😁', draw: (sk) => `<path d="M75 128 Q100 155 125 128" fill="#fff" stroke="#2D1B69" stroke-width="2.5"/><path d="M75 128 Q100 135 125 128" fill="#2D1B69"/>` },
    { id: 'tongue', label: '😋', draw: (sk) => `<path d="M80 130 Q100 150 120 130" stroke="#2D1B69" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="145" rx="8" ry="10" fill="#FF6B6B"/>` },
    { id: 'surprised', label: '😮', draw: (sk) => `<ellipse cx="100" cy="135" rx="10" ry="12" fill="#2D1B69"/><ellipse cx="100" cy="134" rx="7" ry="8" fill="#8B0000"/>` },
    { id: 'cat', label: '😺', draw: (sk) => `<path d="M88 130 Q94 125 100 130 Q106 125 112 130" stroke="#2D1B69" stroke-width="2.5" fill="none" stroke-linecap="round"/>` },
    { id: 'flat', label: '😐', draw: (sk) => `<line x1="82" y1="132" x2="118" y2="132" stroke="#2D1B69" stroke-width="3" stroke-linecap="round"/>` },
  ],
  hair: [
    { id: 'none', label: '🚫', draw: () => '' },
    { id: 'short', label: '💇', draw: (c) => `<path d="M38 90 Q40 40 100 35 Q160 40 162 90 L155 85 Q150 50 100 45 Q50 50 45 85 Z" fill="${c}"/>` },
    { id: 'long', label: '💇‍♀️', draw: (c) => `<path d="M38 90 Q40 40 100 30 Q160 40 162 90 L160 180 Q155 190 145 180 L150 90 Q150 50 100 42 Q50 50 50 90 L55 180 Q45 190 40 180 Z" fill="${c}"/>` },
    { id: 'curly', label: '🌀', draw: (c) => `<path d="M35 95 Q30 30 100 25 Q170 30 165 95" fill="${c}"/><circle cx="40" cy="95" r="12" fill="${c}"/><circle cx="55" cy="40" r="10" fill="${c}"/><circle cx="100" cy="28" r="12" fill="${c}"/><circle cx="145" cy="40" r="10" fill="${c}"/><circle cx="160" cy="95" r="12" fill="${c}"/><circle cx="35" cy="115" r="10" fill="${c}"/><circle cx="165" cy="115" r="10" fill="${c}"/>` },
    { id: 'spiky', label: '⚡', draw: (c) => `<path d="M42 88 L55 20 L70 65 L90 15 L100 55 L120 10 L125 60 L145 25 L158 88 Q150 50 100 42 Q50 50 42 88 Z" fill="${c}"/>` },
    { id: 'ponytail', label: '🎀', draw: (c) => `<path d="M38 90 Q40 40 100 35 Q160 40 162 90 L155 85 Q150 50 100 45 Q50 50 45 85 Z" fill="${c}"/><path d="M155 75 Q170 80 165 120 Q160 160 150 170 Q155 130 155 75" fill="${c}"/>` },
    { id: 'mohawk', label: '🦔', draw: (c) => `<path d="M80 85 Q85 15 100 10 Q115 15 120 85 Q110 55 100 50 Q90 55 80 85 Z" fill="${c}"/>` },
    { id: 'pigtails', label: '👧', draw: (c) => `<path d="M38 90 Q40 40 100 35 Q160 40 162 90 L155 85 Q150 50 100 45 Q50 50 45 85 Z" fill="${c}"/><circle cx="35" cy="110" r="18" fill="${c}"/><circle cx="165" cy="110" r="18" fill="${c}"/>` },
  ],
  accessory: [
    { id: 'none', label: '🚫', draw: () => '' },
    { id: 'glasses', label: '👓', draw: () => `<circle cx="75" cy="100" r="16" fill="none" stroke="#2D1B69" stroke-width="3"/><circle cx="125" cy="100" r="16" fill="none" stroke="#2D1B69" stroke-width="3"/><line x1="91" y1="100" x2="109" y2="100" stroke="#2D1B69" stroke-width="3"/>` },
    { id: 'sunglasses', label: '😎', draw: () => `<rect x="57" y="90" width="36" height="22" rx="6" fill="#2D1B69"/><rect x="107" y="90" width="36" height="22" rx="6" fill="#2D1B69"/><line x1="93" y1="100" x2="107" y2="100" stroke="#2D1B69" stroke-width="3"/>` },
    { id: 'crown', label: '👑', draw: () => `<path d="M60 50 L70 30 L85 45 L100 20 L115 45 L130 30 L140 50 Z" fill="#FFD166" stroke="#F0B830" stroke-width="2"/><rect x="60" y="47" width="80" height="10" rx="3" fill="#FFD166" stroke="#F0B830" stroke-width="2"/>` },
    { id: 'bow', label: '🎀', draw: () => `<path d="M130 55 Q150 40 155 55 Q155 65 135 60 Q155 60 155 70 Q150 85 130 68 Z" fill="#F783AC"/><circle cx="132" cy="62" r="4" fill="#E84393"/>` },
    { id: 'hat', label: '🎩', draw: () => `<rect x="55" y="35" width="90" height="30" rx="6" fill="#2D1B69"/><rect x="45" y="60" width="110" height="10" rx="4" fill="#2D1B69"/>` },
    { id: 'headband', label: '🏵️', draw: () => `<path d="M38 75 Q100 55 162 75" stroke="#FF6B6B" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="60" cy="70" r="6" fill="#FFD166"/>` },
    { id: 'star', label: '⭐', draw: () => `<text x="145" y="60" font-size="28">⭐</text>` },
  ],
  blush: [
    { id: 'none', label: '🚫', draw: () => '' },
    { id: 'pink', label: '🩷', draw: () => `<ellipse cx="60" cy="118" rx="12" ry="7" fill="#F783AC" opacity="0.3"/><ellipse cx="140" cy="118" rx="12" ry="7" fill="#F783AC" opacity="0.3"/>` },
    { id: 'freckles', label: '🫠', draw: () => `<circle cx="55" cy="115" r="2" fill="#C4956A" opacity="0.5"/><circle cx="62" cy="118" r="2" fill="#C4956A" opacity="0.5"/><circle cx="58" cy="122" r="2" fill="#C4956A" opacity="0.5"/><circle cx="138" cy="115" r="2" fill="#C4956A" opacity="0.5"/><circle cx="145" cy="118" r="2" fill="#C4956A" opacity="0.5"/><circle cx="141" cy="122" r="2" fill="#C4956A" opacity="0.5"/>` },
    { id: 'hearts', label: '💕', draw: () => `<text x="56" y="122" font-size="12" opacity="0.5">💗</text><text x="134" y="122" font-size="12" opacity="0.5">💗</text>` },
  ]
};

export function defaultConfig() {
  return {
    bg: '#B197FC',
    skin: '#FFDBB4',
    face: 'round',
    eyes: 'happy',
    mouth: 'smile',
    hair: 'short',
    hairColor: '#2C1810',
    accessory: 'none',
    blush: 'none',
  };
}

export function renderAvatar(cfg, size = 200) {
  const c = { ...defaultConfig(), ...cfg };
  const face = PARTS.face.find(f => f.id === c.face) || PARTS.face[0];
  const eyes = PARTS.eyes.find(e => e.id === c.eyes) || PARTS.eyes[0];
  const mouth = PARTS.mouth.find(m => m.id === c.mouth) || PARTS.mouth[0];
  const hair = PARTS.hair.find(h => h.id === c.hair) || PARTS.hair[0];
  const acc = PARTS.accessory.find(a => a.id === c.accessory) || PARTS.accessory[0];
  const blush = PARTS.blush.find(b => b.id === c.blush) || PARTS.blush[0];

  return `<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="${c.bg}"/>
    ${hair.id !== 'none' && (hair.id === 'long' || hair.id === 'curly' || hair.id === 'pigtails') ? hair.draw(c.hairColor) : ''}
    ${face.path(c.skin)}
    ${eyes.draw()}
    ${mouth.draw(c.skin)}
    ${blush.draw()}
    ${hair.id !== 'none' && hair.id !== 'long' && hair.id !== 'curly' && hair.id !== 'pigtails' ? hair.draw(c.hairColor) : ''}
    ${acc.draw()}
  </svg>`;
}

export function renderAvatarBuilder(cfg, onUpdate) {
  const c = { ...defaultConfig(), ...cfg };

  function optionRow(label, partKey, items, currentId) {
    return `<div class="avb-row">
      <div class="avb-label">${label}</div>
      <div class="avb-opts">
        ${items.map(item => `<button class="avb-opt ${item.id === currentId ? 'avb-active' : ''}"
          onclick="window._avbSet('${partKey}','${item.id}')" title="${item.label}">${item.label}</button>`).join('')}
      </div>
    </div>`;
  }

  function colorRow(label, key, colors, currentColor) {
    return `<div class="avb-row">
      <div class="avb-label">${label}</div>
      <div class="avb-opts">
        ${colors.map(col => `<button class="avb-color ${col === currentColor ? 'avb-active' : ''}"
          style="background:${col}" onclick="window._avbSetColor('${key}','${col}')"></button>`).join('')}
      </div>
    </div>`;
  }

  // Store callback
  window._avbCfg = c;
  window._avbCb = onUpdate;
  window._avbSet = (key, val) => { window._avbCfg[key] = val; onUpdate({ ...window._avbCfg }); };
  window._avbSetColor = (key, val) => { window._avbCfg[key] = val; onUpdate({ ...window._avbCfg }); };

  return `
    <div class="avb-preview">${renderAvatar(c, 160)}</div>
    ${colorRow('🎨 Sfondo', 'bg', BG_COL, c.bg)}
    ${colorRow('👤 Pelle', 'skin', SKIN, c.skin)}
    ${optionRow('😊 Viso', 'face', PARTS.face, c.face)}
    ${optionRow('👁️ Occhi', 'eyes', PARTS.eyes, c.eyes)}
    ${optionRow('👄 Bocca', 'mouth', PARTS.mouth, c.mouth)}
    ${optionRow('💇 Capelli', 'hair', PARTS.hair, c.hair)}
    ${colorRow('🎨 Colore capelli', 'hairColor', HAIR_COL, c.hairColor)}
    ${optionRow('✨ Accessori', 'accessory', PARTS.accessory, c.accessory)}
    ${optionRow('☺️ Guance', 'blush', PARTS.blush, c.blush)}
  `;
}

// Render a small avatar for display in lists/stats (from stored config)
export function avatarHTML(cfg, size = 48) {
  if (!cfg || typeof cfg === 'string') {
    // Legacy emoji avatar
    const emoji = cfg || '🦊';
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${size*0.6}px;background:#f0ecf5">${emoji}</div>`;
  }
  return renderAvatar(cfg, size);
}
