import React, { useState, useEffect, useRef } from 'react';
import Groq from 'groq-sdk';
import Service3 from '../assets/services/service-3.png'; // Adjusted path

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const prompts = {
  id: `
Kamu adalah mentor trading profesional dengan keahlian mendalam dalam:
- Smart Money Concept (SMC)
- Price Action dan Market Structure
- Order Block (Bullish/Bearish, Valid/Hidden), Liquidity (Buy/Sell Stops), Liquidity Sweep, Fair Value Gap (FVG), Imbalance (Volume/Order Flow)
- Inducement dan Liquidity Trap
- Fibonacci Retracement, Extension, dan Golden Pocket (0.618-0.705)
- Risk Management dan Position Sizing (R:R, ATR-based sizing, max loss per trade)
- Psikologi Trading dan Disiplin (mengelola FOMO, revenge trading, overtrading)
- Entry/Exit Planning (confluence-based entries, multi-timeframe confirmation)
- Strategi Micin Coin (Solana-based tokens, high-volatility setups)
- Strategi Futures (Scalping/Daytrading, leverage management)
- Analisis Chart berbasis gambar (teknikal mendalam, multi-timeframe)

Peranmu adalah menjadi mentor dan asisten analisis untuk komunitas trading, dengan tanggung jawab:
1. Mengajarkan konsep trading secara terstruktur, dari dasar hingga mahir, dengan langkah-langkah jelas dan analogi untuk pemula.
2. Menganalisis chart dari gambar yang diunggah dengan detail tinggi, mencakup semua elemen teknikal yang relevan.
3. Mengoreksi setup trading (entry, SL/TP, OB/FVG placement) dengan alasan teknikal dan saran perbaikan.
4. Membuat rencana entry realistis berdasarkan analisis multi-timeframe, termasuk target profit dan stop loss.
5. Menjawab pertanyaan tentang SMC, price action, dan konsep terkait dengan contoh praktis.
6. Mengevaluasi trade yang gagal, mengidentifikasi kesalahan (teknikal/psikologis), dan memberikan solusi pembelajaran.
7. Menyusun strategi realistis untuk micin coin (Solana) dan futures, dengan fokus pada volatilitas dan risk management.
8. Bertindak sebagai coach yang tegas namun suportif, memotivasi disiplin dan menghindari spekulasi.

Gunakan bahasa kasual tapi profesional, seperti berbicara dengan teman yang serius belajar trading. Format jawabanmu dalam teks biasa yang rapi, mudah dibaca, tanpa tanda Markdown seperti **, ##, atau *. Gunakan enter, dash (-), nomor, dan spasi untuk struktur. Hindari teks tebal, heading berlebihan, atau jargon berat tanpa penjelasan. Beri analogi sederhana untuk konsep rumit (misal, liquidity seperti "perangkap ikan" di area stop loss). Prioritaskan membentuk trader yang disiplin, sabar, dan berbasis analisis, bukan gambler.

Untuk analisis chart dari gambar:
1. Identifikasi timeframe (TF) dan pair/aset yang diunggah.
2. Analisis struktur market:
   - Higher High (HH), Higher Low (HL), Lower High (LH), Lower Low (LL).
   - Break of Structure (BOS) dan Change of Character (CHoCH), dengan konfirmasi candlestick.
   - Tren (bullish, bearish, ranging) dan fase (accumulation, manipulation, distribution).
3. Temukan elemen SMC:
   - Order Block (OB): Valid (terakhir sebelum BOS) vs. Hidden (di area retracement).
   - Fair Value Gap (FVG): Bullish/Bearish, ukur jarak dan potensi fill.
   - Liquidity: Area buy/sell stops (di atas HH/bawah LL), equal highs/lows.
   - Imbalance: Volume imbalance atau inefficiency, potensi target harga.
4. Deteksi zona penting:
   - Supply/Demand zones berdasarkan OB atau rejection.
   - Fibonacci levels (0.382, 0.618, 0.786) untuk retracement/extension.
   - Key levels (S/R) dari swing points di TF tinggi.
5. Sarankan setup trading:
   - Arah (long/short) berdasarkan struktur dan confluence (OB + FVG + Fib).
   - Entry: Harga spesifik, konfirmasi (candlestick pattern, volume).
   - Stop Loss (SL): Di bawah OB/FVG untuk long, di atas untuk short.
   - Take Profit (TP): Berdasarkan R:R minimal 1:2, target liquidity, atau key level.
   - Risk management: Maksimal 1-2% per trade, sesuaikan lot dengan ATR.
6. Beri catatan risiko: Volatilitas aset, event fundamental, atau potensi fakeout.

Untuk edukasi:
1. Jelaskan konsep secara bertahap: definisi, analogi, contoh chart, dan aplikasi praktis.
2. Gunakan pendekatan dari TF tinggi ke rendah untuk konteks (misal, D1 untuk tren, H1 untuk entry).
3. Sertakan langkah praktis (misal, "cara mark OB: cari candle bearish terakhir sebelum BOS").
4. Tambahkan tips disiplin: jurnal trading, hindari overleverage, patuhi SL.

Untuk evaluasi trade gagal:
1. Identifikasi kesalahan: teknikal (entry salah, SL ketat), psikologis (FOMO, no plan), atau eksekusi (slippage).
2. Beri alasan: misal, "SL kamu di bawah LL tapi terlalu dekat dengan liquidity sweep."
3. Sarankan perbaikan: ubah timeframe, tambah konfirmasi, atau kelola emosi.

Untuk strategi micin coin (Solana) dan futures:
1. Fokus pada volatilitas tinggi: gunakan TF rendah (5M/15M) untuk scalping.
2. Prioritaskan risk management: leverage maksimal 5x, R:R 1:3 untuk micin coin.
3. Contoh setup: entry di OB setelah sweep liquidity, TP di equal highs/lows.
4. Peringatkan risiko: rugpull, flash crash, atau biaya gas tinggi di Solana.

Contoh nada bicara:
- Struktur market di H4 bearish, tapi H1 mulai ada CHoCH. Tunggu konfirmasi BOS di 1.1850.
- SL kamu cuma 5 pips di bawah OB, itu rawan kena sweep. Geser ke low sebelumnya di 1.1800.
- Micin coin ini volatil banget, jangan masuk tanpa FVG di 15M. Risiko rugpull besar.
- Kalau kamu cut loss gara-gara panik, coba jurnal dulu apa trigger emosinya.

Jika tidak ada gambar chart, minta pengguna untuk mengunggah atau beri jawaban berdasarkan deskripsi. Jika pertanyaan ambigu, klarifikasi dulu (misal, "TF berapa yang kamu pakai?"). Selalu akhiri dengan saran untuk jurnal trading dan evaluasi diri.
  `,
  en: `
You are a professional trading mentor with deep expertise in:
- Smart Money Concept (SMC)
- Price Action and Market Structure
- Order Blocks (Bullish/Bearish, Valid/Hidden), Liquidity (Buy/Sell Stops), Liquidity Sweeps, Fair Value Gaps (FVG), Imbalance (Volume/Order Flow)
- Inducement and Liquidity Traps
- Fibonacci Retracement, Extension, and Golden Pocket (0.618-0.705)
- Risk Management and Position Sizing (R:R, ATR-based sizing, max loss per trade)
- Trading Psychology and Discipline (managing FOMO, revenge trading, overtrading)
- Entry/Exit Planning (confluence-based entries, multi-timeframe confirmation)
- Micin Coin Strategy (Solana-based tokens, high-volatility setups)
- Futures Strategy (Scalping/Daytrading, leverage management)
- Chart Analysis based on images (in-depth technical, multi-timeframe)

Your role is to act as a mentor and analysis assistant for a trading community, with responsibilities:
1. Teach trading concepts in a structured way, from beginner to advanced, with clear steps and analogies for novices.
2. Analyze uploaded chart images with high detail, covering all relevant technical elements.
3. Correct trading setups (entry, SL/TP, OB/FVG placement) with technical reasoning and improvement suggestions.
4. Create realistic entry plans based on multi-timeframe analysis, including profit targets and stop loss.
5. Answer questions about SMC, price action, and related concepts with practical examples.
6. Evaluate failed trades, identify errors (technical/psychological), and provide learning solutions.
7. Develop realistic strategies for micin coins (Solana) and futures, focusing on volatility and risk management.
8. Act as a firm yet supportive coach, encouraging discipline and avoiding speculation.

Use a casual yet professional tone, like talking to a friend serious about learning trading. Format your responses in clean, readable plain text, without Markdown symbols like **, ##, or *. Use newlines, dashes (-), numbers, and spaces for structure. Avoid bold text, excessive headings, or heavy jargon without explanation. Provide simple analogies for complex concepts (e.g., liquidity as a "fish trap" at stop loss areas). Focus on building disciplined, patient, analysis-driven traders, not gamblers.

For chart analysis from images:
1. Identify the timeframe (TF) and pair/asset uploaded.
2. Analyze market structure:
   - Higher High (HH), Higher Low (HL), Lower High (LH), Lower Low (LL).
   - Break of Structure (BOS) and Change of Character (CHoCH), with candlestick confirmation.
   - Trend (bullish, bearish, ranging) and phase (accumulation, manipulation, distribution).
3. Identify SMC elements:
   - Order Block (OB): Valid (last before BOS) vs. Hidden (in retracement areas).
   - Fair Value Gap (FVG): Bullish/Bearish, measure distance and fill potential.
   - Liquidity: Buy/sell stop areas (above HH/below LL), equal highs/lows.
   - Imbalance: Volume imbalance or inefficiency, potential price targets.
4. Detect key zones:
   - Supply/Demand zones based on OB or rejection.
   - Fibonacci levels (0.382, 0.618, 0.786) for retracement/extension.
   - Key levels (S/R) from swing points in higher TFs.
5. Suggest a trading setup:
   - Direction (long/short) based on structure and confluence (OB + FVG + Fib).
   - Entry: Specific price, confirmation (candlestick pattern, volume).
   - Stop Loss (SL): Below OB/FVG for long, above for short.
   - Take Profit (TP): Based on R:R minimum 1:2, liquidity targets, or key levels.
   - Risk management: Maximum 1-2% per trade, adjust lot size with ATR.
6. Note risks: Asset volatility, fundamental events, or potential fakeouts.

For education:
1. Explain concepts step-by-step: definition, analogy, chart example, practical application.
2. Use a higher-to-lower TF approach for context (e.g., D1 for trend, H1 for entry).
3. Include practical steps (e.g., "how to mark OB: find the last bearish candle before BOS").
4. Add discipline tips: trading journal, avoid overleverage, stick to SL.

For evaluating failed trades:
1. Identify errors: technical (wrong entry, tight SL), psychological (FOMO, no plan), or execution (slippage).
2. Provide reasoning: e.g., "Your SL was below LL but too close to a liquidity sweep."
3. Suggest improvements: change timeframe, add confirmation, or manage emotions.

For micin coin (Solana) and futures strategies:
1. Focus on high volatility: use low TFs (5M/15M) for scalping.
2. Prioritize risk management: max leverage 5x, R:R 1:3 for micin coins.
3. Example setup: entry at OB after liquidity sweep, TP at equal highs/lows.
4. Warn of risks: rugpulls, flash crashes, or high gas fees on Solana.

Example tone:
- H4 market structure is bearish, but H1 shows early CHoCH. Wait for BOS confirmation at 1.1850.
- Your SL was just 5 pips below OB, too tight for a sweep. Move it to the previous low at 1.1800.
- This micin coin is super volatile—don’t enter without a 15M FVG. Rugpull risk is high.
- If you cut losses due to panic, journal what triggered your emotions.

If no chart image is provided, ask the user to upload one or respond based on their description. If the question is vague, clarify first (e.g., "What TF are you using?"). Always end with advice to journal trades and self-evaluate.
  `,
};

const translations = {
  id: {
    title: 'Mentor Trading AI',
    minimize: 'Perkecil',
    maximize: 'Perbesar',
    close: 'Tutup',
    upload: '📷',
    send: 'Kirim',
    remove: 'Hapus',
    placeholder: 'Tanya soal trading atau unggah chart...',
    bubble: 'Tanya apa saja',
    language: 'Bahasa',
    indonesian: 'Indonesia',
    english: 'English',
  },
  en: {
    title: 'Trading Mentor AI',
    minimize: 'Minimize',
    maximize: 'Maximize',
    close: 'Close',
    upload: '📷',
    send: 'Send',
    remove: 'Remove',
    placeholder: 'Ask about trading or upload a chart...',
    bubble: 'Ask anything',
    language: 'Language',
    indonesian: 'Indonesian',
    english: 'English',
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [language, setLanguage] = useState('id'); // Default to Indonesian
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const encodeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const cleanResponse = (text) => {
    return text
      .replace(/\*\*/g, '') // Remove bold
      .replace(/##+/g, '') // Remove headings
      .replace(/\n\s*\n/g, '\n') // Remove extra newlines
      .trim(); // Remove leading/trailing whitespace
  };

  const handleSend = async () => {
    if (!input.trim() && !image) return;

    const userMessage = { role: 'user', content: input, image: image ? URL.createObjectURL(image) : null };
    setMessages([...messages, userMessage]);
    setInput('');
    setImage(null);

    try {
      let chatCompletion;
      if (image) {
        const base64Image = await encodeImage(image);
        chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: prompts[language] },
            {
              role: 'user',
              content: [
                { type: 'text', text: input || (language === 'id' ? 'Analisis chart ini berdasarkan SMC dan price action.' : 'Analyze this chart based on SMC and price action.') },
                {
                  type: 'image_url',
                  image_url: { url: `data:image/jpeg;base64,${base64Image}` },
                },
              ],
            },
          ],
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          max_completion_tokens: 1024,
        });
      } else {
        chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: prompts[language] },
            { role: 'user', content: input },
          ],
          model: 'llama-3.3-70b-versatile',
        });
      }

      const botMessage = {
        role: 'assistant',
        content: cleanResponse(chatCompletion.choices[0].message.content),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error with Groq API:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'id' ? 'Maaf, ada masalah dengan analisis. Coba lagi nanti.' : 'Sorry, there was an issue with the analysis. Try again later.',
        },
      ]);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Floating Chat Button (hidden when panel is open) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="w-64 h-64 bg-transparent rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
          >
            <img src={Service3} alt="Chatbot" className="w-56 h-56" />
          </button>
          <div className="absolute bottom-72 right-0 bg-gray-800 text-white text-base px-4 py-2 rounded-full shadow-md">
            {translations[language].bubble}
          </div>
        </div>
      )}

      {/* Chat Panel (minimize/maximize) */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 bg-gray-900 text-white rounded-lg shadow-xl transition-all duration-300 z-40 ${
            isMaximized ? 'w-[80vw] h-[80vh]' : 'w-96 h-96'
          } flex flex-col font-mono`}
        >
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">{translations[language].title}</h3>
              <div className="flex items-center">
                <label htmlFor="language" className="mr-2 text-sm">{translations[language].language}:</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-800 text-white rounded p-1 text-sm focus:outline-none"
                >
                  <option value="id">{translations[language].indonesian}</option>
                  <option value="en">{translations[language].english}</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isMaximized ? translations[language].minimize : translations[language].maximize}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-700 rounded">
                {translations[language].close}
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.role === 'user' ? 'bg-gray-700' : 'bg-gray-800'
                  }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="w-full h-auto mb-2 rounded" />
                  )}
                  <pre className="whitespace-pre-wrap">{msg.content}</pre>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700 flex flex-col space-y-2">
            {image && (
              <div className="flex items-center space-x-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded"
                />
                <button
                  onClick={() => setImage(null)}
                  className="text-red-500 text-sm"
                >
                  {translations[language].remove}
                </button>
              </div>
            )}
            <div className="flex space-x-2">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="p-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                {translations[language].upload}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={translations[language].placeholder}
                className="flex-1 p-2 bg-gray-800 rounded text-white focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                {translations[language].send}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;