/**
 * @description utils controller
 */

const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, ErrorModel} = require('../model/ResModel')

// 文件最大 size 1M
const FILE_MAX_SIZE = 1024 * 1024 * 1024
// 存储目录
const DIST_FORDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 检查存储目录是否存在
fse.pathExists(DIST_FORDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FORDER_PATH)
  }
})

/**
  * 图片保持
  * @param {string} name 文件名
  * @param {number} size 文件大小
  * @param {string} type 文件类型
  * @param {string} filePath 文件路径
  */
const saveFile = async ({ name, size, type, filePath }) => {
  if (size > FILE_MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel('文件大于1M')
  }

  // 移动文件
  const fileName = `${Date.now()}_${name}`
  const distPath = path.join(DIST_FORDER_PATH, fileName)
  await fse.move(filePath, distPath)
  return new SuccessModel({
    url: `/${fileName}`
  })
}

module.exports = {
  saveFile
}
