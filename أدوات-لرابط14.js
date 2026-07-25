/**
 * 📂 أدوات-لرابط14.js
 * 👤 Taib<
 * 🔥 موقع: https://videy.co
 * رفع الفيديو وتحويله إلى رابط مباشر
 */

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) {
    return m.reply(`*يرجى الرد على فيديو*\n\nمثال: قم بالرد على الفيديو واكتب:\n${usedPrefix + command}`)
  }

  try {
    const quoted = m.quoted
    
    if (!quoted.mimetype || !quoted.mimetype.startsWith('video/')) {
      return m.reply(`*هذا ليس فيديو!*`)
    }

    await conn.sendMessage(m.chat, { 
      react: { text: '⏳', key: m.key } 
    })

    const videoBuffer = await quoted.download()
    
    if (!videoBuffer || videoBuffer.length === 0) {
      return m.reply(`*فشل تحميل الفيديو*`)
    }

    // حفظ مؤقت
    const tmpDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }
    
    const fileName = `video_${Date.now()}.mp4`
    const filePath = path.join(tmpDir, fileName)
    fs.writeFileSync(filePath, videoBuffer)

    // رفع إلى Videy API
    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath), {
      filename: fileName,
      contentType: 'video/mp4'
    })

    const response = await axios.post('https://videy.co/api/upload', formData, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...formData.getHeaders()
      }
    })

    // حذف الملف المؤقت
    fs.unlinkSync(filePath)

    const result = response.data
    const videoId = result.id
    const pageUrl = result.link
    const downloadUrl = `https://cdn.videy.co/${videoId}.mp4`

    const reply = `*✅ تم رفع الفيديو بنجاح!*\n\n` +
                  `📥 *رابط التحميل المباشر:*\n${downloadUrl}\n\n` +
                  `🔗 *رابط الصفحة:*\n${pageUrl}\n\n` +
                  `🆔 *المعرف:* ${videoId}\n` +
                  `📱 *الحجم:* ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB\n\n` +
                  `💡 يمكنك مشاركة هذه الروابط مع أي شخص`

    await conn.sendMessage(m.chat, {
      text: reply
    }, { quoted: m })

    await conn.sendMessage(m.chat, { 
      react: { text: '✅', key: m.key } 
    })

  } catch (e) {
    console.error('خطأ:', e)
    await conn.sendMessage(m.chat, { 
      react: { text: '❌', key: m.key } 
    })
    m.reply(`*خطأ:* ${e?.message || e}`)
  }
}

handler.help = ['لرابط14']
handler.tags = ['tools']
handler.command = ['لرابط14']
handler.limit = true

export default handler
