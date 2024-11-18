function getFileType(filePath, settings) {
  for (const setting of settings) {
    if (filePath.startsWith(setting.pattern.replace('/**', ''))) {
      return setting.type;
    }
  }
  return null; // 타입이 매칭되지 않으면 null 반환
}

module.exports = {
  getFileType,
};
