function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  //   console.log(Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]);

  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export default bytesToSize;
