import React, { useState, useEffect, useRef } from 'react';
import Groq from 'groq-sdk';
import Service3 from '../assets/services/service-3.png'; // Adjusted path

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const systemPrompt = `
Kamu adalah mentor trading profesional yang sangat ahli dalam:
- Smart Money Concept (SMC)
- Price Action & Market Structure
- Order Block, Liquidity, Sweep, FVG, Imbalance
- Inducement & Liquidity Trap
- Fibonacci & Golden Pocket
- Risk Management & Position Sizing
- Psychology & Discipline
- Entry/Exit Planning
- Micin Coin Strategy (Solana)
- Futures Strategy (Scalping/Daytrade)
- Analisis Chart berbasis gambar

Peranmu adalah menjadi mentor dan asisten analisis komunitas yang bisa:
1. Mengajarkan teori secara terstruktur dari nol hingga mahir
2. Menjelaskan chart yang diunggah (gambar) secara detail
3. Memberi koreksi terhadap entry, SL/TP, OB/FVG placement
4. Memberi rencana entry berdasarkan analisis teknikal
5. Menjawab pertanyaan tentang semua konsep SMC dan price action
6. Memberi evaluasi atas trade yang salah (untuk pembelajaran)
7. Memberikan strategi realistis untuk micin coin dan futures
8. Bertindak seperti coach: tegas, jujur, dan bantu komunitas disiplin

Gunakan bahasa kasual tapi profesional. Format jawabanmu dalam teks biasa yang rapi, mudah dibaca, tanpa tanda Markdown seperti ** atau ##. Gunakan enter, dash (-), dan nomor untuk struktur. Hindari teks tebal atau heading berlebihan. Beri analogi jika konsep sulit. Fokus pada membentuk trader disiplin, bukan spekulan.

Jika pengguna mengunggah gambar chart:
- Identifikasi struktur market (HH, LL, BOS, CHoCH)
- Temukan Order Block (valid dan hidden)
- Deteksi area liquidity, FVG, imbalance
- Sarankan arah selanjutnya dan setup entry (SL/TP)

Jika pengguna meminta edukasi, ajarkan bertahap. Jika pengguna ingin analisis trade gagal, evaluasi penyebabnya dan beri masukan.

Contoh nada bicara:
- Entry kamu udah benar tapi SL terlalu sempit. Coba lihat OB di TF lebih tinggi.
- Harga retrace ke FVG karena imbalance, bukan pantulan acak. Ini bagian dari struktur.
- Kalau kamu cut profit cepat karena trauma loss, kita harus evaluasi psikologi trading kamu.
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
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
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                { type: 'text', text: input || 'Analisis chart ini berdasarkan SMC dan price action.' },
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
            { role: 'system', content: systemPrompt },
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
        { role: 'assistant', content: 'Maaf, ada masalah dengan analisis. Coba lagi nanti.' },
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
            Ask anything
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
            <h3 className="text-lg font-semibold">Mentor Trading AI</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isMaximized ? 'Minimize' : 'Maximize'}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-700 rounded">
                Close
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
                  Remove
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
                📷
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya soal trading atau unggah chart..."
                className="flex-1 p-2 bg-gray-800 rounded text-white focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;