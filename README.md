/
 * 📂 أدوات-لرابط14.js
 * 👤 Taib<
 * 🔥 موقع: https://videy.co
 * رفع الفيديو وتحويله إلى رابط مباشر
 */

const PROJECT = {
  name: "أدوات-لرابط14",
  site: "https://videy.co",
  api: "https://videy.co/api/upload",
  cdn: "https://cdn.videy.co",
  description: "رفع الفيديو إلى videy.co واسترجاع رابط التحميل المباشر",
  
  folders: {
    "src/handlers/": "videoUpload.js",
    "src/services/": ["uploadService.js", "fileService.js"],
    "src/utils/": ["validator.js", "formatter.js"],
    "src/config/": "constants.js",
    "tmp/": "الملفات المؤقتة"
  },
  
  files: {
    "package.json": {
      dependencies: ["axios", "form-data", "fs", "path"]
    },
    ".env": "المتغيرات البيئية",
    "server.js": "تشغيل الخادم"
  }
};

const CONSTANTS = {
  SITE: "https://videy.co",
  API_URL: "https://videy.co/api/upload",
  CDN_URL: "https://cdn.videy.co",
  TEMP_DIR: "./tmp",
  MAX_SIZE: 50 * 1024 * 1024,
  ALLOWED_TYPES: ["video/mp4", "video/mov", "video/avi", "video/webm"]
};

const FILE_SERVICE = {
  ensureTempDir: "إنشاء مجلد tmp",
  saveFile: "حفظ الملف في tmp",
  deleteFile: "حذف الملف من tmp"
};

const UPLOAD_SERVICE = {
  upload: "رفع الملف إلى https://videy.co/api/upload",
  getDownloadLink: "إنشاء رابط التحميل https://cdn.videy.co/[id].mp4"
};

const VALIDATOR = {
  isVideo: "التأكد من أن الملف فيديو",
  isValidSize: "التأكد من أن الحجم أقل من 50MB",
  validate: "التحقق الكامل"
};

const FORMATTER = {
  formatSuccess: "تنسيق رسالة النجاح مع الروابط",
  formatError: "تنسيق رسالة الخطأ"
};

const WORKFLOW = [
  "1. المستخدم يرسل فيديو",
  "2. videoUpload.js يستقبل الطلب",
  "3. validator.js يتحقق من الفيديو",
  "4. fileService.js يحفظ في tmp",
  "5. uploadService.js يرفع إلى videy.co",
  "6. يستلم id و link من videy.co",
  "7. fileService.js يحذف الملف",
  "8. formatter.js ينسق الرد",
  "9. يعرض الروابط للمستخدم"
];

const API_RESPONSE = {
  id: "معرف الفيديو من videy.co",
  link: "رابط صفحة الفيديو من videy.co",
  downloadUrl: "رابط التحميل المباشر من cdn.videy.co"
};

const COMMAND = {
  name: "لرابط14",
  description: "رفع فيديو وتحويله إلى رابط مباشر",
  usage: "الرد على فيديو + لرابط14",
  help: "لرابط14",
  tags: "downloader",
  limit: true
};
