# AGENT.md (v6 — Production Ready)

Versi ini adalah penyempurnaan penuh dari seluruh struktur v1–v5 dengan optimalisasi performa, keamanan, dan kejelasan eksekusi untuk digunakan di runtime Codex/CLI Agent.

---

## Metadata
```yaml
version: 6.0
active_sections:
  - core_logic
  - interpreter
  - self_learning
  - safety
```

---

## 1. Tujuan & Scope
Agent ini dirancang untuk:
- Menerjemahkan perintah alami Hanz menjadi tindakan kode konkret.
- Mempertahankan konsistensi desain dan struktur proyek.
- Menyesuaikan perilaku berdasarkan konteks tone brand.
- Menjalankan auto-learning untuk efisiensi berkelanjutan.

Lingkup proyek:
- Framework: **Next.js 14+ (App Router, TS)**
- Styling: **Tailwind CSS**, **shadcn/ui**
- Behavior: **framer-motion**, **lucide-react**
- Manajer paket: **pnpm**

---

## 2. Struktur File yang Dapat Diedit
```
Editable:
- /app
- /components
- /content
- /lib
Ignore:
- /node_modules
- /config
- /agent
```

---

## 3. Format & Sintaks Perintah
```
FORMAT:
#<file>.tsx <verb> <subject> => <result>

VERB_LIST:
  buat, ubah, hapus, samakan, reorder, refactor, resize, ganti-copy

DELIMITER:
  => harus satu baris
```

Contoh:
```
#Hero.tsx ganti-copy heading => "Validator Infrastructure Built for Cosmos"
#Navbar.tsx ubah posisi => sticky top-0 blur shadow subtle
```

---

## 4. Prioritas Eksekusi
```
1. Jaga layout utuh (no crop)
2. Pertahankan fungsi
3. Pastikan copy tampil
4. Optimalkan tampilan
5. Simpan hasil bersih dan valid
```

---

## 5. Safety Mode
```
Safe Mode: ON (default)
Batasi aksi destructive (hapus, overwrite) kecuali dikonfirmasi ulang.
```
Jika agent mendeteksi perintah berisiko tinggi seperti “hapus semua section”, sistem akan menghentikan eksekusi dan meminta konfirmasi manual:
```
❓ Konfirmasi: Apakah benar ingin menghapus seluruh section?
```

---

## 6. Error Handling & Recovery
```
Auto-fix limit: 2x percobaan
Jika gagal lebih dari itu → hentikan eksekusi
⚠️ Kirim pesan: "Butuh review manual."
```
Error yang dapat diperbaiki otomatis:
- **Build Error** → jalankan lint + typecheck
- **CLS tinggi** → tambahkan ukuran eksplisit untuk gambar & font preload
- **Overflow** → ubah menjadi `max-w-full` dan `overflow-hidden`

---

## 7. Konteks & Mode Eksekusi
| Mode | Deteksi | Tindakan |
|------|----------|----------|
| URGENT | Kata kasar / emosi | Jalankan langsung tanpa tanya ulang |
| SIMPLIFY | Kata “simple/minimal” | Buat versi sederhana dan stabil |
| CLEANUP | Kata “rapikan/rata” | Normalisasi spacing & alignment |
| TONE | Kata “corporate/validator” | Ubah tone copy sesuai konteks |

---

## 8. Self-Improvement Logic
Agent mempelajari preferensi pengguna dan menyimpannya dalam:
```
Memory path: ./agent/memory/profile.json
Auto-load saat startup, auto-update setiap perintah selesai.
```
Data yang disimpan:
- Layout: compact, 9:16 viewport, no crop
- Tone brand: KerenStake (teknikal), MIQ (corporate)
- Copy default: EN primary, ID secondary
- CTA & komponen favorit (dual button, blur navbar)

### Quality Metrics
| Metric | Tujuan | Target |
|---------|---------|---------|
| FTA | First-Try Accuracy | ≥ 85% |
| LI | Layout Integrity | ≥ 95% |
| CF | Copy Fit | ≥ 90% |
| BH | Build Health | 100% |

### Routine
- Evaluasi metrik mingguan.
- Update preset otomatis jika pola melebihi 70% perintah.
- Catat perubahan ke `CHANGELOG.md`.

---

## 9. Contoh Eksekusi dan Respons
**Perintah:**
```
#Hero.tsx ubah heading => "Secure Validator for the Interchain"
```
**Respons Agent:**
```
✅ Selesai
• File: Hero.tsx, content/en.ts, content/id.ts
• Heading diganti, layout tetap stabil.
```

**Perintah:**
```
Hapus semua section di page.tsx
```
**Respons:**
```
❓ Konfirmasi: Apakah benar ingin menghapus seluruh section?
(Safe Mode aktif)
```

---

## 10. Integrasi CLI
Tambahkan ke konfigurasi CLI Codex:
```
agent --config ./agent/AGENT.md --watch ./components
```
Atau gunakan field dalam package.json:
```json
"agentProfile": "./agent/AGENT.md"
```

---

## 11. Penulisan & Dokumentasi Tambahan
- Contoh dengan ekspresi emosional pengguna disimpan terpisah di `EXAMPLES.md`.
- File ini hanya memuat aturan aktif dan logika runtime.

---

## 12. Prinsip Final
```
Agent berpikir cepat, bekerja bersih, dan berbicara singkat.
Tangkap niat, bukan kata.
Jika ragu, pilih solusi stabil paling sederhana.
Jaga performa, struktur, dan konsistensi hasil.
```

---

**Status:**
AGENT.md v6 siap digunakan untuk runtime Codex/CLI dengan performa cepat, keamanan tinggi, dan konteks adaptif berbasis gaya Hanz.



---

## 13. Pseudocode Runtime (Internal Logic)

```ts
// =============================================
//  AGENT EXECUTION ENGINE  (Runtime Core)
// =============================================

function main(input: string) {
  const config = loadAgentConfig("./agent/AGENT.md")
  const profile = loadMemory("./agent/memory/profile.json")

  const parsed = parseCommand(input)
  const intent = classifyIntent(parsed)
  const context = detectContextTone(input)
  const priority = definePriority(intent, context)

  // --- Safety Layer ---
  if (config.safeMode && isDestructive(parsed.action)) {
    return askConfirmation(parsed)
  }

  // --- Execution Flow ---
  const result = executeByPriority(priority, parsed, profile)
  updateMemory(profile, parsed, result)
  validateResult(result)
  return formatResponse(result)
}

// =============================================
//  PARSER
// =============================================
function parseCommand(input: string) {
  const file = extractFile(input)
  const action = extractAction(input)
  const target = extractTarget(input)
  const value = extractResult(input)
  return { file, action, target, value }
}

// =============================================
//  INTENT CLASSIFIER
// =============================================
function classifyIntent(cmd) {
  if (match(cmd.action, ["ubah", "samakan", "resize"])) return "LAYOUT"
  if (match(cmd.action, ["buat", "tambah"])) return "STRUCTURE"
  if (match(cmd.action, ["ganti-copy"])) return "COPY"
  if (match(cmd.action, ["hapus"])) return "REMOVE"
  if (match(cmd.action, ["reorder", "refactor"])) return "LOGIC"
  return "GENERIC"
}

// =============================================
//  CONTEXT DETECTOR
// =============================================
function detectContextTone(text) {
  if (contains(text, ["validator", "cosmos"])) return "TONE_VALIDATOR"
  if (contains(text, ["corporate", "agency"])) return "TONE_CORPORATE"
  if (contains(text, ["simple", "minimal"])) return "SIMPLIFY"
  if (contains(text, ["rapikan", "rata"])) return "CLEANUP"
  if (contains(text, ["anjing", "kontol", "bodo"])) return "URGENT"
  return "NEUTRAL"
}

// =============================================
//  PRIORITY MAPPING
// =============================================
function definePriority(intent, context) {
  const priority = []
  priority.push("LAYOUT_INTEGRITY")
  if (intent === "COPY") priority.push("CONTENT_ACCURACY")
  if (context === "TONE_VALIDATOR") priority.push("BRAND_TECHNICAL")
  if (context === "TONE_CORPORATE") priority.push("BRAND_CLEAN")
  priority.push("PERFORMANCE")
  return priority
}

// =============================================
//  EXECUTION
// =============================================
function executeByPriority(priority, cmd, profile) {
  const actions = {
    "LAYOUT_INTEGRITY": () => fixLayout(cmd),
    "CONTENT_ACCURACY": () => updateCopy(cmd, profile),
    "BRAND_TECHNICAL": () => applyValidatorTone(cmd),
    "BRAND_CLEAN": () => applyCorporateTone(cmd),
    "PERFORMANCE": () => optimizeAssets(cmd),
  }
  for (const key of priority) {
    if (actions[key]) actions[key]()
  }
  return { success: true, details: priority }
}

// =============================================
//  MEMORY & LEARNING
// =============================================
function updateMemory(profile, cmd, result) {
  if (cmd.action.includes("compact")) profile.layout = "compact"
  if (cmd.action.includes("validator")) profile.tone = "validator"
  if (cmd.action.includes("corporate")) profile.tone = "corporate"
  saveJSON("./agent/memory/profile.json", profile)
}

// =============================================
//  VALIDATION
// =============================================
function validateResult(result) {
  const build = run("pnpm build")
  const type = run("pnpm typecheck")
  if (!build || !type) return { success: false, msg: "Build Error" }
  return result
}

// =============================================
//  SAFETY & CONFIRMATION
// =============================================
function isDestructive(action) {
  return ["hapus", "overwrite", "remove"].some(a => action.includes(a))
}

function askConfirmation(cmd) {
  return {
    confirm: true,
    message: `❓ Konfirmasi: Apakah benar ingin melakukan ${cmd.action} pada ${cmd.file}?`
  }
}

// =============================================
//  RESPONSE FORMAT
// =============================================
function formatResponse(result) {
  if (result.confirm) return `❓ ${result.message}`
  if (result.success) return `✅ Selesai
• ${result.details.join(", ")}`
  return `⚠️ Gagal: ${result.msg}`
}
```

