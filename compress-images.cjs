const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 이미지 압축 설정
const QUALITY = 80; // JPEG 품질 (1-100)
const MAX_WIDTH = 1920; // 최대 너비
const MAX_HEIGHT = 1920; // 최대 높이

// 압축할 폴더 경로
const folders = [
  { input: './public/images/main', output: './public/images/main' },
  { input: './public/images/gallery', output: './public/images/gallery' }
];

async function compressImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const originalSize = fs.statSync(inputPath).size;
    
    // 임시 파일명으로 먼저 압축
    const tempPath = outputPath + '.tmp';
    
    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(tempPath);
    
    const compressedSize = fs.statSync(tempPath).size;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(2);
    
    // 원본 파일을 압축된 파일로 교체
    fs.renameSync(tempPath, outputPath);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(compressedSize / 1024 / 1024).toFixed(2)}MB (${reduction}% 감소)`);
  } catch (error) {
    console.error(`❌ ${path.basename(inputPath)} 압축 실패:`, error.message);
  }
}

async function compressFolder(folderConfig) {
  const { input, output } = folderConfig;
  
  if (!fs.existsSync(input)) {
    console.log(`⚠️  폴더가 존재하지 않습니다: ${input}`);
    return;
  }
  
  const files = fs.readdirSync(input).filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  console.log(`\n📁 ${input} 처리 중... (${files.length}개 파일)`);
  console.log('=' .repeat(60));
  
  for (const file of files) {
    const inputPath = path.join(input, file);
    const outputPath = path.join(output, file);
    await compressImage(inputPath, outputPath);
  }
}

async function main() {
  console.log('🖼️  이미지 압축 시작...\n');
  
  for (const folder of folders) {
    await compressFolder(folder);
  }
  
  console.log('\n✨ 모든 이미지 압축 완료!');
}

main();

