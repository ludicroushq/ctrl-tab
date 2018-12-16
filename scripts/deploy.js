#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');
const chromeWebStoreItemProperty = require('chrome-web-store-item-property');
const AdmZip = require('adm-zip');

const webStore = require('chrome-webstore-upload')({
  extensionId: process.env.CHROME_EXTENSION_ID,
  clientId: process.env.CHROME_CLIENT_ID,
  clientSecret: process.env.CHROME_CLIENT_SECRET,
  refreshToken: process.env.CHROME_CLIENT_REFRESH_TOKEN,
});

const upload = (zip) => new Promise((resolve) => {
  webStore.uploadExisting(zip).then(res => {
    resolve(res);
  });
})

const publish = () => new Promise((resolve) => {
  webStore.publish('default').then(res => {
    resolve();
  });
})

const exec = async () => {
  console.log('> Building application');
  childProcess.execSync('NODE_ENV=production npm run build', { stdio: [0, 1, 2] });
  console.log();
  console.log('> Fetching metadata');
  let { version: oldVersion } = await chromeWebStoreItemProperty(process.env.CHROME_EXTENSION_ID);
  const versionArray = oldVersion.split('.');
  const patch = versionArray.pop();
  versionArray.push(parseInt(patch) + 1);
  const version = versionArray.join('.');
  console.log();
  console.log('> Updating manifest');
  const distPath = path.join(__dirname, '../dist');
  const manifestPath = path.join(distPath, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath));
  delete manifest.key;
  manifest.version = version;
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log();
  console.log('> Zipping folder');
  const zip = new AdmZip();
  zip.addLocalFolder(distPath);
  const zipBuffer = zip.toBuffer();
  console.log();
  console.log(`> Uploading version ${version} to Chrome`);
  const { uploadState } = await upload(zipBuffer);
  if (uploadState !== 'SUCCESS') {
    throw new Error('Upload failed');
  }
  console.log();
  console.log('> Publishing new version to Chrome');
  await publish();
  console.log('> Uploading and signing new version to Firefox');
  try {
    childProcess.execSync('./node_modules/.bin/web-ext-submit', { stdio: [0, 1, 2], cwd: distPath });
  } catch (_) {
    // do nothing
  }
}

exec().then(() => {
  console.log();
  console.log('> Done');
}).catch((err) => {
  console.log(err);
});
